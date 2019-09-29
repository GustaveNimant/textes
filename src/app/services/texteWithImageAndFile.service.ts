import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TexteModel } from '../models/texte.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class TexteService {

    uri_all = 'http://localhost:3000/api/textes/';
    
    constructor(private http: HttpClient){};

    private textes: TexteModel[] = [];

    public textes$ = new Subject<TexteModel[]>();

    emitTexte() {
	console.log('Entrée dans emitTexte avec les textes', this.textes);
	this.textes$.next(this.textes);
    }

    getTexteById(id: string) {
	console.log('Entrée dans getTexteById avec id', id);

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

    createNewTexte(texte: TexteModel) {
	console.log('Entrée dans createNewTexte avec texte', texte);

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
    
    createNewTexteWithFile(texte: TexteModel, image: File) {
	console.log('Entrée dans createNewTexteWithFile avec texte', texte,' et image',image);

	return new Promise((resolve, reject) => {
	    const texteData = new FormData();
	    
	    texteData.append('texte', JSON.stringify(texte));
	    texteData.append('image', image, texte.titre);
	    
	    this.http.post(this.uri_all + 'withFile', texteData)
		.subscribe(
		    (response) => {
			resolve(response);
		    },
		    (error) => {
			reject(error);
		    }
		);
	});
    }
    
    getTextes() {
	console.log('Entrée dans getTextes avec uri_all', this.uri_all);

	return new Promise((resolve, reject) => {
	    console.log('Dans getTextes resolve', resolve);
	    this.http.get(this.uri_all).subscribe(
		(tex_a: TexteModel[]) => {
		    if (tex_a) {
			this.textes = tex_a;
			this.emitTexte();
		    }
		},
		(error) => {
		    console.log('Dans getTextes Erreur', error);
		    console.log('Dans getTextes error.status', error.status);
		    switch (error.status) {
			case 0:
			    console.log('Dans getTextes run nodemon server');
			    break;
			default:
			    break;
		    }
		},
		() => {
		    console.log('Dans getTextes terminé!')
		}
	    );
	});
	
    }
    
    modifyTexte(id: string, texte: TexteModel) { /* update id ? */
	console.log('Entrée dans modifyTexte avec id',id, 'et texte', texte);

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

    modifyTexteWithFile(id: string, texte: TexteModel, image: File | string) {
	console.log('Entrée dans modifyTexteWithFile avec id',id, 'et texte', texte,' et image',image);
	console.log('Dans modifyTexteWithFile typeof image',(typeof image));
	return new Promise((resolve, reject) => {
	    let texteData: TexteModel | FormData;
	    if (typeof image === 'string') {
		texte.shasum = image;
		texteData = texte;
	    } else {
		texteData = new FormData();
		texteData.append('texte', JSON.stringify(texte));
		texteData.append('image', image, texte.titre);
	    }
	    
	    this.http.put(this.uri_all + id, texteData).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    deleteTexte(id: string) {
	console.log('Entrée dans deleteTexte avec id',id);

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

}
