import { Component, OnDestroy, OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { NotationModel }                      from '../../models/notation.model';
import { TexteModel }        from '../../models/texte.model';
import { NotationService }                    from '../../services/notation.service';
import { TexteService }       from '../../services/texte.service';
import { StateService }                       from '../../services/state.service';
import { Subscription }                       from 'rxjs';
import { arrayCountSumAverageRms, sumOfArray, averageOfArray, varianceOfArray, rmsOfArray }  from '../../outils/outils-statistics';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-sum-notation',
    templateUrl: './sum-notation.component.html',
    styleUrls: ['./sum-notation.component.scss']
})

export class SumNotationComponent implements OnInit, OnDestroy {

    public loading = false;
    private errorMessage: string;

    public participantCount: number;
    private texteObjectId: string;

    public texteTitre: string;
    private sum: number;
    public average: number;
    public rms: number;

    private currentUrl: string;
    private currentUrlSub: Subscription;

    private currentTexte = new TexteModel();
    private currentTexteSub: Subscription;

    private notation_a: NotationModel[] = [];
    private notation_aSub: Subscription ;

    public debug: boolean;
    private trace: boolean;

    constructor(private stateService: StateService,
		private texteService: TexteService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private notationService: NotationService)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);
		}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;

	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);

	this.currentUrlSub = this.stateService.currentUrl$.subscribe(
	    (url) => {
		console.log('Dans',here,'url',url);
		this.currentUrl = url;
		console.log('Dans',here,'currentUrl', this.currentUrl);
	    }
	);

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans',here,'params', params);
		if (params.texteObjectId) {
		    this.texteObjectId = params.texteObjectId;

		    this.texteService.provideTexteByObjectId (this.texteObjectId);
		    this.currentTexteSub = this.texteService.currentTexte$.subscribe(
			(curtex) => {
			    this.currentTexte = curtex;
			    this.texteTitre = this.currentTexte.titre;
			}
		    );

		    /* tableau */

		    this.notationService.provideNotationsByTexteObjectId(params.texteObjectId);
		    this.loading = false;
		    this.notation_aSub = this.notationService.notation_a$.subscribe(
			(not_a) => {
				console.log('Dans',here,'liste des notations not_a',not_a);
				let note_a:number[] = [];
                                for (let i in not_a) {
				    note_a[i] = not_a[i].note;
				}

			    [this.participantCount, this.average, this.rms, this.sum] = arrayCountSumAverageRms(note_a);
			    this.average = Math.round(this.average*10)/10;
			    this.rms = Math.round(this.rms*10)/10;

			    console.log('Dans',here,'somme des notes note_a',this.sum);
			    console.log('Dans',here,'moyenne des notes note_a',this.average);
			    console.log('Dans',here,'rms des notes note_a',this.rms);
			    }
			);
		} else {
		    console.log('Dans',here,'Erreur pour params.id', params.id);
		    console.log('Dans',here,'navigation vers textes/list-texte');
		    this.router.navigate(['/textes/list-texte']);
		}
	    }
	);

    }

    onGoToNotationList() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Dans',here,'navigation vers notations/list-notation');
	this.router.navigate(['/notations/list-notation']);
    };

    onGoToTexteList() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Dans',here,'navigation vers textes/list-texte');
	this.router.navigate(['/textes/list-texte']);
    };

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

    }

}
