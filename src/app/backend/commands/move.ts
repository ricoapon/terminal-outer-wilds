import {CommandParser} from './command-parser';
import {Injectable} from '@angular/core';
import {ParsedArgs} from '../util/command-line-argument-parser';
import {CommandResponse} from '../types/command-types';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';

@Injectable()
export class Move implements CommandParser {
  private readonly fileSystem: InMemoryFileSystemFacade;

  constructor(fileSystem: InMemoryFileSystemFacade) {
    this.fileSystem = fileSystem;
  }

  mainCommand(): string {
    return 'move';
  }

  parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    if (parsedArgs.args.length < 2) {
      return {response: 'You need to specify the source and destination path'};
    }
    const source = parsedArgs.args[0];
    const dest = parsedArgs.args[1];
    const result = this.fileSystem.moveFile(source, dest);
    if (!result) {
      return {response: 'Failed to move the file'};
    } else {
      return {response: ''};
    }
  }
}
