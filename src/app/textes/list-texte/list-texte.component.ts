import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompteService }   from '../../services/compte.service';
import { NotationService } from '../../services/notation.service';
import { StateService }    from '../../services/state.service';
import { TexteService }    from '../../services/texte.service';
import { Router } from '@angular/router';
import { TexteModel }    from '../../models/texte.model';
import { CompteModel }   from '../../models/compte.model';
import { NotationModel }   from '../../models/notation.model';

import { Subscription } from 'rxjs';
import { filter, map, scan, take, tap, toArray } from 'rxjs/operators';
import { arrayCountSumAverageRms, sumOfArray, averageOfArray, varianceOfArray, rmsOfArray }  from '../../outils/outils-statistics';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-list-texte',
    templateUrl: './list-texte.component.html',
    styleUrls: ['./list-texte.component.scss']
})

export class ListTexteComponent implements OnInit, OnDestroy {

    private loading: boolean;
    private isAuth: boolean;
    private verbose: boolean;
    private errorMessage: string;

    private currentUrl: string;

    public currentTexte_a = new Array<TexteModel>();

    private isAuthSub: Subscription;

    public texte_a = new Array<TexteModel>();
    public texte_aSub: Subscription;

    public verboseSub: Subscription;
    
    public currentCompteSub: Subscription;
    public currentCompte = new CompteModel();
    private currentCompte_a = new Array<CompteModel>();
    private compte_aSub:Subscription;

    private pseudo_a = new Array<string>();
    public currentPseudo: string;

    private participantCount: number;
    private sum: number;
    private average: number;
    private rms: number;

    private notation_aSub:Subscription;
    private currentNotation_a = new Array<NotationModel>();
    private fullNotation_a = new Array<NotationModel>();
    
    constructor(private stateService: StateService,
		private compteService: CompteService,
		private notationService: NotationService,
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

	this.verboseSub = this.stateService.verbose$.subscribe(
	    (boo) => {
		this.verbose = boo;
	    }
	);
	console.log('Dans',here,'subscribe.verbose', this.verbose);

	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

	console.log('\n------- this.texteService.texte_a$.subscribe ---------\n');

	this.texte_aSub = this.texteService.texte_a$
			      .subscribe(
				  (tex_a) => {
				      this.currentTexte_a = tex_a;
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
			       .subscribe(
				   (com_a) => {
				       this.currentCompte_a = com_a;
				       console.log('Dans',here,'com_a',com_a);
				   }
			       );
	
	this.compteService.getComptes(here); /* afficher les comptes */

	console.log('\n------- après this.texteService.getComptes  ---------\n');
	
	this.notation_aSub = this.notationService.notation_a$
				 .subscribe(
				     (not_a) => {
					 this.fullNotation_a = not_a;
					 console.log('Dans',here,'not_a',not_a);
				     }
				 );
	
	this.notationService.getNotations(here) /* afficher les notations */
	    .then( 
		() => {
		    this.loading = false;
		}
	    ).catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );

	console.log('Dans',here,'X verbose',this.verbose);

    }

    onVerbose () {
	    this.onAddPseudo ();
	    this.onAddAverageNote ();
    }
	
    onAddPseudo () {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	console.log('Dans',here,' this.currentTexte_a=',this.currentTexte_a);
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

    onAddAverageNote () {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	console.log('Dans',here,' this.currentTexte_a=',this.currentTexte_a);
	console.log('Dans',here,' this.fullNotation_a=',this.fullNotation_a);

	for (let t in this.currentTexte_a) {
	    let tId = this.currentTexte_a[t]._id;
	    console.log('\n------- Loop t =',t,' ------------------\n');
	    console.log('Dans',here,'Loop tId',tId);
	    console.log('Dans',here,'currentTexte_a[',t,']',this.currentTexte_a[t]);

	    this.currentNotation_a = this.fullNotation_a.filter( x => x.texteObjectId == tId);
	    console.log('Dans',here,'currentNotation_a',this.currentNotation_a);

	    let note_a = new Array<number>();
            for (let i in this.currentNotation_a) {
		note_a[i] = this.currentNotation_a[i].note;
	    }

	    [this.participantCount, this.average, this.rms, this.sum] = arrayCountSumAverageRms(note_a);

	    console.log('Dans',here,'somme des notes note_a',this.sum);
	    console.log('Dans',here,'moyenne des notes note_a',this.average);
	    console.log('Dans',here,'rms des notes note_a',this.rms);

	    this.currentTexte_a[t]['noteMoyenne'] = Math.round(this.average*10)/10;
	    this.currentTexte_a[t]['noteEcartType'] = Math.round(this.rms*10)/10;
	    this.currentTexte_a[t]['participantCount'] = this.participantCount;
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
