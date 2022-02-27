import {InMemoryFile} from '../file-system-types';
import {
  createPropertiesAndFileSystemNodes,
  createPropertiesAndFileSystemNodesWithColor,
  FileSystemInitializer
} from './file-system-initializer';
import {Injectable} from '@angular/core';
import {PropertiesAndFileSystemNodes} from '../properties-and-file-system-nodes';

@Injectable()
export class Puzzle2InvisibleDir implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const STARTING_DIR = '/puzzle-2/';

    const map = new Map();
    map.set('/puzzle-2', createPropertiesAndFileSystemNodesWithColor('green', [
      new InMemoryFile('README.txt', 'puzzle-2/README.txt')
    ]));
    map.set(STARTING_DIR + 'invisible/dir', createPropertiesAndFileSystemNodes([
      new InMemoryFile('You_found_it.txt', 'puzzle-2/You_found_it.txt')
    ]));

    return map;
  }
}
