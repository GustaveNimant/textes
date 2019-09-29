import { MatProgressSpinnerModule } from '@angular/material';

import { CompteInterceptor }     from './interceptors/compte-interceptor';

import { AppRoutingModule }         from './app-routing.module';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule }                         from '@angular/core';



import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';

import { TextesComponent }               from './textes/textes.component';

import { ListTexteComponent }             from './textes/list-texte/list-texte.component';
import { ModifyTexteComponent }           from './textes/modify-texte/modify-texte.component';
import { NewTexteComponent }              from './textes/new-texte/new-texte.component';
import { NewTexteVersionComponent }       from './textes/new-texte-version/new-texte-version.component';
import { SingleTexteComponent }           from './textes/single-texte/single-texte.component';

import { ParticipantsComponent }           from './participants/participants.component';
import { SingleParticipantComponent } from './participants/single-participant/single-participant.component';
import { NewParticipantComponent }    from './participants/new-participant/new-participant.component';
import { ListParticipantComponent }   from './participants/list-participant/list-participant.component';

import { ButsComponent }       from './buts/buts.component';
import { ListButComponent }         from './buts/list-but/list-but.component';
import { ModifyButComponent }       from './buts/modify-but/modify-but.component';
import { NewButComponent }          from './buts/new-but/new-but.component';
import { SingleButComponent }       from './buts/single-but/single-but.component';

import { NotationsComponent }       from './notations/notations.component';
import { ListNotationComponent }    from './notations/list-notation/list-notation.component';
import { NewNotationComponent }     from './notations/new-notation/new-notation.component';
import { SingleNotationComponent }  from './notations/single-notation/single-notation.component';
import { SumNotationComponent }     from './notations/sum-notation/sum-notation.component';
import { ByobjectidNotationComponent }     from './notations/byobjectid-notation/byobjectid-notation.component';

import { ComptesComponent }        from './comptes/comptes.component';
import { ListCompteComponent }      from './comptes/list-compte/list-compte.component';
import { NewCompteComponent }       from './comptes/new-compte/new-compte.component';
import { SingleCompteComponent }    from './comptes/single-compte/single-compte.component';

import { LoginComponent }           from './login/login.component';
import { IrpProviderComponent }     from './irp-provider/irp-provider.component';

@NgModule({
    declarations: [
	AppComponent,
	ButsComponent,
	ByobjectidNotationComponent,
	ComptesComponent,
	HeaderComponent,
	IrpProviderComponent,
	ListButComponent,
	ListCompteComponent,
	ListNotationComponent,
	ListParticipantComponent,
	ListTexteComponent,
	LoginComponent,
	MainMenuComponent,
	ModifyButComponent,
	ModifyTexteComponent,
	NewButComponent,
	NewCompteComponent,
	NewNotationComponent,
	NewParticipantComponent,
	NewTexteComponent,
	NewTexteVersionComponent,
	NotationsComponent,
	ParticipantsComponent,
	SingleButComponent,
	SingleCompteComponent,
	SingleNotationComponent,
	SingleParticipantComponent,
	SingleTexteComponent,
	SumNotationComponent,
	TextesComponent,
    ],
    imports: [
	BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	BrowserAnimationsModule,
	MatProgressSpinnerModule,
	HttpClientModule
    ],
    providers: [
	{
	    provide: HTTP_INTERCEPTORS,
	    useClass: CompteInterceptor,
	    multi: true
	}
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
