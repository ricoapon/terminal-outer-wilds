import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import { AutofocusDirective } from './autofocus.directive';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KeyboardShortcutsModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
