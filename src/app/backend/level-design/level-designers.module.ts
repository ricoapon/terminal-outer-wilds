import {InjectionToken, NgModule} from '@angular/core';
import {LevelDesigner} from './level-design-bootstrap';
import {Tutorial} from './tutorial/tutorial';

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
