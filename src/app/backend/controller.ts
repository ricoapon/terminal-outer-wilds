import {CommandResponse, InputCommand} from './types/command-types';
import {InMemoryFileSystem} from './file-system/in-memory-file-system';
import {ListDirectories} from './commands/list-directories';
import {ChangeDirectory} from './commands/change-directory';
import {PresentWorkingDirectory} from './commands/present-working-directory';
import {Read} from './commands/read';
import {Help} from './commands/help';
import {HttpClient} from '@angular/common/http';
import {AssetReader} from './asset-reader';
import {Manual} from './commands/manual';
import {Execute} from './commands/execute';
import {parseCommandLineArguments} from './command-line-argument-parser';
import {Inject, Injectable} from '@angular/core';
import {COMMAND_PARSERS} from './commands/command-parser.module';
import {CommandParser} from './commands/command-parser';

/**
 * This class is the entry point for the entire backend. Commands are inserted here.
 */
@Injectable({providedIn: 'root'})
export class Controller {
  private readonly listDirectories: ListDirectories;
  private readonly changeDirectory: ChangeDirectory;
  private readonly presentWorkingDirectory: PresentWorkingDirectory;
  private readonly read: Read;
  private readonly help: Help;
  private readonly manual: Manual;
  private readonly execute: Execute;

  constructor(private httpClient: HttpClient,
              @Inject(COMMAND_PARSERS) private commands: CommandParser[],
              private fileSystem: InMemoryFileSystem) {
    const assetReader = new AssetReader(httpClient);
    // this.fileSystem = new InMemoryFileSystem();
    // We want to start in the tutorial directory.
    this.fileSystem.changeDirectory('tutorial');
    this.listDirectories = new ListDirectories(this.fileSystem);
    this.changeDirectory = new ChangeDirectory(this.fileSystem);
    this.presentWorkingDirectory = new PresentWorkingDirectory(this.fileSystem);
    this.read = new Read(this.fileSystem, assetReader);
    this.help = new Help(assetReader);
    this.manual = new Manual(assetReader);
    this.execute = new Execute(this.fileSystem);
  }

  public parseCommand(inputCommand: InputCommand): CommandResponse {
    const parsedArgs = parseCommandLineArguments(inputCommand.command);
    const mainCommand = parsedArgs.mainCommand;

    if (mainCommand === 'ls') {
      return this.listDirectories.parseCommand(parsedArgs);
    } else if (mainCommand === 'cd') {
      return this.changeDirectory.parseCommand(parsedArgs);
    } else if (mainCommand === 'pwd') {
      return this.presentWorkingDirectory.parseCommand(parsedArgs);
    } else if (mainCommand === 'read') {
      return this.read.parseCommand(parsedArgs);
    } else if (mainCommand === 'man') {
      return this.manual.parseCommand(parsedArgs);
    } else if (mainCommand === 'help') {
      return this.help.parseCommand(parsedArgs);
    } else if (mainCommand === 'execute') {
      return this.execute.parseCommand(parsedArgs);

    }
    return {response: 'Unknown command'};
  }
}
