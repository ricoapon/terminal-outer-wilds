import {CommandResponse} from '../types/command-types';
import {ParsedArgs} from '../util/command-line-argument-parser';
import {Injectable} from '@angular/core';
import {CommandParser} from './command-parser';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';

@Injectable()
export class ChangeDirectory implements CommandParser {
  private readonly fileSystem: InMemoryFileSystemFacade;

  constructor(fileSystem: InMemoryFileSystemFacade) {
    this.fileSystem = fileSystem;
  }

  mainCommand(): string {
    return 'cd';
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    const path = parsedArgs.args[0];

    if (!this.fileSystem.changeCurrentDirectory(path)) {
      return {response: 'Given path is incorrect'};
    }

    return {
      response: '',
      newCurrentDirectory: this.fileSystem.currentDirectory().name(),
      newBackgroundColor: this.fileSystem.currentDirectoryProperties()?.color()
    };
  }
}
