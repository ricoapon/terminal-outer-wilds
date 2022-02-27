import {PropertiesAndFileSystemNodes} from '../in-memory-file-system';
import {Directory} from '../file-system-types';
import {createPropertiesAndFileSystemNodes, FileSystemInitializer} from './file-system-initializer';

/** Initializer for the root directory. Other initializers should not change the root directory. */
export class Root implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const map = new Map();
    map.set('/', createPropertiesAndFileSystemNodes([
      new Directory('dummy-files'),
      new Directory('puzzle-1'),
    ]));

    return map;
  }
}
