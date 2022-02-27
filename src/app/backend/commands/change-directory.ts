import {CommandParser} from '../controller';
import {InMemoryFileSystem} from '../file-system/in-memory-file-system';
import {CommandResponse, InputCommand} from '../types/command-types';

export class ChangeDirectory implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;

  constructor(fileSystem: InMemoryFileSystem) {
    this.fileSystem = fileSystem;
  }

  public parseCommand(command: InputCommand): CommandResponse {
    // The command should always be in the form 'cd <path>'.
    const path = command.command.substr('cd '.length);

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
