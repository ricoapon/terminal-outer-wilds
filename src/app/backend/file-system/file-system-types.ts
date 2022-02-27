import {Path} from './path';
import {CommandResponse} from '../types/command-types';

export interface FileSystemNode {
  name(): string;
  isDirectory(): boolean;
}

export class InMemoryFile implements FileSystemNode {
  private readonly _name: string;
  private readonly _content: string;

  constructor(name: string, content: string) {
    this._name = name;
    this._content = content;
  }

  name(): string {
    return this._name;
  }

  assetPath(): string {
    return this._content;
  }

  isDirectory(): boolean {
    return false;
  }
}

export class Directory implements FileSystemNode {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  name(): string {
    return this._name;
  }

  isDirectory(): boolean {
    return true;
  }
}

export class SymbolicLinkToDirectory implements FileSystemNode {
  private readonly _name: string;
  private readonly _pointsTo: Path;

  constructor(name: string, pointsTo: Path) {
    this._name = name;
    this._pointsTo = pointsTo;
  }

  name(): string {
    return this._name;
  }

  isDirectory(): boolean {
    return true;
  }

  /** Returns the absolute path of the directory that the symbolic link points to. */
  pointsTo(): Path {
    return this._pointsTo;
  }
}

export class DirectoryProperties {
  private readonly _color: string;

  constructor(color?: string) {
    this._color = color;
  }

  /** All possible colors can be found in app.component.css (.dynamic-bg-<color>). */
  color(): string {
    return this._color;
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

  isDirectory(): boolean {
    return false;
  }

  program(): Program {
    return this._program;
  }
}

export interface Program {
  execute(command: string): CommandResponse;
}
