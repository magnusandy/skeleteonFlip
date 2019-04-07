import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Texture, Vector, Actor } from 'excalibur';
import ButtonBase from '../actors/bars/buttonBase';
import BackgroundManager from '../engine/backgroundManager';
import { calcDimensionsSingleObjectTexture } from '../engine/helpers';

export class Help extends ex.Scene {

  private engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;

    const bgManager = new BackgroundManager(engine);
    this.addTileMap(bgManager.getTileMap());

    const exitT: Texture = Resources.uiX;
    const exit = new ButtonBase(
      exitT,
      () => engine.goToScene(Scenes.MAIN_MENU)
    );
    exit.scale = new Vector(Config.exitButtonSize / exitT.width, Config.exitButtonSize / exitT.height);
    exit.setHeight(Config.exitButtonSize);
    exit.setWidth(Config.exitButtonSize);
    exit.x = engine.drawWidth - Config.exitButtonSize / 2 - Config.gridPadding;
    exit.y = Config.exitButtonSize / 2 + Config.gridPadding;
    this.add(exit);
    this.addTitle();
  }
  
  public onActivate() {
  }
  
  public onDeactivate() {
  }

  private addTitle(): void {
    const dims = calcDimensionsSingleObjectTexture(this.engine.drawHeight, this.engine.drawWidth, Resources.helpTitle, 0.6, 2);
    const sprite = Resources.helpTitle.asSprite();
    const title = new Actor();
    title.addDrawing(sprite);
    title.x = this.engine.drawWidth/2;
    title.y = dims.height/2+ Config.gridPadding;
    title.setHeight(dims.height);
    title.setWidth(dims.width);
    title.scale = dims.scale; 
    this.add(title);
  }
} 
