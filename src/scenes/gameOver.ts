import * as ex from 'excalibur';
import { GameCoordinatior } from '../coordinator/coordinator';
import { Stream } from 'java8script';
import { Resources } from '../resources';
import { Scenes } from './scenes';
import { Sound } from 'excalibur';

export class GameOver extends ex.Scene {


  public onInitialize(engine: ex.Engine) {
  }
  public onActivate() {
    Resources.laughSound.play();
    const gameOverActor = new ex.Actor();
    const spritesheet = new ex.SpriteSheet(Resources.gameOver, 3,1,360, 360);
    const playerIdleAnimation = spritesheet.getAnimationForAll(this.engine, 125);
    gameOverActor.addDrawing("idle", playerIdleAnimation);
    this.add(gameOverActor);
    gameOverActor.x = this.engine.drawWidth/2;
    gameOverActor.y = this.engine.drawHeight/2;
    gameOverActor.setHeight(360);
    gameOverActor.setWidth(360);
    gameOverActor.on('pointerdown', () => this.engine.goToScene(Scenes.MAIN_MENU));
  }

  public onDeactivate() { 
    Resources.laughSound.stop();
  }
} 
