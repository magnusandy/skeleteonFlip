import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Texture, Vector, Label, Color, Actor } from 'excalibur';
import ButtonBase from '../actors/bars/buttonBase';
import BackgroundManager from '../engine/backgroundManager';
import NumberSelector from '../actors/bars/numberSelector';
import ProgressionManager from '../engine/progression/progressionManager';
import { MainMenu } from './mainMenu';
import RadioButton from '../actors/bars/radioButton';
import LabeledRadio from '../actors/bars/labeledRadio';
import SoundManager from '../engine/soundManager';
import SizingManager from '../engine/sizingManager';
import { calcDimensionsSingleObjectTexture } from '../engine/helpers';
import { Consumer } from 'java8script';

export class Options extends ex.Scene {

  private engine;
  private gridSize: NumberSelector;
  private difficulty: NumberSelector;
  private sound: LabeledRadio;
  private progressionToggle: LabeledRadio;

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

    const callbackForEnabling = this.addGridSize(itemSize);
    this.addDifficultySize(itemSize);
    this.addSoundToggle(itemSize);
    this.addTitle();
    this.addProgressionToggle(itemSize, callbackForEnabling)

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
    ProgressionManager.get().setProgressionDisabled(!this.progressionToggle.isChecked());
    if (this.sound.isChecked()) {
      SoundManager.get().enableSound();
    } else {
      SoundManager.get().disableSound();
    }
    this.engine.goToScene(Scenes.MAIN_MENU);
  }

  private addTitle(): void {
    const dims = calcDimensionsSingleObjectTexture(this.engine.drawHeight, this.engine.drawWidth, Resources.optionTitle, 0.6, 1);
    const sprite = Resources.optionTitle.asSprite();
    const title = new Actor();
    title.addDrawing(sprite);
    title.x = this.engine.drawWidth/2;
    title.y = dims.height/2+ Config.gridPadding;
    title.setHeight(dims.height);
    title.setWidth(dims.width);
    title.scale = dims.scale; 
    this.add(title);
  }
  
  private addSoundToggle(itemSize) {
    this.sound = new LabeledRadio("Sound", itemSize, this.engine.drawWidth/2, this.engine.drawHeight/2 - itemSize*2.5 - Config.optionPadding, true, this.engine);

    this.sound.getDrawables()
    .forEach(e => this.add(e));
  }

  private addDifficultySize(itemSize): void {
    this.difficulty = new NumberSelector("DIFFICULTY", 1, 5, ProgressionManager.get().getDifficulty().getDifficultyLevel(), this.engine.drawWidth / 2, this.engine.drawHeight / 2 - itemSize*0.5 - Config.optionPadding, itemSize, false);
    this.difficulty.getDrawables()
      .forEach(i => this.add(i));
  }

  private addProgressionToggle(itemSize, toggleCallback: Consumer<boolean>) {
    this.progressionToggle = new LabeledRadio("Story Mode", itemSize, this.engine.drawWidth/2, this.engine.drawHeight/2 + itemSize*1 + Config.optionPadding, true, this.engine, toggleCallback);

    this.progressionToggle.getDrawables()
    .forEach(e => this.add(e));
  }

  //returns callback for toggling the objects
  private addGridSize(itemSize): Consumer<boolean> {
    this.gridSize = new NumberSelector("GRID SIZE", 2, 9, ProgressionManager.get().getOptionGridSize(), this.engine.drawWidth / 2, this.engine.drawHeight / 2 + itemSize*3 + Config.optionPadding, itemSize, true);
    this.gridSize.getDrawables()
      .forEach(i => this.add(i));

      return this.gridSize.updateDisabled;
  }

  public onActivate() {
    this.gridSize.setCurrent(ProgressionManager.get().getOptionGridSize());
    this.difficulty.setCurrent(ProgressionManager.get().getDifficulty().getDifficultyLevel());
    //todo update sound based on player settings
    //todo update story mode based on toggle
  }

  public onDeactivate() {
  }
} 
