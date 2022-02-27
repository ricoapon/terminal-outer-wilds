import {Program} from '../../file-system-types';
import {CommandResponse} from '../../../types/command-types';
import {ParsedArgs} from '../../../util/command-line-argument-parser';

export class TutorialNpc implements Program {
  execute(parsedArgs: ParsedArgs): CommandResponse {
    return {response: 'I am an npc'};
  }
}
