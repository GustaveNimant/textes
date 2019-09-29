import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { NotationService } from '../services/notation.service';

@Component({
    selector: 'app-notations',
    templateUrl: './notations.component.html',
    styleUrls: ['./notations.component.scss']
})

export class NotationsComponent implements OnInit, OnDestroy {

    constructor(private stateService: StateService) {}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
    }
    
    ngOnDestroy() {
    }
}
