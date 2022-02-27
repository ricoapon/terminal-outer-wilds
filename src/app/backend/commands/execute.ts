import {CommandResponse} from '../types/command-types';
import {InMemoryFileSystem} from '../file-system/in-memory-file-system';
import {ProgramFile} from '../file-system/file-system-types';
import {ParsedArgs} from '../command-line-argument-parser';
import {Injectable} from '@angular/core';
import {CommandParser} from './command-parser';

@Injectable()
export class Execute implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;

  constructor(fileSystem: InMemoryFileSystem) {
    this.fileSystem = fileSystem;
  }

  mainCommand(): string {
    return 'execute';
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    // The command should always be in the form 'execute <path> <arguments>'.
    const path = parsedArgs.args[0];
    const program = this.fileSystem.getNode(path);

    if (program === undefined) {
      return {response: 'Program could not be found'};
    }

    if (!(program instanceof ProgramFile)) {
      return {response: 'Given path is not a program'};
    }

    return program.program().execute(parsedArgs);
  }
}
