import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Texture, Vector, Label, Color, Actor } from 'excalibur';
import ButtonBase from '../actors/bars/buttonBase';
import BackgroundManager from '../engine/backgroundManager';
import NumberSelector from '../actors/bars/numberSelector';
import ProgressionManager from '../engine/progressionManager';
import { MainMenu } from './mainMenu';
import RadioButton from '../actors/bars/radioButton';
import LabeledRadio from '../actors/bars/labeledRadio';
import SoundManager from '../engine/soundManager';
import SizingManager from '../engine/sizingManager';

export class Options extends ex.Scene {

  private engine;
  private gridSize: NumberSelector;
  private difficulty: NumberSelector;
  private sound: LabeledRadio;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;

    const bgManager = new BackgroundManager(engine);
    this.addTileMap(bgManager.getTileMap());
    const itemSize = SizingManager.get().getUIItemSize();

    const exitT: Texture = Resources.uiX;
    const exit = new ButtonBase(
      exitT,
      this.onExit
    );

    this.addGridSize(itemSize);
    this.addDifficultySize(itemSize);
    this.addSoundToggle(itemSize);

    exit.scale = new Vector(Config.exitButtonSize / exitT.width, Config.exitButtonSize / exitT.height);
    exit.setHeight(Config.exitButtonSize);
    exit.setWidth(Config.exitButtonSize);
    exit.x = engine.drawWidth - Config.exitButtonSize / 2 - Config.gridPadding;
    exit.y = Config.exitButtonSize / 2 + Config.gridPadding;
    this.add(exit);
  }

  private onExit = () => {
    ProgressionManager.get().setGridSize(this.gridSize.getCurrent());
    ProgressionManager.get().setDifficulty(this.difficulty.getCurrent());
    if (this.sound.isChecked()) {
      SoundManager.get().enableSound();
    } else {
      SoundManager.get().disableSound();
    }
    this.engine.goToScene(Scenes.MAIN_MENU);
  }

  private addGridSize(itemSize): void {
    this.gridSize = new NumberSelector("GRID SIZE", 2, 9, ProgressionManager.get().getGridSize(), this.engine.drawWidth / 2, this.engine.drawHeight / 2, itemSize);
    this.gridSize.getDrawables()
      .forEach(i => this.add(i));
  }

  private addDifficultySize(itemSize): void {
    this.difficulty = new NumberSelector("DIFFICULTY", 1, 5, ProgressionManager.get().getDifficulty(), this.engine.drawWidth / 2, this.engine.drawHeight / 2 + itemSize*2 + Config.optionPadding, itemSize);
    this.difficulty.getDrawables()
      .forEach(i => this.add(i));
  }

  private addSoundToggle(itemSize) {
    this.sound = new LabeledRadio("Sound", itemSize, this.engine.drawWidth/2, this.engine.drawHeight/2 - itemSize - Config.optionPadding, true, this.engine);

    this.sound.getDrawables()
    .forEach(e => this.add(e));
  }

  public onActivate() {
    this.gridSize.setCurrent(ProgressionManager.get().getGridSize());
    this.difficulty.setCurrent(ProgressionManager.get().getDifficulty()); 
  }

  public onDeactivate() {
  }
} 
