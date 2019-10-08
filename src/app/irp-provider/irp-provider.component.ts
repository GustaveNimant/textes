import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { StateService }          from '../services/state.service';
import { DataProviderService }   from '../services/data-provider.service';

import { Subscription } from 'rxjs';

import * as O from '../outils/outils-management';

@Component({
    selector: 'app-irp-provider',
    templateUrl: './irp-provider.component.html',
    styleUrls: ['./irp-provider.component.scss']
})

export class IrpProviderComponent implements OnInit, OnDestroy {

    private debugSub: Subscription;
    public debug: boolean;

    private irpResultSub: Subscription;
    private irpResult:string;
    
    public irpProviderForm: FormGroup;
    private objectName: string;
    public loading = false;
    public errorMessage = '';
    private here:string;

    constructor(
	private dataProviderService: DataProviderService,
	private stateService: StateService,
	private formBuilder: FormBuilder,
	private router: Router)
	{
	    let here = 'constructor';
	    console.log('%cEntrée dans','color:#00aa00', here);
	}
    
    ngOnInit() {
	let here = 'ngOnInit';
	console.log('%cEntrée dans','color:#00aa00', here);

	this.debugSub = this.stateService.debug$.subscribe(
	    (boo) => {
		this.debug = boo;
		console.log('Dans ngOnInit debug', this.debug);
	    }
	);

	this.irpProviderForm = this.formBuilder.group({
	    objectName: [''],
	});
	
    }

    onSubmit() {
	let here = 'onSubmit'
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.loading = true;
	
	this.objectName = this.irpProviderForm.get('objectName').value;
	console.log(here, 'irpProviderForm => objectName', this.objectName);

	this.irpResult = this.dataProviderService.dataProvide(this.objectName, here);
	this.irpProviderForm.reset();

	this.loading = false;
    }

    ngOnDestroy() {
	let here = 'ngOnDestroy';
	console.log('%cEntrée dans','color:#aa0000', here);
	this.debugSub.unsubscribe();
	console.log('Dans',here,'unsubscribe debugSub');
    }

}
