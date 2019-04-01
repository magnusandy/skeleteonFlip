import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Texture, Vector } from 'excalibur';
import ButtonBase from '../actors/bars/buttonBase';
import BackgroundManager from '../engine/backgroundManager';

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
  }
  
  public onActivate() {
  }
  
  public onDeactivate() {
  }
} 
