import {AbsolutePath, Path} from './paths';

describe('Path', () => {
  it('removes trailing slashes', () => {
    expect(new Path('/path////').toString()).toEqual('/path');
  });

  it('listOfDirectories() works', () => {
    expect(new Path('/absolute/path/somewhere').listOfDirectories()).toEqual(['absolute', 'path', 'somewhere']);
    expect(new Path('relative/path/somewhere').listOfDirectories()).toEqual(['relative', 'path', 'somewhere']);
  });
});

describe('AbsolutePath', () => {
  function resolvePath(path: string): AbsolutePath {
    return AbsolutePath.root().resolve(path);
  }

  it('name() works', () => {
    expect(AbsolutePath.root().name()).toEqual('/');
    expect(resolvePath('some/path/somewhere').name()).toEqual('somewhere');
  });

  it('resolve() ignores current directory (.) inside paths', () => {
    expect(resolvePath('./some/directory/./here').toString()).toEqual('/some/directory/here');
  });

  it('resolve() recognizes .. as parent directory', () => {
    expect(resolvePath('some/directory/..').toString()).toEqual('/some');
  });

  it('resolve() ignores .. whenever called on the root directory', () => {
    expect(resolvePath('../some/directory/').toString()).toEqual('/some/directory');
  });
});
