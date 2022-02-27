import {CommandParser} from '../controller';
import {InMemoryFileSystem} from '../file-system/in-memory-file-system';
import {CommandResponse, InputCommand} from '../types/command-types';

export class Read implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;

  constructor(fileSystem: InMemoryFileSystem) {
    this.fileSystem = fileSystem;
  }

  public parseCommand(command: InputCommand): CommandResponse {
    // The command should always be in the form 'read <path>'.
    const path = command.command.substr('read '.length);
    const file = this.fileSystem.getFile(path);
    if (file === undefined) {
      return {response: 'File could not be found'};
    }

    return {response: file.content(), fullScreen: true};
  }
}
