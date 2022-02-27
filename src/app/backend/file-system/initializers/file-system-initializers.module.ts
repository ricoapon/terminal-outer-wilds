import {InjectionToken, NgModule} from '@angular/core';
import {FileSystemInitializer} from './file-system-initializer';
import {DummyFiles} from './dummy-files';
import {Puzzle1Maze} from './puzzle-1-maze';
import {Root} from './root';
import {Tutorial} from './tutorial';
import {KingdomFarFarAway} from './kingdom-far-far-away/kingdom-far-far-away';

export const FILE_SYSTEM_INITIALIZERS = new InjectionToken<FileSystemInitializer>('FileSystemInitializer');

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {provide: FILE_SYSTEM_INITIALIZERS, useClass: DummyFiles, multi: true},
    {provide: FILE_SYSTEM_INITIALIZERS, useClass: Puzzle1Maze, multi: true},
    {provide: FILE_SYSTEM_INITIALIZERS, useClass: Root, multi: true},
    {provide: FILE_SYSTEM_INITIALIZERS, useClass: Tutorial, multi: true},
    {provide: FILE_SYSTEM_INITIALIZERS, useClass: KingdomFarFarAway, multi: true},
  ],
  bootstrap: []
})
export class FileSystemInitializersModule {
}
