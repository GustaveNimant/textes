import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CompteModel } from '../models/compte.model';

import * as O from '../outils/outils-management';

@Injectable({
    providedIn: 'root'
})

export class CompteService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    token: string;  /* utilisé dans intercept */
    userId: string; /* utilisé dans intercept */

    public compte_a: CompteModel[] = [];
    public compte_a$ = new BehaviorSubject<CompteModel[]>(this.compte_a);

    public currentCompte = new CompteModel();
    public currentCompte$ = new BehaviorSubject<CompteModel>(this.currentCompte);
    //    public currentCompte$ = new Subject<CompteModel>();

    private currentPseudo ='';
    public currentPseudo$ = new BehaviorSubject<string>(this.currentPseudo);

    private loading:boolean = false;

    uri_all = 'http://localhost:3000/api/comptes/';

    constructor(private router: Router,
		private http: HttpClient)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00',here);
		}

    createNewCompte(compte: CompteModel) { /* signup */
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec compte ', compte);
	const uri_signup = this.uri_all + 'signup';

	return new Promise((resolve, reject) => {
	    this.http.post(uri_signup, compte) /* utilise compteCtrl.js.signup */
		.subscribe(
		    (resp) => {
			this.login (compte.email, compte.password)
			    .then(
				(res) => {
				    resolve(res);
				},
			    ).catch (
				(error) => {
				    console.log('Dans createNewCompte Erreur', error)
				    reject(error);
				}
			    );
		    },
		    (error) => {
			console.log('Dans createNewCompte Erreur, error')
			reject(error);
		    }
		);
	    console.log('Sortie de createNewCompte');
	});
    }

    deleteCompte(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec id',id);

	return new Promise((resolve, reject) => {
	    this.http.delete(this.uri_all + id).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    } // deleteCompte

    emitCurrentCompte(caller) {
	let here = O.functionName ();
	console.log('Entrée dans',here,'appelé par',caller);
	console.log('Avec currentCompte', this.currentCompte);
	this.currentCompte$.next(this.currentCompte);
    }

    emitComptes(caller) {
	let here = O.functionName ();
	console.log('Entrée dans',here,'avec les comptes', this.compte_a);
	console.log(here,'appelé par',caller);
	this.compte_a$.next(this.compte_a);
    }

    getComptes(caller) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000ff',here,'avec uri_all', this.uri_all);
	console.log(here,'appelé par',caller);

	return new Promise((resolve, reject) => {
	    console.log('Dans getNotations resolve', resolve)
	    this.http.get(this.uri_all).subscribe(
		(com_a: CompteModel[]) => {
		    if (com_a) {
			this.compte_a = com_a;
			console.log('Dans',here,'compte_a',com_a);
			this.emitComptes(here);
		    }
		},
		(error) => {
		    console.log('Dans',here,'Erreur:', error);
		},
		() => {
		    console.log('%cSortie de','color:#aa0000', here);
		}
	    );
	});
    }

    getCompteByEmail(email: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa','avec email', email);
	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + email).subscribe(
		(com: CompteModel) => {
		    console.log('Dans',here,'com',com);
		    this.currentCompte = com;
		    this.emitCurrentCompte(here);
		    resolve(com);
		},
		(error) => {
		    console.log('Dans',here,'Erreur', error);
		    reject(error);
		}
	    );
	});
    }

    getCompteById(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa','avec id',id);
	
	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + id).subscribe(
		(com: CompteModel) => {
		    console.log('Dans',here,'com',com);
		    if (com) {
			this.currentCompte = com;
			this.emitCurrentCompte(here);
		    }
		    resolve(com);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    getCompteIdByEmail(email: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#0000aa','avec email',email);

	this.getCompteByEmail (email)
	    .then(
		(com: CompteModel) => {
		    console.log('Dans',here,'com', com);
		    return com._id;
		},
	    ).catch (
		(error) => {
		    console.log('Dans',here,'Erreur', error);
		}
	    );
    }

    getComptePseudoByEmail(email: string) {
	console.log('Entrée dans getComptePseudoByEmail avec email', email);

	this.getCompteByEmail (email)
	    .then(
		(com: CompteModel) => {
		    console.log('Dans onLogin getComptePseudoByEmail com', com);
		    return com.pseudo;
		},
	    ).catch (
		(error) => {
		    console.log('Dans onLogin getComptePseudoByEmail Erreur', error);
		}
	    );
    }

    getComptePseudoById(id: string) {
	let here = O.functionName();
	console.log('Entrée dans',here,' avec id', id);

	this.getCompteById (id)
	    .then(
		(com: CompteModel) => {
		    console.log('Dans',here,'getCompteById com', com);
		    return com.pseudo;
		},
	    ).catch (
		(error) => {
		    console.log('Dans onLogin',here,'Erreur', error);
		}
	    );
    }

    login(email:string, password:string) {
	let here = O.functionName();
	console.log('%cEntrée dans Promise','color:#0000aa','avec email',email,' et password',password); 
	
	const uri_login = this.uri_all + 'login';

	return new Promise((resolve, reject) => {
	    this.http.post(uri_login,
			   {email: email, password: password})
		.subscribe(
		    (authData: /* get authData from middleware/auth.js from 3000 */
		     { token: string,
		       userId: string
		     }) => {
			 console.log('Dans login.subscribe authData',authData);

			 this.token = authData.token;
			 this.userId = authData.userId;
			 this.isAuth$.next(true);
			 console.log('Dans login.subscribe token', this.token);
			 console.log('Dans login.subscribe userId', this.userId);
			 console.log('Dans login.subscribe isAuth$', this.isAuth$);
			 resolve();
		     },
		    (error) => {
			console.log('Dans login.subscribe Erreur', error, 'pour uri_login', uri_login);
			reject(error);
		    }
		);
	});
    }

    logout() {
	let here = O.functionName();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.isAuth$.next(false);
	this.userId = null;
	this.token = null;
    }


}
