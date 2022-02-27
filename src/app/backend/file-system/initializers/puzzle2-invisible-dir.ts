import {PropertiesAndFileSystemNodes} from '../in-memory-file-system';
import {InMemoryFile} from '../file-system-types';
import {
  createPropertiesAndFileSystemNodes,
  createPropertiesAndFileSystemNodesWithColor,
  FileSystemInitializer
} from './file-system-initializer';

export class Puzzle2InvisibleDir implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const STARTING_DIR = '/puzzle-2/';

    const map = new Map();
    map.set('/puzzle-2', createPropertiesAndFileSystemNodesWithColor('green', [
      new InMemoryFile('Where_is_the_directory.txt', 'Empty')
    ]));
    map.set(STARTING_DIR + 'invisible/dir', createPropertiesAndFileSystemNodes([
      new InMemoryFile('You_found_it.txt', 'Empty')
    ]));

    return map;
  }
}
