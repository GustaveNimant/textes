import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompteService } from '../../services/compte.service';
import { StateService }      from '../../services/state.service';
import { NotationService }  from '../../services/notation.service';
import { NotationModel } from '../../models/notation.model';
import { Subscription } from 'rxjs';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-list-notation',
    templateUrl: './list-notation.component.html',
    styleUrls: ['./list-notation.component.scss']
})

export class ListNotationComponent implements OnInit, OnDestroy {

    public notation_a: NotationModel[] = [];
    public loading: boolean;
    public debug: boolean;
    public isAuth: boolean;

    private currentUrl: string;
    private notation_aSub: Subscription;
    private isAuthSub: Subscription;

    constructor(private stateService: StateService,
		private compteService: CompteService,
		private notationService: NotationService, 
		private router: Router) {
	let here = O.functionName();
	console.log('%cEntrée dans','color: #aa0000', here);	
    }

    ngOnInit() {
	let here = O.functionName();
	console.log('%cEntrée dans','color: #aa0000', here);	

	this.loading = true;

	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);
	
	this.stateService.mode$.next('list');

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans',here,'currentUrl', this.currentUrl);

	this.notation_aSub = this.notationService.notation_a$.subscribe(
	    (not_a) => {
		console.log('Dans',here,'not_a',not_a);
		this.notation_a = not_a; /* on charge les notations ici */
		this.loading = false;
	    },
	    (error) => {
		console.log('Dans notation_aSub Erreur:', error);
	    },
	    () => {console.log('Dans notation_aSub fini !')}
	);

	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les notations */
		this.isAuth = boo;
	    }
	);

	console.log('Dans',here,' isAuth', this.isAuth);
	if (!this.isAuth) {
	    this.router.navigate(['/login']);
	}

	console.log('Dans',here,' before getNotations loading', this.loading);
	this.notationService.getNotations();
	console.log('Dans',here,' after  getNotations loading', this.loading);
    }

    onNotationClicked(id: string) {
	let here = O.functionName();
	console.log('Entrée dans',here,'avec id', id);
	console.log('Entrée dans',here,'navigation vers ', '/notations/single-notation/' + id);
	this.router.navigate(['/notations/single-notation/' + id]);
    }

    ngOnDestroy() {
	let here = O.functionName();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.notation_aSub.unsubscribe();
	O.unsubscribeLog(here, 'notation_aSub');

    }

}
