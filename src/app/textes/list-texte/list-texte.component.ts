import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { TexteService } from '../../services/texte.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TexteModel }    from '../../models/texte.model';
import { CompteModel }    from '../../models/compte.model';
import { CompteService } from '../../services/compte.service';
import { filter, map, scan, take, tap, toArray } from 'rxjs/operators';

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

    public currentTexte_a = new Array<TexteModel>();

    public texte_a = new Array<TexteModel>();
    public texte_aSub: Subscription;

    public currentPseudo: string;
    public currentCompteSub: Subscription;
    public currentCompte = new CompteModel();

    private pseudo_a = new Array<string>();
    private currentCompte_a = new Array<CompteModel>();

    private compte_aSub:Subscription;

    
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

	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

	console.log('\n------- this.texteService.texte_a$.subscribe ---------\n');

	this.texte_aSub = this.texteService.texte_a$
			      .pipe(
				  tap(
				      (val) => {
					  this.currentTexte_a = val;
					  console.log('val',val)}
				  )
			      ).subscribe(
				  (tex_a) => {
				      console.log('Dans',here,'subscribe tex_a',tex_a);
				  },
				  (error) =>
				      {console.log(error)
				      },
				  () => {
				      console.log('fait');
				  }
			      );

	console.log('\n------- fin this.texteService.texte_a$.subscribe ---------\n');
	console.log('\n------- avant this.texteService.getTextes  ---------\n');	this.loading = false;

	this.texteService.getTextes(here); /* afficher les textes */

	console.log('\n------- après this.texteService.getTextes  ---------\n');

	this.compte_aSub = this.compteService.compte_a$
	    		       .pipe(
				   tap(
				       (val) => {
					   this.currentCompte_a = val;
					   console.log('val',val)}
				   )
			       ).subscribe(
				   (com_a) => {
				       console.log('Dans',here,'com_a',com_a);
				   }
			       );
	
	this.compteService.getComptes(here);

    }

    onAddPseudo () {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	console.log('Dans',here,' this.currentTexte_a=',this.currentTexte_a);
	console.log('Dans',here,'compte_a',this.compteService.compte_a);
	console.log('Dans',here,' this.currentCompte_a=',this.currentCompte_a);

	for (let t in this.currentTexte_a) {
	    let aId = this.currentTexte_a[t].auteurId;
	    console.log('\n------- Loop t =',t,' ------------------\n');
	    console.log('Dans',here,'Loop aId',aId);
	    console.log('Dans',here,'currentTexte_a[',t,']',this.currentTexte_a[t]);
	    

	    this.currentCompte = this.currentCompte_a.find( x => x._id == aId);
	    this.currentPseudo = this.currentCompte.pseudo;
	    console.log('Dans',here,'currentPseudo',this.currentPseudo);
	    this.currentTexte_a[t]['pseudo'] = this.currentPseudo;
	    }
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
