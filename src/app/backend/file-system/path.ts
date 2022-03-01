/** Immutable class representing a path in the file system. */
export class Path {
  private readonly pathAsString: string;

  constructor(pathAsString: string) {
    pathAsString = this.removeDoubleDot(pathAsString);

    while (pathAsString.endsWith('/') && pathAsString !== '/') {
      pathAsString = pathAsString.substr(0, pathAsString.length - 1);
    }
    this.pathAsString = pathAsString;
  }

  // noinspection JSMethodCanBeStatic
  private removeDoubleDot(path: string): string {
    const isAbsolute = path.startsWith('/');
    // First we remove all /dir/.. and dir/../ parts of the string.
    const regex1 = new RegExp('\/\\w+\/\\.\\.');
    const regex2 = new RegExp('\\w+\/\\.\\.\/');
    while (path.match(regex1) || path.match(regex2)) {
      path = path.replace(regex1, '');
      path = path.replace(regex2, '');
    }

    // Any leftovers are now word/.. or starting with /.., so remove these as well.
    const regex3 = new RegExp('\\w+\/\\.\\.');
    const regex4 = new RegExp('^\/\\.\\.');
    while (path.match(regex3) || path.match(regex4)) {
      path = path.replace(regex3, '');
      path = path.replace(regex4, '');
    }

    if (isAbsolute && path.length === 0) {
      return '/';
    }

    return path;
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

  /** Returns the path to the parent directory. If this is the root directory, it will return the same directory. */
  public getPathToParentDirectory(): Path {
    if (this.pathAsString === '/') {
      return this;
    }

    if (!this.isAbsolute() && this.pathAsString.indexOf('/') < 0) {
      throw new Error('Cannot go up anymore in relative directory ' + this.pathAsString);
    }

    // If the path is something like '/bla', we have to make sure that we return '/' instead of nothing.
    if (this.isAbsolute() && this.pathAsString.indexOf('/', 1) < 0) {
      return new Path('/');
    }

    return new Path(this.pathAsString.substr(0, this.pathAsString.lastIndexOf('/')));
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
