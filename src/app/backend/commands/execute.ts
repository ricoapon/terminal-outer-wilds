import {CommandParser} from '../controller';
import {CommandResponse, InputCommand} from '../types/command-types';
import {InMemoryFileSystem} from '../file-system/in-memory-file-system';
import {ProgramFile} from '../file-system/file-system-types';

export class Execute implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;

  constructor(fileSystem: InMemoryFileSystem) {
    this.fileSystem = fileSystem;
  }

  public parseCommand(command: InputCommand): CommandResponse {
    // The command should always be in the form 'execute <path> <arguments>'.
    const path = command.command.split(' ')[1];
    const program = this.fileSystem.getNode(path);

    if (program === undefined) {
      return {response: 'Program could not be found'};
    }

    if (!(program instanceof ProgramFile)) {
      return {response: 'Given path is not a program'};
    }

    const commandForProgram = command.command.substr('execute '.length + path.length + 1);
    return program.program().execute(commandForProgram);
  }
}
