import {InMemoryFileSystem, PropertiesAndFileSystemNodes} from './in-memory-file-system';
import {Directory, DirectoryProperties, InMemoryFile, FileSystemNode, SymbolicLinkToDirectory} from './file-system-types';
import {Path} from './path';
import {FileSystemInitializer} from './initializers/file-system-initializer';

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
      new InMemoryFile('file1.txt', 'Content1'), new InMemoryFile('file2.txt', 'Content2'),
      new Directory('subdir1'), new Directory('subdir2')
    ]));
    map.set('/dir1/subdir1', FileSystemInitializerForTest.createPropertiesAndFileSystemNodes([
      new InMemoryFile('file3.txt', 'Content3'), new InMemoryFile('file4.txt', 'Content4'),
      new Directory('subdir3'), new SymbolicLinkToDirectory('subdir4', new Path('/dir1'))
    ]));
    map.set('/dir1/subdir1/subdir3', FileSystemInitializerForTest.createPropertiesAndFileSystemNodes([
      new InMemoryFile('file5.txt', 'Content5'), new InMemoryFile('file6.txt', 'Content6'),
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

  function changeDirectory(path: string): void {
    expect(fileSystem.changeDirectory(path)).toEqual(true);
  }

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
    changeDirectory('dir1');
    changeDirectory('subdir1');
    changeDirectory('subdir3');
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/dir1/subdir1/subdir3');
  });

  it('change directories works for absolute paths with symbolic links', () => {
    changeDirectory('/dir1/subdir1/subdir4/subdir1/subdir4');
    expect(fileSystem.getCurrentPath()).toEqual('/dir1/subdir1/subdir4/subdir1/subdir4');
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/dir1');
  });

  it('change directories works for relative paths with symbolic links', () => {
    // When and then
    changeDirectory('dir1');
    changeDirectory('subdir1');
    changeDirectory('subdir4/subdir1/subdir4');
    expect(fileSystem.getCurrentPath()).toEqual('/dir1/subdir1/subdir4/subdir1/subdir4');
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/dir1');
  });

  it('currentDirectoryName() returns the name of the symbolic link directory', () => {
    changeDirectory('dir1/subdir1/subdir4');
    expect(fileSystem.currentDirectoryName()).toEqual('subdir4');
  });

  it('we can use \'..\' in the path when changing directories', () => {
    changeDirectory('dir1/subdir1');
    changeDirectory('..');
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/dir1');
    changeDirectory('/dir1/subdir1/../subdir1/..');
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/dir1');
    changeDirectory('/');
    changeDirectory('..');
    expect(fileSystem.getCurrentAbsolutePath()).toEqual('/');
  });

  it('we can read files', () => {
    expect((fileSystem.getNode('/dir1/file1.txt') as InMemoryFile).assetPath()).toEqual('Content1');
    changeDirectory('dir1');
    expect((fileSystem.getNode('file1.txt') as InMemoryFile).assetPath()).toEqual('Content1');
    expect((fileSystem.getNode('subdir1/subdir3/file6.txt') as InMemoryFile).assetPath()).toEqual('Content6');
  });
});
