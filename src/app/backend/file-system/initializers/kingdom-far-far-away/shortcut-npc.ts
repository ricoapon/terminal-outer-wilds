import {Program} from '../../file-system-types';
import {CommandResponse} from '../../../types/command-types';
import {ParsedArgs} from '../../../util/command-line-argument-parser';

export class ShortcutNpc implements Program {
  execute(parsedArgs: ParsedArgs): CommandResponse {
    return {
      response: 'You look tired from walking all this way! Didn\'t you know about the shortcut? Sucks to be you. \n' +
        'I know about the shortcut, but I am not going to tell you for free.'
    };
  }
}
