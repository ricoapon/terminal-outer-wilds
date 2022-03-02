import {Program} from '../../in-memory-file-system/file-system-types';
import {CommandResponse} from '../../types/command-types';
import {ParsedArgs} from '../../util/command-line-argument-parser';
import {InMemoryFileSystemFacade} from '../../in-memory-file-system/in-memory-file-system-facade';
import {AbsolutePath} from '../../in-memory-file-system/paths';

export class ShortcutNpc implements Program {
  private readonly fileSystem: InMemoryFileSystemFacade;
  private readonly programPath: AbsolutePath;

  constructor(fileSystem: InMemoryFileSystemFacade, programPath: AbsolutePath) {
    this.fileSystem = fileSystem;
    this.programPath = programPath;
  }

  execute(parsedArgs: ParsedArgs): CommandResponse {
    const moneyExists = this.fileSystem.getNode(this.programPath.resolve('stack-of-money')) !== undefined;
    if (moneyExists) {
      return {response:
          'Money looses the tongue! The shortcut is an invisible directory, called shortcut, which directly goes to the city.\n' +
          'Try the command `cd shortcut/city` next time.\n' +
          '\n' +
          'You could have also found out if you just did `pwd -P`. But thanks for the money!'};
    }

    return {
      response: 'You look tired from walking all this way! Didn\'t you know about the shortcut? Sucks to be you. \n' +
        'I know about the shortcut, but I am not going to tell you for free.'
    };
  }
}
