import {CommandResponse} from '../types/command-types';
import {VideoFile} from '../in-memory-file-system/file-system-types';
import {ParsedArgs} from '../util/command-line-argument-parser';
import {Injectable} from '@angular/core';
import {CommandParser} from './command-parser';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';

@Injectable()
export class WatchVideo implements CommandParser {
  private readonly fileSystem: InMemoryFileSystemFacade;

  constructor(fileSystem: InMemoryFileSystemFacade) {
    this.fileSystem = fileSystem;
  }

  mainCommand(): string {
    return 'watch';
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    // The command should always be in the form 'video <path>'.
    const path = parsedArgs.args[0];
    const video = this.fileSystem.getNode(path);
    if (video === undefined) {
      return {response: 'Video could not be found'};
    }

    if (!(video instanceof VideoFile)) {
      return {response: 'Given path is not a video'};
    }

    return {response: '', videoLines: video.videoLines()};
  }
}
