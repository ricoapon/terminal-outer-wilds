import {Program} from '../../in-memory-file-system/file-system-types';
import {CommandResponse} from '../../types/command-types';
import {ParsedArgs} from '../../util/command-line-argument-parser';

export class ShortcutNpc implements Program {
  execute(parsedArgs: ParsedArgs): CommandResponse {
    // When money something is implemented, make sure that the response gives the shortcut.
    // noinspection PointlessBooleanExpressionJS
    if (false) {
      // noinspection UnreachableCodeJS
      return {response:
          'Money looses the tongue! The shortcut is an invisible directory, called shortcut, which directly goes to the city.\n' +
          'Try the command `cd shortcut/city` next time.'};
    }
    return {
      response: 'You look tired from walking all this way! Didn\'t you know about the shortcut? Sucks to be you. \n' +
        'I know about the shortcut, but I am not going to tell you for free.'
    };
  }
}
