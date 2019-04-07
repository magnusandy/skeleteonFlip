import * as ex from 'excalibur';
import { Resources } from '../resources';
import { Scenes } from './scenes';
import SoundManager from '../engine/soundManager';
import { Engine, Actor } from 'excalibur';
import ProgressionManager from '../engine/progression/progressionManager';
import { calcDimensionsSingleObject } from '../engine/helpers';
import BackgroundManager from '../engine/backgroundManager';

export class GameOver extends ex.Scene {

  private engine: Engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    const gameOverActor = new ex.Actor();
    const spritesheet = new ex.SpriteSheet(Resources.gameOver, 3, 1 ,360, 360);
    const playerIdleAnimation = spritesheet.getAnimationForAll(this.engine, 125);
    gameOverActor.addDrawing("idle", playerIdleAnimation);
    const dims = calcDimensionsSingleObject(this.engine.drawHeight, this.engine.drawWidth, 360, 360, 0.8, 1.5);
    this.add(gameOverActor);
    gameOverActor.x = this.engine.drawWidth/2;
    gameOverActor.y = this.engine.drawHeight/2;
    gameOverActor.setHeight(engine.drawHeight);
    gameOverActor.setWidth(engine.drawWidth);
    gameOverActor.scale = dims.scale;
    gameOverActor.on('pointerup', () => {
      ProgressionManager.get().resetProgress();
      this.engine.goToScene(Scenes.MAIN_MENU);
    });
    this.add(new BackgroundManager(engine).getTileMap())

  }

  public onActivate() {
    SoundManager.get().playSoundInterrupt(Resources.laughSound); 
  }

  public onDeactivate() { 
    Resources.laughSound.stop();
  }
} 
