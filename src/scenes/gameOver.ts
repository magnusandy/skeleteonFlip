import * as ex from 'excalibur';
import { Resources } from '../resources';
import { Scenes } from './scenes';
import SoundManager from '../engine/soundManager';
import { Engine } from 'excalibur';

export class GameOver extends ex.Scene {

  private engine: Engine;


  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
  }

  public onActivate() {
    SoundManager.get().playSoundInterrupt(Resources.laughSound);
    const gameOverActor = new ex.Actor();
    const spritesheet = new ex.SpriteSheet(Resources.gameOver, 3,1,360, 360);
    const playerIdleAnimation = spritesheet.getAnimationForAll(this.engine, 125);
    gameOverActor.addDrawing("idle", playerIdleAnimation);
    this.add(gameOverActor);
    gameOverActor.x = this.engine.drawWidth/2;
    gameOverActor.y = this.engine.drawHeight/2;
    gameOverActor.setHeight(360);
    gameOverActor.setWidth(360);
    gameOverActor.on('pointerup', () => this.engine.goToScene(Scenes.MAIN_MENU));
  }

  public onDeactivate() { 
    Resources.laughSound.stop();
  }
} 
