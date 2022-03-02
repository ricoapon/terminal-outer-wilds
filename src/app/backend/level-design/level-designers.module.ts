import {InjectionToken, NgModule} from '@angular/core';
import {Tutorial} from './tutorial/tutorial';
import {LevelDesigner} from './level-designer';
import {KingdomFarFarAway} from './kingdom-far-far-away/kingdom-far-far-away';
import {TerminalTown} from './terminal-town/terminal-town';

export const LEVEL_DESIGNERS = new InjectionToken<LevelDesigner>('LevelDesigner');

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {provide: LEVEL_DESIGNERS, useClass: Tutorial, multi: true},
    {provide: LEVEL_DESIGNERS, useClass: KingdomFarFarAway, multi: true},
    {provide: LEVEL_DESIGNERS, useClass: TerminalTown, multi: true},
  ],
  bootstrap: []
})
export class LevelDesignersModule {
}
