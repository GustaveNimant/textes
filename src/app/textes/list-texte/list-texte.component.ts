import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { TexteService } from '../../services/texte.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TexteModel }    from '../../models/texte.model';
import { CompteService } from '../../services/compte.service';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-list-texte',
    templateUrl: './list-texte.component.html',
    styleUrls: ['./list-texte.component.scss']
})

export class ListTexteComponent implements OnInit, OnDestroy {

    private loading: boolean;
    private isAuth: boolean;
    private isAuthSub: Subscription;

    private currentUrl: string;
    
    public texte_a: TexteModel[] = [];
    public texte_aSub: Subscription;
    
    constructor(private stateService: StateService,
		private compteService: CompteService,
		private texteService: TexteService,
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
	
	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans',here,'currentUrl', this.currentUrl);

	this.texte_aSub = this.texteService.texte_a$.subscribe(
	    (tex_a) => {
		console.log('Dans',here,'subscribe tex_a',tex_a);
		this.texte_a = tex_a;
		this.loading = false;
	    }
	);
	
	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

	console.log('Dans',here,'loading', this.loading);
	this.texteService.getTextes(here); /* afficher les textes */
    }

    onTexteClicked(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Entrée dans',here,'avec id', id);
	
	console.log('Dans',here,'navigation vers', '/textes/single-texte/' + id);

	this.router.navigate(['/textes/single-texte/' + id]);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.texte_aSub.unsubscribe();
	
	O.unsubscribeLog(here, 'texte_aSub');
	O.exiting_from_function (here);
    }

}
