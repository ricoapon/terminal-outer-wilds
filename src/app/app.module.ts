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
import {InMemoryFileSystemFacade} from './backend/in-memory-file-system/in-memory-file-system-facade';
import {LevelDesignBootstrap} from './backend/level-design/level-designer-bootstrap';
import {TerminalContainerComponent} from './frontend/terminal-container/terminal-container.component';
import {TerminalBodyComponent} from './frontend/terminal-body/terminal-body.component';
import {TerminalExecutedCommandsComponent} from './frontend/terminal-executed-commands/terminal-executed-commands.component';
import {TerminalInputComponent} from './frontend/terminal-input/terminal-input.component';
import { TerminalFullScreenComponent } from './frontend/terminal-full-screen/terminal-full-screen.component';
import { TerminalVideoComponent } from './frontend/terminal-video/terminal-video.component';

@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective,
    TerminalContainerComponent,
    TerminalBodyComponent,
    TerminalExecutedCommandsComponent,
    TerminalInputComponent,
    TerminalFullScreenComponent,
    TerminalVideoComponent
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
    {provide: APP_INITIALIZER, useFactory: initializeAssetReader, deps: [AssetReader], multi: true},
    {
      provide: APP_INITIALIZER, useFactory: initializeFileSystemWithLevelDesigners,
      deps: [LevelDesignBootstrap, InMemoryFileSystemFacade], multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

function initializeAssetReader(assetReader: AssetReader): () => Promise<any> {
  return (): Promise<void> => {
    return assetReader.initialize();
  };
}

function initializeFileSystemWithLevelDesigners(levelDesignerBootstrap: LevelDesignBootstrap,
                                                fileSystem: InMemoryFileSystemFacade): () => Promise<any> {
  return (): Promise<void> => {
    return new Promise<void>((resolve) => {
      levelDesignerBootstrap.design(fileSystem);
      resolve();
    });
  };
}
