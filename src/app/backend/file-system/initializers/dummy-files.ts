import {FileSystemInitializer, PropertiesAndFileSystemNodes} from '../in-memory-file-system';
import {Directory, DirectoryProperties, File, FileSystemNode, SymbolicLinkToDirectory} from '../file-system-types';
import {Path} from '../path';

export class DummyFiles implements FileSystemInitializer {
  private static createPropertiesAndFileSystemNodes(values: FileSystemNode[]): PropertiesAndFileSystemNodes {
    return new PropertiesAndFileSystemNodes(new DirectoryProperties(), new Set<FileSystemNode>(values));
  }
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const map = new Map();
    map.set('/', DummyFiles.createPropertiesAndFileSystemNodes([
      new Directory('dir1'), new Directory('dir2'), new File('file1.txt'), new File('file2.txt')
    ]));
    map.set('/dir1', DummyFiles.createPropertiesAndFileSystemNodes([
      new File('file1.txt'), new File('file2.txt'),
      new Directory('subdir1'), new Directory('subdir2')
    ]));
    map.set('/dir1/subdir1', DummyFiles.createPropertiesAndFileSystemNodes([
      new File('file3.txt'), new File('file4.txt'),
      new Directory('subdir3'), new SymbolicLinkToDirectory('subdir4', new Path('/dir1'))
    ]));
    map.set('/dir1/subdir1/subdir3', DummyFiles.createPropertiesAndFileSystemNodes([
      new File('file5.txt'), new File('file6.txt'),
      new Directory('subdir5'), new SymbolicLinkToDirectory('subdir6', new Path('/dir1'))
    ]));

    return map;
  }
}
