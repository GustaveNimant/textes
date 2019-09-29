import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { CompteService } from '../../services/compte.service';
import { Subscription } from 'rxjs';
import { CompteModel } from '../../models/compte.model';
import { Router } from '@angular/router';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-list-compte',
    templateUrl: './list-compte.component.html',
    styleUrls: ['./list-compte.component.scss']
})

export class ListCompteComponent implements OnInit, OnDestroy {

    public loading: boolean;
    public debug: boolean;
    public isAuth: boolean;
    private isAuthSub: Subscription;

    private currentUrl: string;
    
    public compte_a: CompteModel[] = [];
    private compte_aSub: Subscription;

    constructor(private compteService: CompteService,
		private stateService: StateService, 
		private router: Router)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);   
		}
    
    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;
	this.stateService.mode$.next('list');

	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans',here,'currentUrl', this.currentUrl);

	this.compte_aSub = this.compteService.compte_a$.subscribe(
	    (com_a) => {
		console.log('Dans',here,'com_a',com_a);
		this.loading = false;
		this.compte_a = com_a;
	    }
	);

	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

	console.log('Dans',here,'loading', this.loading);
	this.compteService.getComptes(here); /* Improve ?? */

    }

    onCompteClicked(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	console.log('Entrée dans',here,'avec id', id);
	
	console.log('Dans',here,'navigation vers', '/comptes/single-compte/' + id);
	this.router.navigate(['/comptes/single-compte/' + id]);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here);
    }

}
