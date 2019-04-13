import * as ex from 'excalibur';
import LevelDisplay from '../../actors/bars/level';
import ProgressionManager from '../../engine/progression/progressionManager';
import SizingManager from '../../engine/sizingManager';
import { GameWindowBase } from './gameWindowBase';

export class StoryGameWindow extends GameWindowBase {

  private levelDisplay: LevelDisplay;

  public onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);
    const mm: SizingManager = SizingManager.get();
    this.levelDisplay = new LevelDisplay(engine.drawWidth / 2, mm.getMenuHeight() - mm.getUIItemSize() / 2, mm.getUIItemSize(), ProgressionManager.get().getLevelString());
    this.add(this.levelDisplay);

  }

  public onActivate() {
    super.onActivate();
    this.levelDisplay.updateLevel(ProgressionManager.get().getLevelString());
  }
} 
