import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotationModel }     from '../../models/notation.model';
import { NotationService }  from '../../services/notation.service';
import { CompteService } from '../../services/compte.service';
import { StateService }      from '../../services/state.service';
import { Subscription } from 'rxjs';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-single-notation',
    templateUrl: './single-notation.component.html',
    styleUrls: ['./single-notation.component.scss']
})

export class SingleNotationComponent implements OnInit, OnDestroy {

    public notation: NotationModel;
    public loading: boolean;
    public debug: boolean;
    
    constructor(private stateService: StateService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private notationService: NotationService,
		private compteService: CompteService)
		{
		    console.log('Entrée dans constructor');
		};
    
    ngOnInit(){
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;

	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);

	this.stateService.mode$.next('single-notation');

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		this.notationService.getNotationById(params.id)
		    .then(
			(not: NotationModel) => {
			    console.log('Dans ngOnInit notation', not);
			    this.loading = false;
			    this.notation = not;
			}
		    ).catch(
			(error) => {
			    console.log('Dans ngOnInit Erreur', error);
			});
	    }
	);
	
    };

    onGoBack() {
	this.router.navigate(['/notations/list-notation']);
    };

    onModify() {
	this.router.navigate(['/notations/list-notation/']);
    };

    onDelete() {
	this.loading = true;
	this.notationService.deleteNotation(this.notation._id).then(
	    () => {
		this.loading = false;
		this.router.navigate(['/notations/list-notation']);
	    }
	);
    };

    ngOnDestroy() {

  };

};
