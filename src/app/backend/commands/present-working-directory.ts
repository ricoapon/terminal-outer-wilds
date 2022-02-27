import {InMemoryFileSystem} from '../file-system/in-memory-file-system';
import {CommandResponse} from '../types/command-types';
import {ParsedArgs} from '../command-line-argument-parser';
import {Injectable} from '@angular/core';
import {CommandParser} from './command-parser';

@Injectable()
export class PresentWorkingDirectory implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;

  constructor(fileSystem: InMemoryFileSystem) {
    this.fileSystem = fileSystem;
  }

  mainCommand(): string {
    return 'pwd';
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    if (parsedArgs.flags.has('P')) {
      return {response: this.fileSystem.getCurrentAbsolutePath()};
    }

    return {response: this.fileSystem.getCurrentPath()};
  }
}
