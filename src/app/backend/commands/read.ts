import {CommandResponse} from '../types/command-types';
import {AssetReader} from '../asset-reader';
import {InMemoryFile} from '../in-memory-file-system/file-system-types';
import {ParsedArgs} from '../util/command-line-argument-parser';
import {Injectable} from '@angular/core';
import {CommandParser} from './command-parser';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';

@Injectable()
export class Read implements CommandParser {
  private readonly fileSystem: InMemoryFileSystemFacade;
  private readonly assetReader: AssetReader;

  constructor(fileSystem: InMemoryFileSystemFacade, assetReader: AssetReader) {
    this.fileSystem = fileSystem;
    this.assetReader = assetReader;
  }

  mainCommand(): string {
    return 'read';
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    // The command should always be in the form 'read <path>'.
    const path = parsedArgs.args[0];
    const file = this.fileSystem.getNode(path);
    if (file === undefined) {
      return {response: 'File could not be found'};
    }

    if (!(file instanceof InMemoryFile)) {
      return {response: 'Given path is not a file'};
    }

    return {response: this.assetReader.get(file.assetUrl()), fullScreen: true};
  }
}
