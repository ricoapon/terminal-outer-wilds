import {CommandResponse} from '../types/command-types';
import {ParsedArgs} from '../util/command-line-argument-parser';
import {Injectable} from '@angular/core';
import {CommandParser} from './command-parser';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';

@Injectable()
export class PresentWorkingDirectory implements CommandParser {
  private readonly fileSystem: InMemoryFileSystemFacade;

  constructor(fileSystem: InMemoryFileSystemFacade) {
    this.fileSystem = fileSystem;
  }

  mainCommand(): string {
    return 'pwd';
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    return {response: this.fileSystem.currentDirectory().toString()};
  }
}
