import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TexteModel } from '../models/texte.model';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import * as O from '../outils/outils-management';

@Injectable({
    providedIn: 'root'
})

export class TexteService {

    //    uri_all = 'http://localhost:3000/api/textes/';
    uri_all = O.uriGet('TexteService') + '/api/textes/';
    
    constructor(private http: HttpClient)
    {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
    };

    public texte_a: TexteModel[] = [];
    public texte_a$ = new BehaviorSubject<TexteModel[]>(this.texte_a);

    public currentTexte = new TexteModel();
    public currentTexte$ = new BehaviorSubject<TexteModel>(this.currentTexte)
    
    createNewTexte(texte: TexteModel) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec texte', texte);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all, texte)
		.subscribe( /* POST => createTexteCtrl par uri_all */
			    (response) => {
				resolve(response);
			    },
			    (error) => {
				console.log('Dans createNewTexte Erreur', error);
				reject(error);
			    },
			    () => {
				console.log('Sortie de createNewTexte');
			    }
		);
	});
    }
    
    createNewTexteVersion(texteObjectId: string, texte: TexteModel) { /* texteObjectId  conservé */
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec texteObjectId',texteObjectId);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all + texteObjectId, texte).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    deleteTexte(texteObjectId: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec texteObjectId',texteObjectId);

	return new Promise((resolve, reject) => {
	    this.http.delete(this.uri_all + texteObjectId).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    emitCurrentTexte(caller) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here,'avec currentTexte',this.currentTexte);
	console.log(here,'appelé par',caller);
	
	this.currentTexte$.next(this.currentTexte);
    }

    emitTextes(caller) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here,'avec les textes', this.texte_a);
	this.texte_a$.next(this.texte_a);
    }

    getTexteByObjectId(texteObjectId: string) {
	let here = O.functionName();
	console.log('%cEntrée dans Promise','color:#0000aa',here,'avec texteObjectId',texteObjectId);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + texteObjectId).subscribe(
		(tex:TexteModel) => {
		    if (tex) {
			this.currentTexte$.next(tex)
			console.log(here,'emit tex',tex);
		    }
		    resolve(tex);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    getTextes(caller) {
	let here = O.functionName ();
	console.log('%cEntrée dans Promise','color:#0000ff',here,'avec uri_all',this.uri_all);

	console.log(here,'appelé par',caller);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all).subscribe(
		(tex_a: TexteModel[]) => {
		    if (tex_a) {
			this.texte_a = tex_a;
			console.log('Dans',here,'texte_a',tex_a);
			this.emitTextes(here);
		    }
		},
		(error) => {
		    console.log('Dans',here,'Erreur', error);
		    console.log('Dans',here,'error.status', error.status);
		    switch (error.status) {
			case 0:
			    console.log('Dans',here,'run nodemon server');
			    break;
			default:
			    break;
		    }
		},
		() => {
		    console.log('%cSortie de','color:#aa0000', here);
		}
	    );
	});
	
    }

    modifyTexte(id: string, texte: TexteModel) { /* update id ? */
	let here = O.functionName ();
	console.log('%cEntrée dans','color!#00aa00','avec id',id, 'et texte', texte);

	return new Promise((resolve, reject) => {
	    this.http.put(this.uri_all + id, texte).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    provideTexteByObjectId (texteObjectId: string) {
	let here = O.functionName();
	console.log('%cEntrée dans','color!#00aa00','avec texteObjectId', texteObjectId);

	this.getTexteByObjectId (texteObjectId)
	    .then(
		(tex: TexteModel) => {
		    console.log('Dans',here,'currentTexte\$.next tex',tex);
		},
	    ).catch (
		(error) => {
		    console.log('Dans',here,'getTexteByObjectId Erreur', error);
		}
	    );
    }

}
