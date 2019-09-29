import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from './state.service';
import { CompteService } from './compte.service';

import * as O from '../outils/outils-management';

@Injectable()

export class CompteGuard implements CanActivate {

    constructor(private compteService: CompteService,
		private stateService: StateService,
		private router: Router) {
        console.log('Entrée dans constructor avec stateService', stateService);
    };

    canActivate(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) : Observable<boolean> {
		    console.log('Entrée dans canActivate');
		    return Observable.create(
			(observer) => {
			    console.log('Dans canActivate observer',observer);
			    this.compteService.isAuth$.subscribe(
				(auth) => {
				    console.log('Dans canActivate auth',auth);
				    if (!auth) {
					console.log('Dans canActivate aller à login');
					this.router.navigate(['/login']);
				    }
				    observer.next(true);
				}
			    );
			}
		    );
		}
    
}
