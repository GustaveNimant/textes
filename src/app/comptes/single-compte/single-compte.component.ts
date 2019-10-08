import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompteModel } from '../../models/compte.model';
import { CompteService } from '../../services/compte.service';
import { Subscription } from 'rxjs';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-single-compte',
    templateUrl: './single-compte.component.html',
    styleUrls: ['./single-compte.component.scss']
})

export class SingleCompteComponent implements OnInit, OnDestroy {

    public currentCompte: CompteModel;
    private userId: string;
    public isAuth: boolean;

    public loading: boolean;
    public debug: boolean;
    
    private isAuthSub: Subscription;

    constructor(private stateService: StateService,
		private router: Router,
		private route: ActivatedRoute,
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

	this.stateService.mode$.next('single-compte');
	this.userId = this.compteService.userId ? this.compteService.userId : 'compteID40282382';
	console.log('Dans ngOnInit userId', this.userId);
	
	this.route.params.subscribe(
	    (params: Params) => {
		console.log('Dans ngOnInit params', params);
		this.compteService.getCompteById(params.id)
		    .then(
			(com: CompteModel) => {
			    console.log('Dans ngOnInit.route.params com', com);
			    this.loading = false;
			    this.currentCompte = com;
			}
		    );
	    }
	);
	
	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

    };

    onGoBack() {
	this.router.navigate(['/comptes/list-comptes']);
    };

    onModify() {
	this.router.navigate(['/comptes/list-comptes/']);
    };

    onDelete() {
	this.loading = true;
	this.compteService.deleteCompte(this.currentCompte._id)
	    .then(
		() => {
		    this.loading = false;
		    this.router.navigate(['/comptes/list-comptes']);
		}
	    );
    };

    ngOnDestroy() {
  };

};
