import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { NotationModel } from '../models/notation.model';
import { Subject }       from 'rxjs';

import * as O from '../outils/outils-management';

@Injectable({
    providedIn: 'root'
})

export class NotationService {

    uri_all = 'http://localhost:3000/api/notations/';
    
    constructor(private http: HttpClient){};

    private notation_a: NotationModel[] = [];
    public notation_a$ = new Subject<NotationModel[]>();

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

	getNotations() {
	    console.log('Entrée dans getNotations avec uri_all', this.uri_all);

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
} // export
