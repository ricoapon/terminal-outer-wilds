import {AbsolutePath} from './paths';
import {Directory, InMemoryFile, ProgramFile, SymbolicLinkToDirectory} from './file-system-types';
import {InMemoryFileSystemFacade} from './in-memory-file-system-facade';

describe('InMemoryFileSystemFacade', () => {
  it('happy flow', () => {
    const fileSystem = new InMemoryFileSystemFacade();
    expect(fileSystem.createNode('/', new Directory('dir1'))).toEqual(true);
    expect(fileSystem.createNode('/dir1', new Directory('dir2'))).toEqual(true);
    expect(fileSystem.createNode('/', new InMemoryFile('file1.txt', 'Asset1'))).toEqual(true);

    const dir1 = fileSystem.getNode('/dir1') as Directory;
    const dir2 = fileSystem.getNode('/dir1/dir2') as Directory;
    const file1 = fileSystem.getNode('/file1.txt') as InMemoryFile;
    expect(dir1.name()).toEqual('dir1');
    expect(dir1.nodesInsideDirectory().size).toEqual(1);
    expect(dir2.name()).toEqual('dir2');
    expect(dir2.nodesInsideDirectory().size).toEqual(0);
    expect(file1.name()).toEqual('file1.txt');
  });

  it('happy flow with symlinks', () => {
    const fileSystem = new InMemoryFileSystemFacade();
    expect(fileSystem.createNode('/', new Directory('dir1'))).toEqual(true);
    expect(fileSystem.createNode('/', new Directory('dir2'))).toEqual(true);
    expect(fileSystem.createNode('/dir1',
      new SymbolicLinkToDirectory('dir3', AbsolutePath.root().resolve('dir2')))).toEqual(true);
    expect(fileSystem.createNode(('/dir2'), new InMemoryFile('file1.txt', 'Asset1')))
      .toEqual(true);

    expect(fileSystem.changeCurrentDirectory('/dir1/dir3')).toEqual(true);
    const dir3content = fileSystem.listCurrentDirectoryNodes();
    expect(dir3content.values().next().value.name()).toEqual('file1.txt');

    const fileThroughSymlink = fileSystem.getNode('/dir1/dir3/file1.txt') as InMemoryFile;
    const file = fileSystem.getNode('/dir2/file1.txt') as InMemoryFile;
    expect(fileThroughSymlink).toEqual(file);
  });

  it('make it possible to determine current path without symlinks', () => {
    const fileSystem = new InMemoryFileSystemFacade();
    expect(fileSystem.createNode('/', new Directory('dir1'))).toEqual(true);
    expect(fileSystem.createNode('/', new Directory('dir2'))).toEqual(true);
    expect(fileSystem.createNode('/dir1',
      new SymbolicLinkToDirectory('dir3', AbsolutePath.root().resolve('dir2')))).toEqual(true);
    expect(fileSystem.createNode('/dir2', new Directory('dir4'))).toEqual(true);

    expect(fileSystem.changeCurrentDirectory('/dir1/dir3')).toEqual(true);
    expect(fileSystem.currentDirectory().toString()).toEqual('/dir1/dir3');
    expect(fileSystem.currentDirectoryWithoutSymbolicLinks().toString()).toEqual('/dir2');

    expect(fileSystem.changeCurrentDirectory('/dir1/dir3/dir4')).toEqual(true);
    expect(fileSystem.currentDirectory().toString()).toEqual('/dir1/dir3/dir4');
    expect(fileSystem.currentDirectoryWithoutSymbolicLinks().toString()).toEqual('/dir2/dir4');
  });

  it('move() works', () => {
    const fileSystem = new InMemoryFileSystemFacade();
    expect(fileSystem.createNode('/', new Directory('dir1'))).toEqual(true);
    expect(fileSystem.createNode('/', new Directory('dir2'))).toEqual(true);
    expect(fileSystem.createNode(('/dir2'), new InMemoryFile('file1.txt', 'Asset1')));
    expect(fileSystem.createNode(('/dir2'), new ProgramFile('program1', undefined)));

    expect(fileSystem.moveFile('/dir2/file1.txt', '/dir1'));
    expect(fileSystem.moveFile('/dir2/program1', '/dir1'));
    expect(fileSystem.getNode('/dir1/file1.txt').name()).toEqual('file1.txt');
    expect(fileSystem.getNode('/dir2/file1.txt')).toEqual(undefined);
    expect(fileSystem.getNode('/dir1/program1').name()).toEqual('program1');
    expect(fileSystem.getNode('/dir2/program1')).toEqual(undefined);
  });

  it('findPathOfNode() works', () => {
    const fileSystem = new InMemoryFileSystemFacade();
    const file1 = new InMemoryFile('file1.txt', 'Asset1');
    expect(fileSystem.createNode('/', new Directory('dir1'))).toEqual(true);
    expect(fileSystem.createNode('/dir1', new Directory('dir2'))).toEqual(true);
    expect(fileSystem.createNode(('/dir1/dir2'), file1));
    expect(fileSystem.findPathOfNode(file1).toString()).toEqual('/dir1/dir2/file1.txt');
  });
});
