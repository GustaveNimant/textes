import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import * as O from '../outils/outils-management';

@Injectable({
    providedIn: 'root'
})

export class StateService {
    public mode$ = new BehaviorSubject<string>('');

    public debug = true;
    public debug$ = new BehaviorSubject<boolean>(this.debug);

    public trace = false;
    public trace$ = new BehaviorSubject<boolean>(this.trace);

    public verbose = true;
    public verbose$ = new BehaviorSubject<boolean>(this.verbose);

    public currentEmail = '';
    public currentEmail$ = new BehaviorSubject<string>(this.currentEmail);
    
    public currentParticipantId = '';
    public currentParticipantId$ = new BehaviorSubject<string>(this.currentParticipantId);
    
    public currentPseudo = '';
    public currentPseudo$ = new BehaviorSubject<string>(this.currentPseudo);
    
    public currentTexteContenuId = '';
    public currentTexteContenuId$ = new BehaviorSubject<string>(this.currentTexteContenuId);

    public currentTexteObjectId = '';
    public currentTexteObjectId$ = new BehaviorSubject<string>(this.currentTexteObjectId);

    public currentUrl = '';
    public currentUrl$ = new BehaviorSubject<string>(this.currentUrl);

    public irpResult = '';
    public irpResult$ = new BehaviorSubject<string>(this.irpResult);

    debugSwitch() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.debug = !this.debug;
	this.debug$.next(this.debug);
	console.log('Dans',here,'debug', this.debug);
    }

    traceSwitch() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.trace = !this.trace;
	this.trace$.next(this.trace);
	console.log('Dans',here,'trace', this.trace);
    }

    verboseSwitch() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.verbose = !this.verbose;
	this.verbose$.next(this.verbose);
	console.log('Dans',here,'verbose', this.verbose);
    }

}
