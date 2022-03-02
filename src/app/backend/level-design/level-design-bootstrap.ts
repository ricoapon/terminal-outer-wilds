import {Inject, Injectable} from '@angular/core';
import {AbsolutePath, Path} from '../in-memory-file-system/paths';
import {LEVEL_DESIGNERS} from './level-designers.module';
import {Directory} from '../in-memory-file-system/file-system-types';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';
import {LevelDesigner} from './level-designer';


@Injectable()
export class LevelDesignBootstrap {

  constructor(@Inject(LEVEL_DESIGNERS) private levelDesigners: LevelDesigner[]) {
  }

  private static createAbsolutePath(path: string): AbsolutePath {
    return AbsolutePath.root().resolve(new Path(path));
  }

  public design(fileSystem: InMemoryFileSystemFacade): void {
    for (const levelDesigner of this.levelDesigners) {
      const startingPath = LevelDesignBootstrap.createAbsolutePath(levelDesigner.directoryNameInsideRoot());
      fileSystem.createNode(startingPath, new Directory(levelDesigner.directoryNameInsideRoot()));
      levelDesigner.design(startingPath, fileSystem);
    }
  }
}
