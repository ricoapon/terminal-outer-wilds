import {Directory} from '../file-system-types';
import {createPropertiesAndFileSystemNodesWithColor, FileSystemInitializer} from './file-system-initializer';
import {Injectable} from '@angular/core';
import {PropertiesAndFileSystemNodes} from '../properties-and-file-system-nodes';

/** Initializer for the root directory. Other initializers should not change the root directory. */
@Injectable()
export class Root implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const map = new Map();
    map.set('/', createPropertiesAndFileSystemNodesWithColor('blue', [
      new Directory('dummy-files'),
      new Directory('tutorial'),
      new Directory('puzzle-1'),
      new Directory('puzzle-2'),
    ]));

    return map;
  }
}
