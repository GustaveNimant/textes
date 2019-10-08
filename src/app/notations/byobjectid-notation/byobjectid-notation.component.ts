import { Component, OnDestroy, OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { NotationModel }                      from '../../models/notation.model';
import { TexteModel }        from '../../models/texte.model';
import { NotationService }                    from '../../services/notation.service';
import { TexteService }       from '../../services/texte.service';
import { StateService }                       from '../../services/state.service';
import { Subscription }                       from 'rxjs';
import { sumOfArray, averageOfArray, varianceOfArray, rmsOfArray }  from '../../outils/outils-statistics';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-byobjectid-notation',
    templateUrl: './byobjectid-notation.component.html',
    styleUrls: ['./byobjectid-notation.component.scss']
})

export class ByobjectidNotationComponent implements OnInit, OnDestroy {

    public loading = false;
    public errorMessage: string;
    public debug: boolean;
    
    private participantCount: number;
    private texteObjectId: string;
    private texteTitre: string;

    private currentUrl: string;
    private currentUrlSub: Subscription;

    public notation_a = new Array<NotationModel>();
 
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

	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);

	this.loading = true;

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

		    this.texteService.getTexteByObjectId (this.texteObjectId)
			.then(
			    (tex: TexteModel) => {
				console.log('Dans',here,'getTexteIdByObjectId tex', tex);
				this.texteTitre = tex.titre;
			    },
			).catch (
			    (error) => {
				console.log('Dans',here,'getTexteByObjectId Erreur', error);
			    }
			);

		    this.notationService.getNotationsByTexteObjectId(params.texteObjectId)
			.then(
			    (not_a) => {
				this.loading = false;
				console.log('Dans',here,'liste des notations not_a',not_a);
				console.log('Dans',here,'typeof not_a',typeof not_a);
				//this.notation_a = not_a;
                                for (let i in not_a) {
				    this.notation_a[i] = not_a[i];
				    console.log('Dans',here,'notation_a',this.notation_a[i]);
				}
				
				this.participantCount = this.notation_a.length;
				console.log('Dans',here,'participantCount',this.participantCount);
			    }
			)
			.catch(
			    (error) => {
				console.log('Dans',here,'Erreur', error);
				console.log('Dans',here,'Erreur.status', error.status);
				this.loading = false;
				this.errorMessage = error.message;
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
