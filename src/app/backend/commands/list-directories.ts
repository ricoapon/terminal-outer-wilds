import {CommandResponse} from '../types/command-types';
import {ParsedArgs} from '../util/command-line-argument-parser';
import {Injectable} from '@angular/core';
import {CommandParser} from './command-parser';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';
import {
  Directory,
  FileSystemNode,
  InMemoryFile,
  ProgramFile,
  SymbolicLinkToDirectory,
  VideoFile
} from '../in-memory-file-system/file-system-types';

@Injectable()
export class ListDirectories implements CommandParser {
  private readonly fileSystem: InMemoryFileSystemFacade;

  constructor(fileSystem: InMemoryFileSystemFacade) {
    this.fileSystem = fileSystem;
  }

  mainCommand(): string {
    return 'ls';
  }

  // noinspection JSMethodCanBeStatic
  private isDirectory(node: FileSystemNode): boolean {
    return node instanceof Directory || node instanceof SymbolicLinkToDirectory;
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    const fileSystemNodes = this.fileSystem.listCurrentDirectoryNodes()!;

    if (fileSystemNodes.size === 0) {
      return {response: 'This directory is empty'};
    }

    const sortedFileSystemNodes = Array.of(...fileSystemNodes)
      // Filter invisible directories.
      .filter(node => !(node instanceof Directory && node.properties().isInvisible()))
      // Sort such that directories/symlinks go first, then files. Then sort alphabetically.
      .sort((a, b) => {
      if (this.isDirectory(a) && !this.isDirectory(b)) {
        return -1;
      } else if (!this.isDirectory(a) && this.isDirectory(b)) {
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
      if (fileSystemNode instanceof Directory || fileSystemNode instanceof SymbolicLinkToDirectory) {
        output += 'd';
      } else if (fileSystemNode instanceof InMemoryFile) {
        output += 'f';
      } else if (fileSystemNode instanceof ProgramFile) {
        output += 'p';
      } else if (fileSystemNode instanceof VideoFile) {
        output += 'v';
      } else {
        output += '?';
      }
      output += ' ' + fileSystemNode.name() + '\n';
    }

    return {response: output};
  }
}
