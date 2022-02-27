/** Immutable class representing a path in the file system. */
export class Path {
  private readonly pathAsString: string;

  constructor(pathAsString: string) {
    while (pathAsString.endsWith('/') && pathAsString !== '/') {
      pathAsString = pathAsString.substr(0, pathAsString.length - 1);
    }
    this.pathAsString = pathAsString;
  }

  public resolve(relativePath: Path | string): Path {
    if (!(relativePath instanceof Path)) {
      relativePath = new Path(relativePath);
    }
    if (relativePath.isAbsolute()) {
      throw new Error('Cannot resolve with an absolute path');
    }
    // The only case in which the pathAsString ends with a slash is when it is the root directory. We need to handle this one differently.
    if (this.pathAsString === '/') {
      return new Path('/' + relativePath.pathAsString);
    }
    return new Path(this.pathAsString + '/' + relativePath.pathAsString);
  }

  /** Returns a list of all the directories in order of the path. The root ('/') is not added. */
  public directoriesToTraverse(): string[] {
    return this.isAbsolute() ? this.pathAsString.substr(1).split('/') : this.pathAsString.split('/');
  }

  public name(): string {
    if (this.pathAsString === '/') {
      return '/';
    }
    return this.pathAsString.substr(this.pathAsString.lastIndexOf('/') + 1);
  }

  public isAbsolute(): boolean {
    return this.pathAsString.startsWith('/');
  }

  public toString(): string {
    return this.pathAsString;
  }
}
