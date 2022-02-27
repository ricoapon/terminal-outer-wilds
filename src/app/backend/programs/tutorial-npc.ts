import {Program} from '../file-system/file-system-types';
import {CommandResponse} from '../types/command-types';

export class TutorialNpc implements Program {
  execute(command: string): CommandResponse {
    return {response: 'I am an npc'};
  }
}
