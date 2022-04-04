import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from '@ngrx/store';
import {currentUserReducer} from "./Store/currentUser/currentUser.reducers";
import {EffectsModule} from "@ngrx/effects";
import {CurrentUserEffects} from "./Store/currentUser/currentUser.effects";
import {SystemModule} from "./system/system.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({currentUser: currentUserReducer}),
    EffectsModule.forRoot([CurrentUserEffects]),
    SystemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
