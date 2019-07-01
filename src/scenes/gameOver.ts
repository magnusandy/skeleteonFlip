import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import SoundManager from '../engine/managers/soundManager';
import { Engine } from 'excalibur';
import ProgressionManager from '../engine/progression/progressionManager';
import { calcDimensionsSingleObject, safePointerUp, calcDimensionsSingleObjectTexture } from '../engine/helpers';
import BackgroundManager from '../engine/managers/backgroundManager';
import ButtonBase from '../actors/bars/buttonBase';
import SizingManager, { IButtonSizing } from '../engine/managers/sizingManager';

export class GameOver extends ex.Scene {

  private engine: Engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    this.add(BackgroundManager.getDefaultTileMap(engine))

    const imageDims = calcDimensionsSingleObject(this.engine.drawHeight, this.engine.drawWidth, 360, 360, 0.8, 1.5);
    const sizing: IButtonSizing = SizingManager.get().getUIButtonSizing();
    const buttonDims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.menuMenu, sizing.padding, sizing.maxScale);
    const offset = buttonDims.height/2 + Config.optionPadding;


    const gameOverActor = new ex.Actor();
    const spritesheet = new ex.SpriteSheet(Resources.gameOver, 3, 1 ,360, 360);
    const playerIdleAnimation = spritesheet.getAnimationForAll(this.engine, 125);
    gameOverActor.addDrawing("idle", playerIdleAnimation);
    this.add(gameOverActor);
    gameOverActor.x = this.engine.drawWidth/2;
    gameOverActor.y = this.engine.drawHeight/2 - offset;
    gameOverActor.setHeight(engine.drawHeight);
    gameOverActor.setWidth(engine.drawWidth);
    gameOverActor.scale = imageDims.scale;

    const menuButton = new ButtonBase(
      Resources.menuMenu, 
      this.onMenu,
    );
    menuButton.scale = buttonDims.scale;
    menuButton.setHeight(buttonDims.height);
    menuButton.setWidth(buttonDims.width);
    menuButton.x = engine.drawWidth/2;
    menuButton.y = engine.drawHeight - offset;
  
    this.add(menuButton)
  }

  private onMenu = () => {
    this.engine.goToScene(Scenes.MAIN_MENU);
  };

  public onActivate() {
    SoundManager.get().playSoundInterrupt(Resources.laughSound); 
  }

  public onDeactivate() { 
    Resources.laughSound.stop();
  }
} 
