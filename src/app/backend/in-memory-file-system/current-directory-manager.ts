import {AbsolutePath, Path} from './paths';

/**
 * Responsible for keeping track of the current directory. This class is also used to resolve paths to an absolute path relative to the
 * current directory.
 */
export class CurrentDirectoryManager {
  private currentPath: AbsolutePath = AbsolutePath.root();

  private readonly checkIfPathExists: (path: Path) => boolean;

  constructor(checkIfPathExists: (path: AbsolutePath) => boolean) {
    this.checkIfPathExists = checkIfPathExists;
  }

  public currentDirectory(): AbsolutePath {
    return this.currentPath;
  }

  public changeCurrentDirectory(path: string | Path): boolean {
    const newPath = this.determineAbsolutePathFromPath(path);
    if (!this.checkIfPathExists(newPath)) {
      return false;
    }

    this.currentPath = newPath;
    return true;
  }

  public determineAbsolutePathFromPath(path: string | Path): AbsolutePath {
    if (!(path instanceof Path)) {
      path = new Path(path);
    }

    // Absolute paths don't need to be resolved.
    if (path.toString().startsWith('/')) {
      return AbsolutePath.root().resolve(new Path(path.toString().substr(1)));
    }

    return this.currentPath.resolve(path);
  }
}
