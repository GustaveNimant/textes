import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { ParticipantModel }             from '../../models/participant.model';
import { CompteService }                from '../../services/compte.service';
import { ParticipantService }           from '../../services/participant.service';
import { StateService }                 from '../../services/state.service';
import { Subscription } from 'rxjs';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-new-participant',
    templateUrl: './new-participant.component.html',
    styleUrls: ['./new-participant.component.scss']
})

export class NewParticipantComponent implements OnInit, OnDestroy {

    public participantForm: FormGroup;
    public loading = false;
    public userId: string;
    public errorMessage: string;

    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private participantService: ParticipantService,
		private router: Router,
		private compteService: CompteService) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.state.mode$.next('form');
	this.participantForm = this.formBuilder.group({
	    nom: [null, Validators.required],
	    prenom: [null, Validators.required],
	    email: [null, Validators.required],
	    pseudo: [null, Validators.required],
	    password: [null, Validators.required],
	    clePublique: [null, Validators.required],
	    userId: [null, Validators.required],
	});

    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	const participant = new ParticipantModel();
	
	participant.nom = this.participantForm.get('nom').value;
	participant.prenom = this.participantForm.get('prenom').value;
	participant.email = this.participantForm.get('email').value;
	participant.pseudo = this.participantForm.get('pseudo').value;
	participant.password = this.participantForm.get('password').value;
	participant.clePublique = this.participantForm.get('clePublique').value;
	participant.userId = this.participantForm.get('userId').value;

	participant._id = new Date().getTime().toString();

	console.log('Dans onSubmit le participant est', participant);
	
	this.participantService.createNewParticipant(participant)
	    .then(
		() => {
		    this.participantForm.reset();
		    this.loading = false;
		    this.router.navigate(['/participants/list-participant']);
		}
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur est', error);
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

    }

}
