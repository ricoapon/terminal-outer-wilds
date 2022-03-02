import {InjectionToken, NgModule} from '@angular/core';
import {Tutorial} from './tutorial/tutorial';
import {LevelDesigner} from './level-designer';

export const LEVEL_DESIGNERS = new InjectionToken<LevelDesigner>('LevelDesigner');

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {provide: LEVEL_DESIGNERS, useClass: Tutorial, multi: true},
  ],
  bootstrap: []
})
export class LevelDesignersModule {
}
