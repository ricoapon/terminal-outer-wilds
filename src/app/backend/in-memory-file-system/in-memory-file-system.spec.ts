import {InMemoryFileSystem} from './in-memory-file-system';
import {AbsolutePath} from './paths';
import {Directory, InMemoryFile} from './file-system-types';

describe('InMemoryFileSystem', () => {
  function createAbsolutePath(path: string): AbsolutePath {
    return AbsolutePath.root().resolve(path);
  }
  it('happy flow', () => {
    const fileSystem = new InMemoryFileSystem();
    expect(fileSystem.createNode(AbsolutePath.root(), new Directory('dir1'))).toEqual(true);
    expect(fileSystem.createNode(createAbsolutePath('dir1'), new Directory('dir2'))).toEqual(true);
    expect(fileSystem.createNode(AbsolutePath.root(), new InMemoryFile('file1.txt', 'Asset1'))).toEqual(true);

    const dir1 = fileSystem.getNode(createAbsolutePath('dir1')) as Directory;
    const dir2 = fileSystem.getNode(createAbsolutePath('dir1/dir2')) as Directory;
    const file1 = fileSystem.getNode(createAbsolutePath('file1.txt')) as InMemoryFile;
    expect(dir1.name()).toEqual('dir1');
    expect(dir1.nodesInsideDirectory().size).toEqual(1);
    expect(dir2.name()).toEqual('dir2');
    expect(dir2.nodesInsideDirectory().size).toEqual(0);
    expect(file1.name()).toEqual('file1.txt');
  });
});
