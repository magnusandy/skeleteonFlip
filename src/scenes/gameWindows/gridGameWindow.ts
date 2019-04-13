import { GameWindowBase } from './gameWindowBase';
import ProgressionManager from '../../engine/progression/progressionManager';

export class GridGameWindow extends GameWindowBase {

  private currentOptionGridSize: number;
  public onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);
    this.currentOptionGridSize = ProgressionManager.get().getOptionGridSize()
  }

  //Override
  public onActivate(): void {
    if(this.currentOptionGridSize != ProgressionManager.get().getOptionGridSize()) {
      this.coordinator.resetGame();
    }
    super.onActivate();
  }
} 
