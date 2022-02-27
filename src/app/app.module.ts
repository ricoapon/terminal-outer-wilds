import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {AutofocusDirective} from './autofocus.directive';
import {HttpClientModule} from '@angular/common/http';
import {CommandParserModule} from './backend/commands/command-parser.module';
import {FileSystemInitializersModule} from './backend/file-system/initializers/file-system-initializers.module';

@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KeyboardShortcutsModule.forRoot(),
    HttpClientModule,
    CommandParserModule,
    FileSystemInitializersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
