import {PropertiesAndFileSystemNodes} from '../in-memory-file-system';
import {Directory, File, SymbolicLinkToDirectory} from '../file-system-types';
import {Path} from '../path';
import {createPropertiesAndFileSystemNodes, FileSystemInitializer} from './file-system-initializer';

export class DummyFiles implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const map = new Map();
    map.set('/', createPropertiesAndFileSystemNodes([
      new Directory('dir1'), new Directory('dir2'), new File('file1.txt'), new File('file2.txt')
    ]));
    map.set('/dir2', createPropertiesAndFileSystemNodes([]));
    map.set('/dir1', createPropertiesAndFileSystemNodes([
      new File('file1.txt'), new File('file2.txt'),
      new Directory('subdir1'), new Directory('subdir2')
    ]));
    map.set('/dir1/subdir2', createPropertiesAndFileSystemNodes([]));
    map.set('/dir1/subdir1', createPropertiesAndFileSystemNodes([
      new File('file3.txt'), new File('file4.txt'),
      new Directory('subdir3'), new SymbolicLinkToDirectory('subdir4', new Path('/dir1'))
    ]));
    map.set('/dir1/subdir1/subdir3', createPropertiesAndFileSystemNodes([
      new File('file5.txt'), new File('file6.txt'),
      new Directory('subdir5'), new SymbolicLinkToDirectory('subdir6', new Path('/dir1'))
    ]));
    map.set('/dir1/subdir1/subdir3/subdir5', createPropertiesAndFileSystemNodes([]));

    return map;
  }
}
