import {Path} from './path';

describe('Path', () => {
  it('removes trailing slashes', () => {
    expect(new Path('/path////').toString()).toEqual('/path');
  });

  it('resolves() works', () => {
    expect(new Path('/').resolve('sub/path').toString()).toEqual('/sub/path');
    expect(new Path('/path/something').resolve('sub/path').toString()).toEqual('/path/something/sub/path');
  });

  it('resolves() throws error if other is not relative', () => {
    expect(() =>  new Path('/path').resolve('/absolute')).toThrowError();
  });

  it('isAbsolute() works', () => {
    expect(new Path('/absolute').isAbsolute()).toEqual(true);
    expect(new Path('relative').isAbsolute()).toEqual(false);
  });

  it('name() works', () => {
    expect(new Path('/').name()).toEqual('/');
    expect(new Path('/some/path/somewhere').name()).toEqual('somewhere');
  });

  it('directoriesToTraverse() works', () => {
    expect(new Path('/absolute/path/somewhere').directoriesToTraverse()).toEqual(['absolute', 'path', 'somewhere']);
    expect(new Path('relative/path/somewhere').directoriesToTraverse()).toEqual(['relative', 'path', 'somewhere']);
  });

  it('getDirectoryAboveThisDirectory() works', () => {
    expect(new Path('/absolute/path/somewhere').getDirectoryAboveThisDirectory().toString()).toEqual('/absolute/path');
    expect(new Path('/').getDirectoryAboveThisDirectory().toString()).toEqual('/');
    expect(new Path('/directory').getDirectoryAboveThisDirectory().toString()).toEqual('/');
    expect(new Path('relative/path/somewhere').getDirectoryAboveThisDirectory().toString()).toEqual('relative/path');
    expect(() => new Path('relative').getDirectoryAboveThisDirectory().toString()).toThrowError();
  });
});
