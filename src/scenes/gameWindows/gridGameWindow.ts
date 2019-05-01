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
    const newSize = ProgressionManager.get().getOptionGridSize()
    if(this.currentOptionGridSize != newSize) {
      this.currentOptionGridSize = newSize;
      this.coordinator.resetGame(true);
    }
    super.onActivate();
  }
} 
