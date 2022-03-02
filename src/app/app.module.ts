import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {AutofocusDirective} from './autofocus.directive';
import {HttpClientModule} from '@angular/common/http';
import {CommandParserModule} from './backend/commands/command-parser.module';
import {AssetReader} from './backend/asset-reader';
import {LevelDesignersModule} from './backend/level-design/level-designers.module';

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
    LevelDesignersModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initializeAssetReader, deps: [AssetReader], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function initializeAssetReader(assetReader: AssetReader): () => Promise<any> {
  return (): Promise<void> => {
    return assetReader.initialize();
  };
}
