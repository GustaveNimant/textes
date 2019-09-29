import { Router }                             from '@angular/router';
import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteModel }        from '../../models/compte.model';
import { TexteModel }        from '../../models/texte.model';
import { TexteService }      from '../../services/texte.service';
import { CompteService }     from '../../services/compte.service';
import { StateService }      from '../../services/state.service';
import { IrpRegisterService } from '../../services/irp-register.service';  

import { Subscription } from 'rxjs';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-new-texte',
    templateUrl: './new-texte.component.html',
    styleUrls: ['./new-texte.component.scss']
})

export class NewTexteComponent implements OnInit, OnDestroy {

    private texteForm: FormGroup;
    private loading = false;
    private errorMessage: string;
    private debug: boolean;
    
    private currentEmailSub: Subscription;
    private currentEmail: string;

    private irpRegisterSub: Subscription;
    private irpRegister= new Object();
    
    private currentCompte = new CompteModel();
    
    constructor(
	private formBuilder: FormBuilder,
	private stateService: StateService,
	private irpRegisterService: IrpRegisterService,
	private texteService: TexteService,
	private compteService: CompteService,
    	private router: Router)
	{
	    let here = O.functionName ();
	    console.log('%cEntrée dans','color:#00aa00', here);
	}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.stateService.mode$.next('form');

	this.debug = this.stateService.debug;
    	console.log('Dans ngOnInit debug', this.debug);

	this.irpRegisterSub = this.irpRegisterService.irpRegister$.subscribe(
	    (reg) => {
		this.irpRegister = reg;
		console.log('%cDans ngOnInit','color:#00aa00', 'irpRegisterService => irpRegister', this.irpRegister);
		this.currentEmail = reg['currentEmail'];
		console.log('%cDans ngOnInit','color:#00aa00', 'irpRegisterService => currentEmail', this.currentEmail);
		
		if (reg == '' || reg == undefined || this.currentEmail == undefined) {
		    console.log('Dans',here,'navigation vers /login');
		    this.router.navigate(['/login']);
		}
	    },
	    (error) => {
		console.log('%cDans',here,'naviguer vers login?','#aa0000');
		console.log('Dans',here,'currentEmailSub Erreur',error);
	    }
	);

	console.log('Dans',here,'from DataProvider currentEmail',this.currentEmail);

	this.compteService.getCompteByEmail (this.currentEmail)
	    .then(
		(com: CompteModel) => {
		    console.log('Dans ngOnInit getCompteByEmail com', com);
		    this.currentCompte = com;
		},
	    ).catch (
		(error) => {
		    console.log('Dans ngOnInit getCompteByEmail Erreur', error);
		}
	    );

	/* initialisation */
	this.texteForm = this.formBuilder.group({
	    titre: [null],
	    contenu: [null],
	    shasum: ['valeur initiale'],
	    noteMoyenne: [0],
	    noteEcartType: [0],
	    auteurId: ['someID'],
	    texteContenuId: ['someContentId'],
	    version: [0],
	});
	
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	/* copie le contenu du texteForm */
	const texte = new TexteModel();

	texte.titre = this.texteForm.get('titre').value;
	texte.contenu = this.texteForm.get('contenu').value;
	texte.shasum = this.texteForm.get('shasum').value;
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value;
	texte.noteEcartType = this.texteForm.get('noteEcartType').value;
	texte.auteurId = this.currentCompte._id;
	texte.version = this.texteForm.get('version').value;
	texte.texteContenuId = 'TCId' + (new Date().getTime().toString()); 

	texte._id = new Date().getTime().toString();

	console.log('Dans onSubmit texte', texte);
	
	this.texteService.createNewTexte(texte)
	    .then(
		() => {
		    this.texteForm.reset();
		    this.loading = false;
		    this.router.navigate(['/textes/list-texte']);
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
    }

}
