import {InjectionToken, NgModule} from '@angular/core';
import {CommandParser} from '../controller';
import {ChangeDirectory} from './change-directory';
import {Execute} from './execute';
import {Help} from './help';
import {ListDirectories} from './list-directories';
import {Manual} from './manual';
import {PresentWorkingDirectory} from './present-working-directory';
import {Read} from './read';

export const COMMAND_PARSERS = new InjectionToken<CommandParser>('CommandParser');

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {provide: COMMAND_PARSERS, useClass: ChangeDirectory, multi: true},
    {provide: COMMAND_PARSERS, useClass: Execute, multi: true},
    {provide: COMMAND_PARSERS, useClass: Help, multi: true},
    {provide: COMMAND_PARSERS, useClass: ListDirectories, multi: true},
    {provide: COMMAND_PARSERS, useClass: Manual, multi: true},
    {provide: COMMAND_PARSERS, useClass: PresentWorkingDirectory, multi: true},
    {provide: COMMAND_PARSERS, useClass: Read, multi: true},
  ],
  bootstrap: []
})
export class CommandsModule {
}
