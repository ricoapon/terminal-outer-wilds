import {InputCommand, CommandResponse} from './types/command-types';

/**
 * This class is the entry point for the entire backend. Commands are inserted here.
 */
export class Controller {
  public parseCommand(command: InputCommand): CommandResponse {
    if (command.command === 'ls') {
      return {
        response: 'line\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\n',
      };
    }
    return {response: 'Unknown command'};
  }
}
