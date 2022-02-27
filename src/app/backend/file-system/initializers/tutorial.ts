import {createPropertiesAndFileSystemNodes, FileSystemInitializer} from './file-system-initializer';
import {PropertiesAndFileSystemNodes} from '../in-memory-file-system';
import {Directory, InMemoryFile} from '../file-system-types';

export class Tutorial implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const STARTING_DIR = '/tutorial/';

    const map = new Map();
    map.set('/tutorial', createPropertiesAndFileSystemNodes([
      new Directory('step-2'),
      new InMemoryFile('step-1.txt', 'tutorial/step-1.txt')
    ]));
    map.set(STARTING_DIR + 'step-2', createPropertiesAndFileSystemNodes([
      new InMemoryFile('step-3.txt', 'tutorial/step-3.txt'),
    ]));

    return map;
  }
}
