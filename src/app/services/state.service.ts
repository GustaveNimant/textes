import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class StateService {
    public mode$ = new BehaviorSubject<string>('');

    public debug$ = new BehaviorSubject<boolean>(true);
    public debug = true;

    public currentEmail$ = new BehaviorSubject<string>('');
    public currentEmail = '';
    
    public currentParticipantId$ = new BehaviorSubject<string>('');
    public currentParticipantId = '';
    
    public currentPseudo$ = new BehaviorSubject<string>('');
    public currentPseudo = '';
    
    public currentTexteContenuId$ = new BehaviorSubject<string>('');
    public currentTexteContenuId = '';

    public currentTexteObjectId$ = new BehaviorSubject<string>('');
    public currentTexteObjectId = '';

    public currentUrl$ = new BehaviorSubject<string>('');
    public currentUrl = '';

    public irpResult$ = new BehaviorSubject<string>('');
    public irpResult = '';

    debugSwitch() {
	console.log('Entrée dans debugSwitch');
	this.debug = !this.debug;
	console.log('Dans debugSwitch debug', this.debug);
    }

    public trace$ = new BehaviorSubject<boolean>(true);
    public trace = false;

    traceSwitch() {
	console.log('Entrée dans traceSwitch');
	this.trace = !this.trace;
	console.log('Dans traceSwitch trace', this.trace);
    }

}
