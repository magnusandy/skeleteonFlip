import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Texture, Vector, Actor, Engine, Axis } from 'excalibur';
import ButtonBase from '../actors/bars/buttonBase';
import { calcDimensionsSingleObjectTexture, IDimensions } from '../engine/helpers';
import { ExitButton } from '../actors/bars/exitButton';
import { ModalRenderer } from '../modal/modal';
import SizingManager from '../engine/managers/sizingManager';
import BaseScene from './BaseScene';

export class Help extends BaseScene {

  private modalRenderer: ModalRenderer;

  public onInitialize(engine: ex.Engine) {

    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));

    const titleDims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.helpTitle, 0.6, 1);
    const title = new Actor(
      engine.drawWidth / 2,
      titleDims.height / 2 + Config.gridPadding,
      titleDims.width,
      titleDims.height
    );
    title.addDrawing(Resources.helpTitle);
    title.scale = titleDims.scale;
    this.add(title);

    this.modalRenderer = new ModalRenderer(false);

    const centerx = engine.drawWidth / 2;
    const sizing = SizingManager.get().getUIButtonSizing();
    const dims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.introMenu, sizing.padding, sizing.maxScale);

    const intro = this.createButton(dims, centerx, title.getBottom() + dims.height / 2 + Config.optionPadding, Resources.introMenu, () => this.modalRenderer.introModal());
    const playing = this.createButton(dims, centerx, intro.getBottom() + Config.gridPadding + dims.height / 2, Resources.playingMenu, () => this.modalRenderer.howToPlayModal());
    const cards = this.createButton(dims, centerx, playing.getBottom() + Config.gridPadding + dims.height / 2, Resources.cardMenu, () => this.modalRenderer.cardModal());
    const credits = this.createButton(dims, centerx, cards.getBottom() + Config.gridPadding + dims.height / 2, Resources.creditsMenu, () => this.modalRenderer.textModal("Credits", "Made by Andrew"));

    this.add(intro);
    this.add(playing);
    this.add(cards);
    this.add(credits);


    this.initScroll(credits.getBottom());
    this.setBackround(credits.getBottom());
  }

  public createButton(dims: IDimensions, x: number, y: number, texture: Texture, onClick: () => void): ButtonBase {
    const button = new ButtonBase(texture, onClick);
    button.x = x
    button.y = y
    button.scale = dims.scale;
    button.setHeight(dims.height);
    button.setWidth(dims.width);
    return button;
  }

  public onActivate() {
  }

  public onDeactivate() {
  }
} 
