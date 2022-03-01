import {AbsolutePath, Path} from './paths';
import {InMemoryFileSystemFacade} from './in-memory-file-system-facade';

/**
 * Responsible for keeping track of the current directory. This class is also used to resolve paths to an absolute path relative to the
 * current directory.
 */
export class CurrentDirectoryManager {
  private readonly inMemoryFileSystemFacade: InMemoryFileSystemFacade;

  constructor(inMemoryFileSystemFacade: InMemoryFileSystemFacade) {
    this.inMemoryFileSystemFacade = inMemoryFileSystemFacade;
  }

  public currentDirectory(): AbsolutePath {
    return undefined;
  }

  public changeCurrentDirectory(path: string | Path): boolean {
    return false;
  }

  public determineAbsolutePathFromPath(path: string | Path): AbsolutePath {
    return undefined;
  }
}
