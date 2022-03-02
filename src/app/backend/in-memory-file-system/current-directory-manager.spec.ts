import {CurrentDirectoryManager} from './current-directory-manager';

describe('CurrentDirectoryManager', () => {
  it('changeCurrentDirectory() works', () => {
    const manager = new CurrentDirectoryManager(() => true);
    expect(manager.changeCurrentDirectory('a/b/c')).toEqual(true);
    expect(manager.currentDirectory().toString()).toEqual('/a/b/c');
  });

  it('changeCurrentDirectory() fails if path does not exist', () => {
    const manager = new CurrentDirectoryManager(() => false);
    expect(manager.changeCurrentDirectory('a/b/c')).toEqual(false);
  });

  it('determineAbsolutePathFromPath() works', () => {
    const manager = new CurrentDirectoryManager(() => true);
    expect(manager.determineAbsolutePathFromPath('a/b/c').toString()).toEqual('/a/b/c');
    expect(manager.determineAbsolutePathFromPath('/a/b/c').toString()).toEqual('/a/b/c');
  });
});
