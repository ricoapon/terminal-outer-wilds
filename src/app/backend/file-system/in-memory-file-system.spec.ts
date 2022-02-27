import {FileSystemInitializer, InMemoryFileSystem, PropertiesAndFileSystemNodes} from './in-memory-file-system';
import {Directory, DirectoryProperties, File, FileSystemNode, SymbolicLinkToDirectory} from './file-system-types';
import {Path} from './path';

class FileSystemInitializerForTest implements FileSystemInitializer {
  private static createPropertiesAndFileSystemNodes(values: FileSystemNode[]): PropertiesAndFileSystemNodes {
    return new PropertiesAndFileSystemNodes(new DirectoryProperties(), new Set<FileSystemNode>(values));
  }

  load(): Map<string, PropertiesAndFileSystemNodes> {
    const map = new Map();
    map.set('/', FileSystemInitializerForTest.createPropertiesAndFileSystemNodes([
      new Directory('dir1')
    ]));
    map.set('/dir1', FileSystemInitializerForTest.createPropertiesAndFileSystemNodes([
      new File('file1.txt'), new File('file2.txt'),
      new Directory('subdir1'), new Directory('subdir2')
    ]));
    map.set('/dir1/subdir1', FileSystemInitializerForTest.createPropertiesAndFileSystemNodes([
      new File('file3.txt'), new File('file4.txt'),
      new Directory('subdir3'), new SymbolicLinkToDirectory('subdir4', new Path('/dir1'))
    ]));
    map.set('/dir1/subdir1/subdir3', FileSystemInitializerForTest.createPropertiesAndFileSystemNodes([
      new File('file5.txt'), new File('file6.txt'),
      new Directory('subdir5'), new SymbolicLinkToDirectory('subdir6', new Path('/dir1'))
    ]));

    return map;
  }
}

describe('InMemoryFileSystem', () => {
  let fileSystem: InMemoryFileSystem;
  beforeEach(() => {
    fileSystem = new InMemoryFileSystem([new FileSystemInitializerForTest()]);
  });

  it('change directories works for absolute paths without symbolic links', () => {
    // When
    const result = fileSystem.changeDirectory('/dir1/subdir1/subdir3');
    // Then
    expect(result).toEqual(true);
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/dir1/subdir1/subdir3');
  });

  it('changing to non-existing path fails an does not change current path', () => {
    // When
    const result = fileSystem.changeDirectory('non-existing-path');
    // Then
    expect(result).toEqual(false);
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/');
  });

  it('change directories works for relative paths without symbolic links', () => {
    // When and then
    expect(fileSystem.changeDirectory('dir1')).toEqual(true);
    expect(fileSystem.changeDirectory('subdir1')).toEqual(true);
    expect(fileSystem.changeDirectory('subdir3')).toEqual(true);
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/dir1/subdir1/subdir3');
  });

  it('change directories works for absolute paths with symbolic links', () => {
    expect(fileSystem.changeDirectory('/dir1/subdir1/subdir4/subdir1/subdir4')).toEqual(true);
    expect(fileSystem.getCurrentPath()).toEqual('/dir1/subdir1/subdir4/subdir1/subdir4');
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/dir1');
  });

  it('change directories works for relative paths with symbolic links', () => {
    // When and then
    expect(fileSystem.changeDirectory('dir1')).toEqual(true);
    expect(fileSystem.changeDirectory('subdir1')).toEqual(true);
    expect(fileSystem.changeDirectory('subdir4/subdir1/subdir4')).toEqual(true);
    expect(fileSystem.getCurrentPath()).toEqual('/dir1/subdir1/subdir4/subdir1/subdir4');
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/dir1');
  });

  it('currentDirectoryName() returns the name of the symbolic link directory', () => {
    fileSystem.changeDirectory('dir1/subdir1/subdir4');
    expect(fileSystem.currentDirectoryName()).toEqual('subdir4');
  });

});
