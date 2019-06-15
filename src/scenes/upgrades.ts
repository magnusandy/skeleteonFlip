import { Scenes } from './scenes';
import { Engine, Label, BaseAlign, TextAlign, Actor } from 'excalibur';
import { ExitButton } from '../actors/bars/exitButton';
import BaseScene from './BaseScene';
import FontManager from '../engine/managers/fontManager';
import PlayerSettingsManager from '../engine/progression/playerSettingsManager';
import SizingManager from '../engine/managers/sizingManager';
import { calcDimensionsSingleObject, calcDimensionsSingleObjectTexture } from '../engine/helpers';
import { Resources, Config } from '../resources';
import { ModalRenderer } from '../modal/modal';
import UpgradeWidget from '../actors/upgrades/upgradeWidget';

export class Upgrades extends BaseScene {

  private coinsLabel: Label;

  public onInitialize(engine: Engine) {
    const title = this.title();
    this.coinsLabel = this.playercoinsLabel(engine.drawWidth / 2, title.getBottom() + Config.optionPadding);
    const sizing = SizingManager.get().getUIButtonSizing();
    const dims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.gridTile, sizing.padding, sizing.maxScale);
    
    const gridButton = new UpgradeWidget(
      engine.drawWidth / 3,
      this.coinsLabel.getBottom() + 100,
      dims,
      Resources.gridTile,
      "Grid Size",
      <any>{},//todo
      () => alert("nice"),
    );

    const difficulty = new UpgradeWidget(
      engine.drawWidth / 3,
      gridButton.getBottom() + Config.optionPadding*2,
      dims,
      Resources.difficultyTile,
      "Difficulty",
      <any>{},//todo
      () => alert("diff"),
    );

    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));
    this.add(title)
    this.add(this.coinsLabel);
    gridButton.getDrawables()
    .forEach(d => this.add(d));
    difficulty.getDrawables()
    .forEach(d => this.add(d));

    this.initScroll(0);
    this.setBackround(engine.drawHeight);
  }

  private title(): Actor {
    const dims = calcDimensionsSingleObjectTexture(this.engine.drawHeight, this.engine.drawWidth, Resources.upgradeTitle, 0.6, 1);
    const sprite = Resources.upgradeTitle.asSprite();
    const title = new Actor();
    title.addDrawing(sprite);
    title.x = this.engine.drawWidth / 2;
    title.y = dims.height / 2 + Config.gridPadding;
    title.setHeight(dims.height);
    title.setWidth(dims.width);
    title.scale = dims.scale;
    return title;
  }

  private playercoinsLabel(x: number, y: number): Label {
    const coins = PlayerSettingsManager.get().getTotalCoins();
    const coinsLabel = new Label(this.coinsLabelString(coins), x, y, null, FontManager.get().getMono());
    coinsLabel.fontSize = SizingManager.get().getUIItemSize();
    coinsLabel.baseAlign = BaseAlign.Middle;
    coinsLabel.textAlign = TextAlign.Center;
    return coinsLabel;
  }

  private coinsLabelString(coins: number): string {
    return `Current Coins: ${coins}`;
  }

  public onActivate() {
    this.coinsLabel.text = this.coinsLabelString(PlayerSettingsManager.get().getTotalCoins());
  }

  public onDeactivate() {
  }
} 
