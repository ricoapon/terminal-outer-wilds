import {InjectionToken, NgModule} from '@angular/core';
import {LevelDesigner} from './level-design-bootstrap';

export const LEVEL_DESIGNERS = new InjectionToken<LevelDesigner>('LevelDesigner');

@NgModule({
  declarations: [],
  imports: [],
  providers: [
  ],
  bootstrap: []
})
export class LevelDesignersModule {
}
