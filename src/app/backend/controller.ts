import {CommandResponse, InputCommand} from './types/command-types';
import {HttpClient} from '@angular/common/http';
import {parseCommandLineArguments} from './util/command-line-argument-parser';
import {Inject, Injectable} from '@angular/core';
import {COMMAND_PARSERS} from './commands/command-parser.module';
import {CommandParser} from './commands/command-parser';
import {InMemoryFileSystemFacade} from './in-memory-file-system/in-memory-file-system-facade';

/**
 * This class is the entry point for the entire backend. Commands are inserted here.
 */
@Injectable({providedIn: 'root'})
export class Controller {
  private readonly commandParserMap: Map<string, CommandParser>;

  constructor(private httpClient: HttpClient,
              @Inject(COMMAND_PARSERS) commandParsers: CommandParser[],
              private fileSystem: InMemoryFileSystemFacade) {
    // We want to start in the tutorial directory.
    this.fileSystem.changeCurrentDirectory('tutorial');
    // Store the command parsers into a map to easier find each instance.
    this.commandParserMap = new Map();
    for (const command of commandParsers) {
      this.commandParserMap.set(command.mainCommand(), command);
    }
  }

  public parseCommand(inputCommand: InputCommand): CommandResponse {
    const parsedArgs = parseCommandLineArguments(inputCommand.command);
    if (!this.commandParserMap.has(parsedArgs.mainCommand)) {
      return {response: 'Unknown command'};
    }
    return this.commandParserMap.get(parsedArgs.mainCommand).parseCommand(parsedArgs);
  }
}
