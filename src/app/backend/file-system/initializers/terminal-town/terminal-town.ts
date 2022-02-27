import {Injectable} from '@angular/core';
import {PropertiesAndFileSystemNodes} from '../../properties-and-file-system-nodes';
import {createPropertiesAndFileSystemNodes, FileSystemInitializer} from '../file-system-initializer';

@Injectable()
export class TerminalTown implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const STARTING_DIR = '/terminal-town';

    const map = new Map();
    map.set(STARTING_DIR, createPropertiesAndFileSystemNodes([

    ]));

    return map;
  }
}
