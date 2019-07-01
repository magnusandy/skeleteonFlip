import { Resources, Config } from '../resources';
import { getGameWindow } from './scenes';
import SoundManager from '../engine/managers/soundManager';
import {calcDimensionsSingleObjectTexture } from '../engine/helpers';
import BackgroundManager from '../engine/managers/backgroundManager';
import ButtonBase from '../actors/bars/buttonBase';
import SizingManager, { IButtonSizing } from '../engine/managers/sizingManager';
import { Scene, Actor } from 'excalibur';

export class Victory extends Scene {

  private engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    this.add(BackgroundManager.getDefaultTileMap(engine))
    const sizing: IButtonSizing = SizingManager.get().getUIButtonSizing();
    const buttonDims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.nextMenu, sizing.padding, sizing.maxScale);
    const imageDims = calcDimensionsSingleObjectTexture(this.engine.drawHeight, this.engine.drawWidth, Resources.victory, 0.8, 1)
    const offset = buttonDims.height/2 + Config.optionPadding;

    const victoryActor = new Actor(
      this.engine.drawWidth / 2,
      this.engine.drawHeight / 2 - offset,
      imageDims.width,
      imageDims.height
    );
    victoryActor.addDrawing(Resources.victory.asSprite());
    victoryActor.scale = imageDims.scale;
    this.add(victoryActor);

    const nextButton = new ButtonBase(
      Resources.nextMenu, 
      this.onNext,
    );
    nextButton.scale = buttonDims.scale;
    nextButton.setHeight(buttonDims.height);
    nextButton.setWidth(buttonDims.width);
    nextButton.x = engine.drawWidth/2;
    nextButton.y = engine.drawHeight - offset;
    this.add(nextButton);
  }

  private onNext = () => {
    this.engine.goToScene(getGameWindow());
  }
  public onActivate() {
    SoundManager.get().playSoundInterrupt(Resources.victorySound);
  }
  public onDeactivate() {
  }
} 
