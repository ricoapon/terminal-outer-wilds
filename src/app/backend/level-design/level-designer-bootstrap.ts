import {Inject, Injectable} from '@angular/core';
import {AbsolutePath} from '../in-memory-file-system/paths';
import {LEVEL_DESIGNERS} from './level-designers.module';
import {Directory} from '../in-memory-file-system/file-system-types';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';
import {LevelDesigner} from './level-designer';

@Injectable({providedIn: 'root'})
export class LevelDesignBootstrap {

  constructor(@Inject(LEVEL_DESIGNERS) private levelDesigners: LevelDesigner[]) {
  }

  public design(fileSystem: InMemoryFileSystemFacade): void {
    for (const levelDesigner of this.levelDesigners) {
      fileSystem.createNode(AbsolutePath.root(), new Directory(levelDesigner.directoryNameInsideRoot(),
        levelDesigner.directoryPropertiesInsideRoot()));
      levelDesigner.design(AbsolutePath.root().resolve(levelDesigner.directoryNameInsideRoot()), fileSystem);
    }

    // We want to start in the tutorial directory.
    fileSystem.changeCurrentDirectory('tutorial');
  }
}
