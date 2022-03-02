/** Paths created from the input of the user. This can be anything. */
export class Path {
  protected readonly pathAsString: string;

  constructor(pathAsString: string) {
    while (pathAsString.endsWith('/') && pathAsString !== '/') {
      pathAsString = pathAsString.substr(0, pathAsString.length - 1);
    }
    this.pathAsString = pathAsString;
  }

  /** Returns a list of all the directories in order of the path. The root directory ('/') is not added. */
  public listOfDirectories(): string[] {
    return (this.pathAsString.startsWith('/') ? this.pathAsString.substr(1).split('/') : this.pathAsString.split('/'))
      .filter(s => s.length > 0);
  }

  public toString(): string {
    return this.pathAsString;
  }
}

/** Absolute paths can only be created by resolving a path with an absolute path. The first absolute path is the root directory. */
export class AbsolutePath extends Path {
  public static root(): AbsolutePath {
    return new AbsolutePath('/');
  }

  private constructor(pathAsString: string) {
    super(pathAsString);
  }

  public name(): string {
    if (this.pathAsString === '/') {
      return '/';
    }
    return this.pathAsString.substr(this.pathAsString.lastIndexOf('/') + 1);
  }

  public resolve(path: string | Path): AbsolutePath {
    if (!(path instanceof Path)) {
      path = new Path(path);
    }

    if (path.toString().startsWith('/')) {
      throw new Error('Cannot resolve with an absolute path ' + path);
    }

    // The path can contain '.' as current directory and '..' and parent directory. These cannot be contained in the result, so we need to
    // do some stuff to resolve this. We do this by "walking" through all the directories.
    const directoriesOfThePath = this.listOfDirectories();
    for (const directory of path.listOfDirectories()) {
      if (directory === '.') {
        // We can skip current directories. Do nothing here.
      } else if (directory === '..') {
        // If the array is empty (e.g. we are in the root directory), pop will return undefined. This is fine.
        directoriesOfThePath.pop();
      } else {
        directoriesOfThePath.push(directory);
      }
    }

    // Merge the list of directories into the actual path as string. Root was excluded, so we add this.
    return new AbsolutePath('/' + directoriesOfThePath.join('/'));
  }

}
