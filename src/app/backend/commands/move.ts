import {CommandParser} from './command-parser';
import {Injectable} from '@angular/core';
import {ParsedArgs} from '../util/command-line-argument-parser';
import {CommandResponse} from '../types/command-types';

@Injectable()
export class Move implements CommandParser {
  mainCommand(): string {
    return 'move';
  }

  parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    return undefined;
  }
}
