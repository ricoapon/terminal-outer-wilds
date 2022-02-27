import {PropertiesAndFileSystemNodes} from '../in-memory-file-system';
import {File} from '../file-system-types';
import {createPropertiesAndFileSystemNodes, FileSystemInitializer} from './file-system-initializer';

export class Puzzle2InvisibleDir implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const STARTING_DIR = '/puzzle-2/';

    const map = new Map();
    map.set('/puzzle-2', createPropertiesAndFileSystemNodes([
      new File('Where_is_the_directory.txt')
    ]));
    map.set(STARTING_DIR + 'invisible/dir', createPropertiesAndFileSystemNodes([
      new File('You_found_it.txt')
    ]));

    return map;
  }
}
