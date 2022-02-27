import {InputCommand, CommandResponse} from './types/command-types';
import {InMemoryFileSystem} from './file-system/in-memory-file-system';
import {DummyFiles} from './file-system/initializers/dummy-files';
import {ListDirectories} from './commands/list-directories';
import {ChangeDirectory} from './commands/change-directory';
import {PresentWorkingDirectory} from './commands/present-working-directory';
import {Root} from './file-system/initializers/root';
import {Puzzle1Maze} from './file-system/initializers/puzzle-1-maze';
import {Puzzle2InvisibleDir} from './file-system/initializers/puzzle2-invisible-dir';
import {Read} from './commands/read';
import {Help} from './commands/help';
import {Tutorial} from './file-system/initializers/tutorial';
import {HttpClient} from '@angular/common/http';
import {AssetReader} from './asset-reader';

export interface CommandParser {
  parseCommand(inputCommand: InputCommand): CommandResponse;
}

/**
 * This class is the entry point for the entire backend. Commands are inserted here.
 */
export class Controller implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;
  private readonly listDirectories: ListDirectories;
  private readonly changeDirectory: ChangeDirectory;
  private readonly presentWorkingDirectory: PresentWorkingDirectory;
  private readonly read: Read;
  private readonly help: Help;

  constructor(private httpClient: HttpClient) {
    const assetReader = new AssetReader(httpClient);
    this.fileSystem = new InMemoryFileSystem([new Root(), new DummyFiles(), new Puzzle1Maze(), new Puzzle2InvisibleDir(), new Tutorial()]);
    // We want to start in the tutorial directory.
    this.fileSystem.changeDirectory('tutorial');
    this.listDirectories = new ListDirectories(this.fileSystem);
    this.changeDirectory = new ChangeDirectory(this.fileSystem);
    this.presentWorkingDirectory = new PresentWorkingDirectory(this.fileSystem);
    this.read = new Read(this.fileSystem, assetReader);
    this.help = new Help(assetReader);
  }

  public parseCommand(inputCommand: InputCommand): CommandResponse {
    const programCommand = inputCommand.command.indexOf(' ') < 0 ? inputCommand.command :
      inputCommand.command.substr(0, inputCommand.command.indexOf(' '));

    if (programCommand === 'ls') {
      return this.listDirectories.parseCommand(inputCommand);
    } else if (programCommand === 'cd') {
      return this.changeDirectory.parseCommand(inputCommand);
    } else if (programCommand === 'pwd') {
      return this.presentWorkingDirectory.parseCommand(inputCommand);
    } else if (programCommand === 'read') {
      return this.read.parseCommand(inputCommand);
    } else if (programCommand === 'help') {
      return this.help.parseCommand(inputCommand);
    }
    return {response: 'Unknown command'};
  }
}
