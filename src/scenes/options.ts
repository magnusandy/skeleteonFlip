import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Actor, Engine } from 'excalibur';
import NumberSelector from '../actors/bars/numberSelector';
import ProgressionManager from '../engine/progression/progressionManager';
import LabeledRadio from '../actors/bars/labeledRadio';
import SizingManager from '../engine/sizingManager';
import { calcDimensionsSingleObjectTexture } from '../engine/helpers';
import { Consumer } from 'java8script';
import PlayerSettingsManager from '../engine/progression/playerSettingsManager';
import { ExitButton } from '../actors/bars/exitButton';
import BaseScene from './BaseScene';

export class Options extends BaseScene {

  private gridSize: NumberSelector;
  private difficulty: NumberSelector;
  private sound: LabeledRadio;
  private progressionToggle: LabeledRadio;
  private title: Actor;

  public onInitialize(engine: Engine) {
    const itemSize = SizingManager.get().getUIItemSize();
    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));

    this.addTitle();
    this.addSoundToggle(itemSize);
    this.addDifficultySize(itemSize);
    this.addProgressionToggle(itemSize)
    const callbackForEnabling = this.addGridSize(itemSize);
    this.progressionToggle.addOnToggle(callbackForEnabling);

    const sizing = SizingManager.get().getUIButtonSizing();
    const createbuttonDims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.confirmMenu, sizing.padding, sizing.maxScale);

    const createButtonY =
      this.gridSize.getBottom() < engine.drawHeight - createbuttonDims.height
        ? engine.drawHeight - createbuttonDims.height / 2 - Config.optionPadding //grid size and confirm dont overelap so all good, draw at the bottom of screen 
        : this.gridSize.getBottom() + Config.optionPadding + createbuttonDims.height / 2;
    const createButton = this.createButton(
      createbuttonDims,
      engine.drawWidth / 2,
      createButtonY,
      Resources.confirmMenu,
      () => this.onConfirm()
    );
    this.add(createButton);

    this.initScroll(createButton.getBottom());
    this.setBackround(createButton.getBottom())
  }

  private onConfirm = () => {
    ProgressionManager.get().setGridSize(this.gridSize.getCurrent());
    ProgressionManager.get().setDifficulty(this.difficulty.getCurrent());
    ProgressionManager.get().setProgressionDisabled(!this.progressionToggle.isChecked());
    PlayerSettingsManager.get().setIsSoundOff(!this.sound.isChecked())
    this.engine.goToScene(Scenes.MAIN_MENU);
  }


  private addTitle(): void {
    const dims = calcDimensionsSingleObjectTexture(this.engine.drawHeight, this.engine.drawWidth, Resources.optionTitle, 0.6, 1);
    const sprite = Resources.optionTitle.asSprite();
    const title = new Actor();
    title.addDrawing(sprite);
    title.x = this.engine.drawWidth / 2;
    title.y = dims.height / 2 + Config.gridPadding;
    title.setHeight(dims.height);
    title.setWidth(dims.width);
    title.scale = dims.scale;
    this.title = title;
    this.add(title);
  }

  private addSoundToggle(itemSize) {
    this.sound = new LabeledRadio("Sound",
      itemSize, this.engine.drawWidth / 2,
      this.title.getBottom() + Config.optionPadding * 2,
      !PlayerSettingsManager.get().isSoundOff(),
      this.engine
    );

    this.sound.getDrawables()
      .forEach(e => this.add(e));
  }

  private addDifficultySize(itemSize): void {
    this.difficulty = new NumberSelector("DIFFICULTY", 1, 5, ProgressionManager.get().getDifficulty().getDifficultyLevel(), this.engine.drawWidth / 2,
      this.sound.getBottom() + itemSize * 0.5 + Config.optionPadding,
      itemSize, false);
    this.difficulty.getDrawables()
      .forEach(i => this.add(i));
  }

  private addProgressionToggle(itemSize) {
    this.progressionToggle = new LabeledRadio("Story Mode", itemSize, this.engine.drawWidth / 2,
      this.difficulty.getBottom() + itemSize * 1 + Config.optionPadding,
      !ProgressionManager.get().isProgressionDisabled(), this.engine);

    this.progressionToggle.getDrawables()
      .forEach(e => this.add(e));
  }

  //returns callback for toggling the objects
  private addGridSize(itemSize): Consumer<boolean> {
    this.gridSize = new NumberSelector("GRID SIZE", 2, 9, ProgressionManager.get().getOptionGridSize(), this.engine.drawWidth / 2,
      this.progressionToggle.getBottom() + itemSize * 0.5 + Config.optionPadding, itemSize,
      !ProgressionManager.get().isProgressionDisabled());
    this.gridSize.getDrawables()
      .forEach(i => this.add(i));

    return this.gridSize.updateDisabled;
  }

  public onActivate() {
    this.sound.setChecked(!PlayerSettingsManager.get().isSoundOff());
    this.gridSize.setCurrent(ProgressionManager.get().getOptionGridSize());
    this.difficulty.setCurrent(ProgressionManager.get().getDifficulty().getDifficultyLevel());
    this.progressionToggle.setChecked(!ProgressionManager.get().isProgressionDisabled())
  }

  public onDeactivate() {
  }
} 
