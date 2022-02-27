import {PropertiesAndFileSystemNodes} from '../in-memory-file-system';
import {Directory, File, SymbolicLinkToDirectory} from '../file-system-types';
import {Path} from '../path';
import {createPropertiesAndFileSystemNodes, FileSystemInitializer} from './file-system-initializer';

export class Puzzle1Maze implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const STARTING_DIR = '/puzzle-1/';
    const startingDirectory = new Path('/puzzle-1');

    const map = new Map();
    map.set('/puzzle-1', createPropertiesAndFileSystemNodes([
      new SymbolicLinkToDirectory('dir1', startingDirectory),
      new Directory('dir2'),
      new SymbolicLinkToDirectory('dir3', startingDirectory),
      new SymbolicLinkToDirectory('dir4', startingDirectory),
    ]));
    map.set(STARTING_DIR + 'dir2', createPropertiesAndFileSystemNodes([
      new SymbolicLinkToDirectory('dir1', startingDirectory),
      new SymbolicLinkToDirectory('dir2', startingDirectory),
      new SymbolicLinkToDirectory('dir3', startingDirectory),
      new Directory('dir4'),
    ]));
    map.set(STARTING_DIR + 'dir2/dir4', createPropertiesAndFileSystemNodes([
      new SymbolicLinkToDirectory('dir1', startingDirectory),
      new SymbolicLinkToDirectory('dir2', startingDirectory),
      new SymbolicLinkToDirectory('dir3', startingDirectory),
      new Directory('dir4'),
    ]));
    map.set(STARTING_DIR + 'dir2/dir4/dir4', createPropertiesAndFileSystemNodes([
      new Directory('dir1'),
      new SymbolicLinkToDirectory('dir1', startingDirectory),
      new SymbolicLinkToDirectory('dir3', startingDirectory),
      new SymbolicLinkToDirectory('dir4', startingDirectory),
    ]));
    map.set(STARTING_DIR + 'dir2/dir4/dir4/dir1', createPropertiesAndFileSystemNodes([
      new File('You_found_the_exit.txt')
    ]));

    return map;
  }
}
