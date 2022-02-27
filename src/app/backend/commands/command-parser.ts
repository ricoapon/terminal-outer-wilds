import {ParsedArgs} from '../util/command-line-argument-parser';
import {CommandResponse} from '../types/command-types';

export interface CommandParser {
  parseCommand(parsedArgs: ParsedArgs): CommandResponse;
  mainCommand(): string;
}
