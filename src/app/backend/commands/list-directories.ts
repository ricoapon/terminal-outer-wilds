import {CommandResponse} from '../types/command-types';
import {CommandParser} from '../controller';
import {InMemoryFileSystem} from '../file-system/in-memory-file-system';
import {Directory, InMemoryFile, ProgramFile} from '../file-system/file-system-types';
import {ParsedArgs} from '../command-line-argument-parser';
import {Injectable} from '@angular/core';

@Injectable()
export class ListDirectories implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;

  constructor(fileSystem: InMemoryFileSystem) {
    this.fileSystem = fileSystem;
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    const fileSystemNodes = this.fileSystem.listCurrentDirectoryNodes();

    if (fileSystemNodes.size === 0) {
      return {response: 'This directory is empty'};
    }

    // Sort such that directories go first, then files. Then sort alphabetically.
    const sortedFileSystemNodes = Array.of(...fileSystemNodes).sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) {
        return -1;
      } else if (!a.isDirectory() && b.isDirectory()) {
        return 1;
      }
      if (a.name() > b.name()) {
        return 1;
      } else if (a.name() < b.name()) {
        return -1;
      }
      return 0;
    });

    let output = '';
    for (const fileSystemNode of sortedFileSystemNodes) {
      if (fileSystemNode instanceof Directory) {
        output += 'd';
      } else if (fileSystemNode instanceof InMemoryFile) {
        output += 'f';
      } else if (fileSystemNode instanceof ProgramFile) {
        output += 'p';
      } else {
        output += '?';
      }
      output += ' ' + fileSystemNode.name() + '\n';
    }

    return {response: output};
  }
}
