import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Texture, Vector, Actor, Engine } from 'excalibur';
import ButtonBase from '../actors/bars/buttonBase';
import BackgroundManager from '../engine/backgroundManager';
import { calcDimensionsSingleObjectTexture } from '../engine/helpers';
import { ExitButton } from '../actors/bars/exitButton';

export class Help extends ex.Scene {

  private engine: Engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    const bgManager = new BackgroundManager(engine);
    this.addTileMap(bgManager.getTileMap());
    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));
    this.addTitle();
  }
  
  public onActivate() {
  }
  
  public onDeactivate() {
  }

  private addTitle(): void {
    const dims = calcDimensionsSingleObjectTexture(this.engine.drawHeight, this.engine.drawWidth, Resources.helpTitle, 0.6, 1);
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
