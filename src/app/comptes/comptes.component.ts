import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { CompteService } from '../services/compte.service';
import { Subscription } from 'rxjs';

import * as O from '../outils/outils-management';

@Component({
    selector: 'app-comptes',
    templateUrl: './comptes.component.html',
    styleUrls: ['./comptes.component.scss']
})

export class ComptesComponent implements OnInit, OnDestroy {

    private isAuth: boolean;
    private isAuthSub: Subscription;

    constructor(private stateService: StateService,
		private compteService: CompteService) { }
    
    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => { 
		this.isAuth = boo;
		console.log('Dans',here,'isAuth', this.isAuth);
	    }
	);

	//	this.compteService.userId = '';
	//	this.compteService.token = '';
    }
    
    ngOnDestroy() {
    }
}
