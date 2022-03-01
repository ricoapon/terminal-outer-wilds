import {AbsolutePath, Path} from './paths';
import {InMemoryFileSystemFacade} from './in-memory-file-system-facade';

/**
 * Responsible for keeping track of the current directory. This class is also used to resolve paths to an absolute path relative to the
 * current directory.
 */
export class CurrentDirectoryManager {
  private currentPath: AbsolutePath = AbsolutePath.root();

  private readonly inMemoryFileSystemFacade: InMemoryFileSystemFacade;

  constructor(inMemoryFileSystemFacade: InMemoryFileSystemFacade) {
    this.inMemoryFileSystemFacade = inMemoryFileSystemFacade;
  }

  public currentDirectory(): AbsolutePath {
    return this.currentPath;
  }

  public changeCurrentDirectory(path: string | Path): boolean {
    if (!(path instanceof Path)) {
      path = new Path(path);
    }

    const newPath = this.currentPath.resolve(path);
    if (this.inMemoryFileSystemFacade.getNode(path) === undefined) {
      return false;
    }

    this.currentPath = newPath;
    return true;
  }

  public determineAbsolutePathFromPath(path: string | Path): AbsolutePath {
    if (!(path instanceof Path)) {
      path = new Path(path);
    }

    return this.currentPath.resolve(path);
  }
}
