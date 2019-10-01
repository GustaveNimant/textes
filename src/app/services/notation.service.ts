import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { NotationModel } from '../models/notation.model';
import { Subject }       from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import * as O from '../outils/outils-management';

@Injectable({
    providedIn: 'root'
})

export class NotationService {

    uri_all = 'http://localhost:3000/api/notations/';

    constructor(private http: HttpClient){};

    private notation_a: NotationModel[] = [];
    public notation_a$ = new BehaviorSubject<NotationModel[]>(this.notation_a);

    createNewNotation(notation: NotationModel) {
	console.log('Entrée dans createNewNotation avec notation', notation);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all, notation)
		.subscribe( /* POST => createNotationCtrl par uri_all */
			    (response) => {
				resolve(response);
			    },
			    (error) => {
				console.log('Dans createNewNotation Erreur de compte', error);
				reject(error);
			    },
			    () => {
				console.log('Sortie de createNewNotation');
			    }
		);
	});
    }

    deleteNotation(id: string) {
	console.log('Entrée dans deleteNotation avec id',id);

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
    }

    emitNotations() {
	console.log('Entrée dans emitNotations avec les notations', this.notation_a);
	this.notation_a$.next(this.notation_a);
    }

    getNotations(caller) {
	let here = O.functionName ();
	console.log('Entrée dans',here,'avec uri_all', this.uri_all);
	console.log(here,'appelé par',caller);

	return new Promise((resolve, reject) => {
	    console.log('Dans getNotations resolve', resolve);
	    this.http.get(this.uri_all).subscribe(
		(not_a: NotationModel[]) => {
		    if (not_a) {
			this.notation_a = not_a;
			this.emitNotations();
		    }
		},
		(error) => {
		    console.log('Dans getNotations Erreur', error);
		    console.log('Dans getNotations error.status', error.status);
		    switch (error.status) {
			case 0:
			    console.log('Dans getNotations run nodemon server');
			    break;
			default:
			    break;
		    }
		},
		() => {
		    console.log('Dans getNotations terminé!')
		}
	    );
	});
    }

    getNotationById(id: string) {
	console.log('Entrée dans getNotationById avec id', id);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + id).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    getNotationsByTexteObjectId(texteObjectId: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here,'avec texteObjectId', texteObjectId);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + 'byoid/' + texteObjectId).subscribe(
		(not_a: NotationModel[]) => {
		    console.log(here,'not_a',not_a);
		    this.notation_a$.next(not_a)
		    resolve(not_a);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    existsNotationByTextIdAndParticipantId (texteObjectId: string, participantId:string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here,'avec texteObjectId',texteObjectId,'participantId',participantId);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + 'oandp/' + texteObjectId+':'+participantId).subscribe(
		(response) => {
		    console.log(here,'response',response);
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});

    }

    provideNotationsByTexteObjectId(texteObjectId: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here,'avec texteObjectId', texteObjectId);

	this.getNotationsByTexteObjectId(texteObjectId)
	    .then(
		(not_a) => {
		    console.log('Dans',here,'liste des notations not_a',not_a);
                    for (let i in not_a) {
			this.notation_a[i] = not_a[i];
		    }
		}
    	    )
	    .catch(
		(error) => {
		    console.log('Dans',here,'Erreur', error);
		    console.log('Dans',here,'Erreur.status', error.status);
		}
	    );
    }

} // export
