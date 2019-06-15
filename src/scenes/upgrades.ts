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

export class Upgrades extends BaseScene {

  private coinsLabel: Label;
  private modalRenderer = new ModalRenderer(false);//todo singleton or properly init


  public onInitialize(engine: Engine) {
    const title = this.title();
    this.coinsLabel = this.playercoinsLabel(engine.drawWidth / 2, title.getBottom()+Config.optionPadding);
    const sizing = SizingManager.get().getUIButtonSizing();
    const dims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.introMenu, sizing.padding, sizing.maxScale);
    const button = this.createButton(dims, engine.drawWidth/2, this.coinsLabel.getBottom() + 100, Resources.introMenu, () => this.modalRenderer.upgradeMaxGridModal(3, 100, ()=> alert("nice")))
    
    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));
    this.add(title)
    this.add(this.coinsLabel);
    this.add(button);

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
