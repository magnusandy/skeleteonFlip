import { Scenes } from './scenes';
import { Engine, Label, BaseAlign, TextAlign, Actor } from 'excalibur';
import { ExitButton } from '../actors/bars/exitButton';
import BaseScene from './BaseScene';
import FontManager from '../engine/managers/fontManager';
import PlayerSettingsManager from '../engine/progression/playerSettingsManager';
import SizingManager from '../engine/managers/sizingManager';
import {calcDimensionsSingleObjectTexture } from '../engine/helpers';
import { Resources, Config, Upgrades } from '../resources';
import UpgradeWidget from '../actors/upgrades/upgradeWidget';
import { Difficulty } from '../engine/progression/difficulty';

export class UpgradeScene extends BaseScene {

  private coinsLabel: Label;
  private maxGrid: UpgradeWidget;
  private maxDiff: UpgradeWidget;

  public onInitialize(engine: Engine) {
    const title = this.title();
    this.coinsLabel = this.playercoinsLabel(engine.drawWidth / 2, title.getBottom() + Config.optionPadding);
    const sizing = SizingManager.get().getUIButtonSizing();
    const dims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.gridTile, sizing.padding, sizing.maxScale);
    console.log(dims);
    this.maxGrid = new UpgradeWidget(
      this.getButtonX(engine, dims.width),
      this.coinsLabel.getBottom() + 100,
      dims,
      Resources.gridTile,
      "Grid Size",
      Upgrades.gridSize.getDetails(PlayerSettingsManager.get().getMaxGridSize()),
      () => {
        const ps = PlayerSettingsManager.get();
        const coins = ps.getTotalCoins();
        const currentgrid = ps.getMaxGridSize();
        ps.setTotalCoins(coins - Upgrades.gridSize.getDetails(currentgrid).price);
        ps.setMaxGridSize(currentgrid+1);
        this.onActivate(); //refresh
      },
    );

    this.maxDiff = new UpgradeWidget(
      this.getButtonX(engine, dims.width),
      this.maxGrid.getBottom() + dims.width/2 + Config.optionPadding,
      dims,
      Resources.difficultyTile,
      "Difficulty",
      Upgrades.difficulty.getDetails(PlayerSettingsManager.get().getMaxDiff().getDifficultyLevel()),//todo
      () => {
        const ps = PlayerSettingsManager.get();
        const coins = ps.getTotalCoins();
        const currentDiff = ps.getMaxDiff().getDifficultyLevel();
        ps.setTotalCoins(coins - Upgrades.difficulty.getDetails(currentDiff).price);
        ps.setMaxDiff(Difficulty.getByDifficultyLevel(currentDiff+1));
        this.onActivate(); //refresh
      },
    );

    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));
    this.add(title)
    this.add(this.coinsLabel);
    this.maxGrid.getDrawables()
    .forEach(d => this.add(d));
    this.maxDiff.getDrawables()
    .forEach(d => this.add(d));

    this.initScroll(0);
    this.setBackround(engine.drawHeight);
  }

  private getButtonX(engine: Engine, buttonWidth: number): number {
    return SizingManager.get().isMobile()
     ? 0 + (buttonWidth/2) + Config.gridPadding
     : engine.drawWidth/3;    
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
    coinsLabel.fontSize = SizingManager.get().menuFontSize();
    coinsLabel.baseAlign = BaseAlign.Middle;
    coinsLabel.textAlign = TextAlign.Center;
    return coinsLabel;
  }

  private coinsLabelString(coins: number): string {
    return `Coins: ${coins}`;
  }

  public onActivate() {
    const psm = PlayerSettingsManager.get();
    this.coinsLabel.text = this.coinsLabelString(PlayerSettingsManager.get().getTotalCoins());
    this.maxGrid.updateDetails(Upgrades.gridSize.getDetails(psm.getMaxGridSize()));
    this.maxDiff.updateDetails(Upgrades.difficulty.getDetails(psm.getMaxDiff().getDifficultyLevel()))

  }

  public onDeactivate() {
  }
} 
