import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Texture, Vector, Label, Color, Actor } from 'excalibur';
import ButtonBase from '../actors/bars/buttonBase';
import BackgroundManager from '../engine/backgroundManager';
import NumberSelector from '../actors/bars/numberSelector';
import ProgressionManager from '../engine/progressionManager';
import { MainMenu } from './mainMenu';

export class Options extends ex.Scene {

  private engine;
  private numberSelector: NumberSelector;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;

    const bgManager = new BackgroundManager(engine);
    this.addTileMap(bgManager.getTileMap());


    const exitT: Texture = Resources.uiX;
    const exit = new ButtonBase(
      exitT,
      this.onExit
    );

    this.addGridSize();

    exit.scale = new Vector(Config.uiItemSize / exitT.width, Config.uiItemSize / exitT.height);
    exit.setHeight(Config.uiItemSize);
    exit.setWidth(Config.uiItemSize);
    exit.x = engine.drawWidth - Config.uiItemSize / 2 - Config.gridPadding;
    exit.y = Config.uiItemSize / 2 + Config.gridPadding;
    this.add(exit);
    
  }

  private onExit = () => {
    ProgressionManager.get().setGridSize(this.numberSelector.getCurrent());
    this.engine.goToScene(Scenes.MAIN_MENU);
  }

  private addGridSize(): void {
    this.numberSelector = new NumberSelector(2, 9, ProgressionManager.get().getGridSize(), this.engine.drawWidth/2, this.engine.drawHeight/2, Config.uiItemSize);
    this.numberSelector.getDrawables()
    .forEach(i => this.add(i));
  }
  
  public onActivate() {
  }

  public onDeactivate() {
  }
} 
