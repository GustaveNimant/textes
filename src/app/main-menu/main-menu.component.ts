import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as O from '../outils/outils-management';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})

export class MainMenuComponent implements OnInit {

    constructor(private router: Router) {
	O.constructorLog(O.functionName());
    }

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
    }
    
    onNavigate(endpoint: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Dans',here,'navigation vers',endpoint);
	this.router.navigate([endpoint]);
    }
}
