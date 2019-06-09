import { Actor } from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes, getGameWindow } from './scenes';
import { calcDimensionsSingleObjectTexture } from '../engine/helpers';
import SoundManager from '../engine/managers/soundManager';
import SizingManager, { IButtonSizing } from '../engine/managers/sizingManager';
import BaseScene from './BaseScene';

export class MainMenu extends BaseScene {
  public onInitialize(engine: ex.Engine) {
    const centerX = engine.drawWidth / 2;


    const dims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.title, 0.9, 0.8);
    const title = new Actor(centerX, dims.height/2 + Config.gridPadding, dims.width, dims.height);
    title.scale = dims.scale;
    title.addDrawing(Resources.title);
    this.add(title);

    const {padding, maxScale} :IButtonSizing = SizingManager.get().getUIButtonSizing();
    const buttonDims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.startMenu, padding, maxScale );

    const start = this.createButton(buttonDims, centerX,  title.getBottom() + Config.optionPadding + buttonDims.height/2, Resources.startMenu, () => engine.goToScene(getGameWindow()));
    const options = this.createButton(buttonDims, centerX, start.getBottom() + Config.gridPadding + buttonDims.height/2, Resources.optionMenu, () => engine.goToScene(Scenes.OPTIONS));
    const help = this.createButton(buttonDims, centerX, options.getBottom() + Config.gridPadding+ buttonDims.height/2, Resources.helpMenu, () => engine.goToScene(Scenes.HELP));
    
    this.add(start);
    this.add(options);
    this.add(help);

    this.setBackround(help.getBottom());
    this.initScroll(help.getBottom());
  }

  public onActivate() {
    SoundManager.get().backgroundMusicEnd();
  }

  public onDeactivate() { }
}