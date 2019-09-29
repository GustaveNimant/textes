import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }       from 'rxjs';
import { StateService }        from '../services/state.service';
import { CompteService }       from '../services/compte.service';
import { DataProviderService } from '../services/data-provider.service';
import { Router }             from '@angular/router';
import { CompteModel } from '../models/compte.model';
import { IrpRegisterService } from '../services/irp-register.service';

// import { CurrentCompteProviderService } from '../services/current-compte-provider.service';

import * as O from '../outils/outils-management';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

    public mode: string;
    public isAuth: boolean;
    public debug: boolean;
    public trace: boolean;

    private modeSub: Subscription;
    private currentPseudoSub: Subscription;
    private isAuthSub: Subscription;

    private irpRegisterSub: Subscription;
    private irpRegister= new Object();

    private currentEmail: string;
    private pseudo: string;

    private currentCompte = new CompteModel();

    constructor(private stateService: StateService,
		private irpRegisterService: IrpRegisterService,
		private dataProviderService: DataProviderService,
		private compteService: CompteService,
//		private currentCompteProviderService:CurrentCompteProviderService,
		private router: Router)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);
		};

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.modeSub = this.stateService.mode$.subscribe(
	    (mod) => {
		this.mode = mod;
	    }
	);
	console.log('Dans',here,'subscribe.mode',this.mode);
	
	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {
		this.isAuth = boo;
	    }
	);
	console.log('Dans',here,'subscribe.isAuth', this.isAuth);

	console.log('Dans',here,'avant pseudo', this.pseudo);
	if (this.pseudo == undefined) {
	    //this.currentCompte = this.currentCompteProviderService.currentCompteBuild ();
	    //this.pseudo = this.currentCompte.pseudo;
	    this.onGetPseudo ();
	}
	console.log('Dans',here,'après pseudo', this.pseudo);
	
	O.exiting_from_function (here);
    }

    onGetPseudo () {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.currentEmail = this.dataProviderService.dataProvide ('currentEmail', here);
	
	console.log('Dans',here,'from irpRegisterService currentEmail',this.currentEmail);

	if (this.currentEmail == undefined) {
	    this.pseudo = undefined;
	} else {
	    this.compteService.getCompteByEmail (this.currentEmail)
		.then(
		    (com: CompteModel) => {
			console.log('Dans',here,' getCompteIdByEmail com', com);
			this.currentCompte = com;
			this.pseudo = com.pseudo;
		    },
		).catch (
		    (error) => {
			console.log('Dans',here,'getCompteByEmail Erreur', error);
		    }
		);
	}
	console.log('Dans',here,'from getCompteByEmail pseudo',this.pseudo);
	
	O.exiting_from_function (here);
    }
    
    onLogout() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	//	this.irpRegisterSub.unsubscribe();
	//	O.unsubscribeLog(here, 'currentUrlSub');

	this.compteService.logout();
	console.log('Dans',here,'navigation vers /main-menu');
	this.router.navigate(['/main-menu']);
}

onBackToMainMenu() {
    console.log('Entrée dans onBackToMainMenu');
    this.router.navigate(['/main-menu']);
}

onDebugSwitch() {
    console.log('Entrée dans onDebugSwitch');
    this.stateService.debugSwitch();
    this.debug = this.stateService.debug;
    console.log('Dans onDebugSwitch debug', this.debug);
}

onTraceSwitch() {
    console.log('Entrée dans onTraceSwitch');
    this.stateService.traceSwitch();
    this.trace = this.stateService.trace;
    console.log('Dans onTraceSwitch trace', this.trace);
}

onIrpProvider() {
    console.log('Entrée dans onIrpProvider');
    this.router.navigate(['/irp-provider']);
}

ngOnDestroy() {
    console.log('Entrée dans ngOnDestroy');
    this.modeSub.unsubscribe();
    //	this.isAuthSub.unsubscribe();
}

}
