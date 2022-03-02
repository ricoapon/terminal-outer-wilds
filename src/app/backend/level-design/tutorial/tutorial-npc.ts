import {ParsedArgs} from '../../util/command-line-argument-parser';
import {Program} from '../../in-memory-file-system/file-system-types';
import {CommandResponse} from '../../types/command-types';

export class TutorialNpc implements Program {
  execute(parsedArgs: ParsedArgs): CommandResponse {
    return {response: 'I am an npc'};
  }
}
