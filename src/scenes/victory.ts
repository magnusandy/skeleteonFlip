import * as ex from 'excalibur';
import { Resources } from '../resources';
import { Scenes } from './scenes';
import SoundManager from '../engine/soundManager';
import ProgressionManager from '../engine/progressionManager';

export class Victory extends ex.Scene {

  private engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
  }
  public onActivate() {
    SoundManager.get().playSoundInterrupt(Resources.victorySound);
    const victoryActor = new ex.Actor();
    victoryActor.addDrawing(Resources.victory.asSprite());
    victoryActor.x = this.engine.drawWidth / 2;
    victoryActor.y = this.engine.drawHeight / 2;
    victoryActor.setHeight(360);
    victoryActor.setWidth(480);
    victoryActor.on('pointerup', () => {
      ProgressionManager.get().progress();
      this.engine.goToScene(Scenes.GAME_WINDOW);
    });
    this.add(victoryActor);
  }
  public onDeactivate() {
  }
} 
