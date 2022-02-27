import {CommandParser} from '../controller';
import {InMemoryFileSystem} from '../file-system/in-memory-file-system';
import {CommandResponse} from '../types/command-types';
import {ParsedArgs} from '../command-line-argument-parser';
import {Injectable} from '@angular/core';

@Injectable()
export class ChangeDirectory implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;

  constructor(fileSystem: InMemoryFileSystem) {
    this.fileSystem = fileSystem;
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    const path = parsedArgs.args[0];

    if (!this.fileSystem.changeDirectory(path)) {
      return {response: 'Given path is incorrect'};
    }

    return {
      response: '',
      newCurrentDirectory: this.fileSystem.currentDirectoryName(),
      newBackgroundColor: this.fileSystem.currentDirectoryProperties().color()
    };
  }
}
