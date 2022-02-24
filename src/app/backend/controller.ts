/**
 * This class is the entry point for the entire backend. Commands are inserted here.
 */
import {InputCommand, CommandResponse} from './types/command-types';

export class Controller {

  public parseCommand(command: InputCommand): CommandResponse {
    return {response: 'Unknown command'};
  }
}
