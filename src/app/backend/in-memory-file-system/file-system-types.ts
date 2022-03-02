import {AbsolutePath} from './paths';
import {ParsedArgs} from '../util/command-line-argument-parser';
import {CommandResponse} from '../types/command-types';

export enum FileSystemNodeTypes {
  FILE, DIRECTORY, SYMLINK_TO_DIR, PROGRAM
}

export interface FileSystemNode {
  name(): string;
  type(): FileSystemNodeTypes;
}

export class InMemoryFile implements FileSystemNode {
  private readonly _name: string;
  private readonly _content: string;

  constructor(name: string, assetUrl: string) {
    this._name = name;
    this._content = assetUrl;
  }

  name(): string {
    return this._name;
  }

  type(): FileSystemNodeTypes {
    return FileSystemNodeTypes.FILE;
  }

  assetUrl(): string {
    return this._content;
  }
}

export class DirectoryProperties {
  private readonly _color: string;
  private readonly _isInvisible: boolean;

  constructor(color: string, isInvisible: boolean) {
    this._color = color;
    this._isInvisible = isInvisible;
  }

  /** All possible colors can be found in app.component.css (.dynamic-bg-<color>). */
  color(): string {
    return this._color;
  }

  isInvisible(): boolean {
    return this._isInvisible;
  }
}

export class Directory implements FileSystemNode {
  private readonly _name: string;
  private readonly nodes: Set<FileSystemNode>;
  private readonly directoryProperties: DirectoryProperties;

  constructor(name: string, nodes: Set<FileSystemNode>, directoryProperties: DirectoryProperties) {
    this._name = name;
    this.nodes = nodes;
    this.directoryProperties = directoryProperties;
  }

  name(): string {
    return this._name;
  }

  type(): FileSystemNodeTypes {
    return FileSystemNodeTypes.DIRECTORY;
  }

  properties(): DirectoryProperties {
    return this.directoryProperties;
  }

  nodesInsideDirectory(): Set<FileSystemNode> {
    return this.nodes;
  }
}

export class SymbolicLinkToDirectory implements FileSystemNode {
  private readonly _name: string;
  private readonly _pointsTo: AbsolutePath;

  constructor(name: string, pointsTo: AbsolutePath) {
    this._name = name;
    this._pointsTo = pointsTo;
  }

  name(): string {
    return this._name;
  }

  type(): FileSystemNodeTypes {
    return FileSystemNodeTypes.SYMLINK_TO_DIR;
  }

  /** Returns the path of the directory that the symbolic link points to. */
  pointsTo(): AbsolutePath {
    return this._pointsTo;
  }
}

export class ProgramFile implements FileSystemNode {
  private readonly _name: string;
  private readonly _program: Program;

  constructor(name: string, program: Program) {
    this._name = name;
    this._program = program;
  }

  name(): string {
    return this._name;
  }

  type(): FileSystemNodeTypes {
    return FileSystemNodeTypes.PROGRAM;
  }

  program(): Program {
    return this._program;
  }
}

export interface Program {
  execute(parsedArgs: ParsedArgs): CommandResponse;
}
