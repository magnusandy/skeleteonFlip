import * as ex from 'excalibur';
import { Resources } from '../resources';
import { Scenes, getGameWindow } from './scenes';
import SoundManager from '../engine/soundManager';
import ProgressionManager from '../engine/progression/progressionManager';
import {calcDimensionsSingleObjectTexture, safePointerUp } from '../engine/helpers';
import BackgroundManager from '../engine/backgroundManager';

export class Victory extends ex.Scene {

  private engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    this.add(new BackgroundManager(engine).getTileMap())

    const victoryActor = new ex.Actor();
    victoryActor.addDrawing(Resources.victory.asSprite());
    victoryActor.x = this.engine.drawWidth / 2;
    victoryActor.y = this.engine.drawHeight / 2;
    const dims = calcDimensionsSingleObjectTexture(this.engine.drawHeight, this.engine.drawWidth, Resources.victory, 0.8, 1.5)
    victoryActor.setHeight(engine.drawHeight);// set height/width so you can tap anywhere on the screen
    victoryActor.setWidth(engine.drawWidth);
    victoryActor.scale = dims.scale;
    victoryActor.on('pointerup', safePointerUp(() => {
      this.engine.goToScene(getGameWindow());
    }));
    this.add(victoryActor);
  }
  public onActivate() {
    SoundManager.get().playSoundInterrupt(Resources.victorySound);
  }
  public onDeactivate() {
  }
} 
