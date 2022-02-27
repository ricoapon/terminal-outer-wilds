import {CommandParser} from '../controller';
import {InMemoryFileSystem} from '../file-system/in-memory-file-system';
import {CommandResponse, InputCommand} from '../types/command-types';

export class PresentWorkingDirectory implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;

  constructor(fileSystem: InMemoryFileSystem) {
    this.fileSystem = fileSystem;
  }

  public parseCommand(inputCommand: InputCommand): CommandResponse {
    if (inputCommand.command === 'pwd -P') {
      return {response: this.fileSystem.getCurrentAbsolutePath()};
    }

    return {response: this.fileSystem.getCurrentPath()};
  }
}
