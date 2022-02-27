import {Injectable} from '@angular/core';
import {createPropertiesAndFileSystemNodes, FileSystemInitializer} from '../file-system-initializer';
import {PropertiesAndFileSystemNodes} from '../../properties-and-file-system-nodes';
import {Directory, ProgramFile, SymbolicLinkToDirectory} from '../../file-system-types';
import {Path} from '../../path';
import {ShortcutNpc} from './shortcut-npc';

@Injectable()
export class KingdomFarFarAway implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const STARTING_DIR = '/kingdom-far-far-away';

    const map = new Map();
    map.set(STARTING_DIR, createPropertiesAndFileSystemNodes([
      new Directory('far'),
    ]));

    // The user needs to execute the command `cd far` depth+1 times.
    const depth = 4;
    let path = '/far';
    for (let i = 0; i < depth; i++) {
      map.set(STARTING_DIR + path, createPropertiesAndFileSystemNodes([
        new Directory('far'),
      ]));
      path += '/far';
    }
    map.set(STARTING_DIR + path, createPropertiesAndFileSystemNodes([
      new SymbolicLinkToDirectory('city', new Path(STARTING_DIR + '/shortcut/city'))
    ]));

    // Add the shortcut.
    map.set(STARTING_DIR + '/shortcut/city', createPropertiesAndFileSystemNodes([
      new ProgramFile('vvv', new ShortcutNpc()),
    ]));

    return map;
  }
}
