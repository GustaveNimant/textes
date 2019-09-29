import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotationModel }     from '../../models/notation.model';
import { NotationService }  from '../../services/notation.service';
import { CompteService } from '../../services/compte.service';
import { StateService }      from '../../services/state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-single-notation',
    templateUrl: './single-notation.component.html',
    styleUrls: ['./single-notation.component.scss']
})

export class SingleNotationComponent implements OnInit, OnDestroy {

    public notation: NotationModel;
    public loading: boolean;

    constructor(private state: StateService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private notationService: NotationService,
		private compteService: CompteService)
		{
		    console.log('Entrée dans constructor');
		};
    
    ngOnInit(){
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.state.mode$.next('single-notation');

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
