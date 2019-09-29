import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent }     from './main-menu/main-menu.component';

import { TextesComponent }               from './textes/textes.component';
import { ListTexteComponent }             from './textes/list-texte/list-texte.component';
import { ModifyTexteComponent }           from './textes/modify-texte/modify-texte.component';
import { NewTexteComponent }              from './textes/new-texte/new-texte.component';
import { NewTexteVersionComponent }       from './textes/new-texte-version/new-texte-version.component';
import { SingleTexteComponent }           from './textes/single-texte/single-texte.component';

import { ParticipantsComponent }          from './participants/participants.component';
import { ListParticipantComponent }       from './participants/list-participant/list-participant.component';
import { NewParticipantComponent }        from './participants/new-participant/new-participant.component';
import { SingleParticipantComponent }     from './participants/single-participant/single-participant.component';

import { ButsComponent }                  from './buts/buts.component';
import { ListButComponent }               from './buts/list-but/list-but.component';
import { ModifyButComponent }             from './buts/modify-but/modify-but.component';
import { NewButComponent }                from './buts/new-but/new-but.component';
import { SingleButComponent }             from './buts/single-but/single-but.component';

import { NotationsComponent }             from './notations/notations.component';
import { ByobjectidNotationComponent }    from './notations/byobjectid-notation/byobjectid-notation.component';
import { ListNotationComponent }          from './notations/list-notation/list-notation.component';
import { NewNotationComponent }           from './notations/new-notation/new-notation.component';
import { SingleNotationComponent }        from './notations/single-notation/single-notation.component';
import { SumNotationComponent }           from './notations/sum-notation/sum-notation.component';

import { ComptesComponent }              from './comptes/comptes.component';
import { ListCompteComponent }           from './comptes/list-compte/list-compte.component';
import { NewCompteComponent }            from './comptes/new-compte/new-compte.component';
import { SingleCompteComponent }         from './comptes/single-compte/single-compte.component';

import { LoginComponent } from './login/login.component';

import { CompteGuard }                 from './services/compte-guard.service';
import { IrpProviderComponent }        from './irp-provider/irp-provider.component';

const routes: Routes = [
    { path: 'textes', component: TextesComponent,
      children: [
	  { path: 'new-texte', component: NewTexteComponent},
	  { path: 'single-texte/:id', component: SingleTexteComponent },
	  { path: 'list-texte', component: ListTexteComponent },
	  { path: 'new-texte-version/:id', component: NewTexteVersionComponent },
	  { path: 'modify-texte/:id', component: ModifyTexteComponent },
	  { path: '', pathMatch: 'full', redirectTo: '' },
	  { path: '**', redirectTo: 'list-texte' }
      ]
    },
    { path: 'participants', component: ParticipantsComponent,
      children: [
	  //      { path: 'new-participant', component: NewParticipantComponent, canActivate: [CompteGuard] },
	  //	  { path: 'modify-participant/:id', component: ModifyParticipantComponent, canActivate: [CompteGuard] },
	  //      { path: 'single-participant/:id', component: SingleParticipantComponent, canActivate: [CompteGuard] },
	  { path: 'new-participant', component: NewParticipantComponent},
	  { path: 'list-participant', component: ListParticipantComponent },
	  { path: 'single-participant/:id', component: SingleParticipantComponent },
	  { path: '', pathMatch: 'full', redirectTo: '' },
	  { path: '**', redirectTo: 'list-participant' }
      ]
    },
    { path: 'buts', component: ButsComponent,
      children: [
	  { path: 'new-but', component: NewButComponent},
	  { path: 'list-but', component: ListButComponent, canActivate: [CompteGuard] },
	  { path: 'single-but/:id', component: SingleButComponent, canActivate: [CompteGuard] },
	  { path: 'modify-but/:id', component: ModifyButComponent, canActivate: [CompteGuard] },
	  { path: '', pathMatch: 'full', redirectTo: 'list-but' },
	  { path: '**', redirectTo: 'list-but' }
      ]
    },
    { path: 'notations', component: NotationsComponent,
      children: [
	  { path: 'new-notation', component: NewNotationComponent},
	  { path: 'new-notation/:id', component: NewNotationComponent},
	  { path: 'list-notation', component: ListNotationComponent},
	  { path: 'single-notation/:id', component: SingleNotationComponent},
	  { path: 'byobjectid-notation/:texteObjectId', component: ByobjectidNotationComponent},
	  { path: 'sum-notation/:texteObjectId', component: SumNotationComponent},
	  { path: '', pathMatch: 'full', redirectTo: '' }, 
	  { path: '**', redirectTo: '' }
      ]
    },
    { path: 'comptes', component: ComptesComponent,
      children: [
	  { path: 'new-compte', component: NewCompteComponent},
	  { path: 'new-compte/:id', component: NewCompteComponent},
	  { path: 'list-compte', component: ListCompteComponent },
	  { path: 'single-compte/:id', component: SingleCompteComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'list-compte' }, 
	  { path: '**', redirectTo: 'list-compte' }
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'irp-provider', component: IrpProviderComponent },
    { path: 'main-menu', component: MainMenuComponent },
    { path: '', pathMatch: 'full', component: MainMenuComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
	RouterModule.forRoot(routes)
    ],
    exports: [
	RouterModule
    ],
    providers: [
	CompteGuard
    ]
})
export class AppRoutingModule {}
