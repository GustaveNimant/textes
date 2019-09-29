import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService }  from '../services/state.service';
import { CompteService } from '../services/compte.service';

import * as O from '../outils/outils-management';

@Component({
  selector: 'app-buts',
  templateUrl: './buts.component.html',
  styleUrls: ['./buts.component.scss']
})

export class ButsComponent implements OnInit, OnDestroy {

    constructor(private stateService: StateService,
		private compteService: CompteService) { }
    
    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

//	this.compteService.isAuth$.next(false);
	this.compteService.userId = '';
	this.compteService.token = '';
	
    }
    
    ngOnDestroy() {
    }
    
}
