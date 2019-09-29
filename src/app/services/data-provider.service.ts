import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IrpRegisterService } from './irp-register.service';  

import { Subscription } from 'rxjs';

import * as O from '../outils/outils-management';

@Injectable({
    providedIn: 'root'
})

export class DataProviderService {

    private irpRegisterSub: Subscription;
    private irpRegister= new Object();
    private currentEmail: string;

    constructor(
	private router: Router,
	private irpRegisterService: IrpRegisterService)
	{
	    let here = O.functionName ();
	    console.log('%cEntrée dans','color:#00aa00', here);
	}
    
    currentEmailBuild () {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	/* récupère currentEmail initialisé par login */
	this.irpRegisterSub = this.irpRegisterService.irpRegister$.subscribe(
	    (reg) => {
		this.irpRegister = reg;
		this.currentEmail = reg['currentEmail'];
		console.log('%cDans ngOnInit','color:#00aa00', 'irpRegisterService => irpRegister >', this.irpRegister,'<');
		console.log('%cDans ngOnInit','color:#00aa00', 'irpRegisterService => currentEmail', this.currentEmail);
		
		if (reg == '' ||
		    reg == undefined ||
		    this.currentEmail == undefined) {
		    console.log('Dans',here,'navigation vers /login');
		    this.router.navigate(['/login']);
		}
	    },
	    (error) => {
		console.log('%cDans ngOnInit naviguer vers login?','#aa0000');
		console.log('Dans ngOnInit currentEmailSub Erreur',error);
	    }
	);

	O.exiting_from_function_with_what (here,'currentEmail',this.currentEmail);	
	return this.currentEmail;
    }

    dataBuild (irpKey, caller):any {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	let irpKeyBuild = 'this.'+irpKey+'Build()';
	console.log('Dans ',here,'irpKeyBuild',irpKeyBuild);
	console.log('Dans ',here,'typeof',irpKeyBuild,' ',typeof(irpKeyBuild));

	try {
	    let result = eval (irpKeyBuild);
	    console.log('Dans',here,'result >',result,'<');
	    O.exiting_from_function (here);	
	    return result;
	} catch (error) {
	    let result = here+': la fonction ' + irpKeyBuild + 'n\'existe pas';
	    alert (result)
	}
	
    }
    
    dataBuildAndStore (irpKey, caller):any {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	let irpVal = this.dataBuild (irpKey, here);
	console.log('Dans ',here,'irpVal',irpVal);

	this.irpRegisterService.irpStore (irpKey, irpVal, here);
	console.log ('Dans',here,'irpKey',irpKey,' a été enregistrée avec irpVal>',irpVal,'<');

	O.exiting_from_function (here);	
	return irpVal;
    }
    
    dataProvide (irpKey, caller):any {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here,'appelé par',caller);

	if (irpKey == O.capitalize(irpKey)){
	    alert ('irpKey >'+irpKey+'< ne doit pas être capitalisée!')
	}

	if (this.irpRegisterService.irpIsStored(irpKey, here)) {
	    let result = this.irpRegisterService.irpRetrieve(irpKey, here);
	    console.log('Dans',here,'isStored result >',result,'<');
	    O.exiting_from_function (here);	
	    return result;
	} else {
	    let result = this.dataBuildAndStore(irpKey, here);
	    console.log('Dans',here,'isBuilt result >',result,'<');
	    O.exiting_from_function (here);	
	    return result;
	}
	
    }
    
}
