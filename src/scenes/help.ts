import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Texture, Vector, Actor, Engine } from 'excalibur';
import ButtonBase from '../actors/bars/buttonBase';
import BackgroundManager from '../engine/backgroundManager';
import { calcDimensionsSingleObjectTexture, IDimensions } from '../engine/helpers';
import { ExitButton } from '../actors/bars/exitButton';
import { ModalRenderer } from '../modal/modal';
import SizingManager from '../engine/sizingManager';

export class Help extends ex.Scene {

  private engine: Engine;
  private modalRenderer: ModalRenderer;
  //private button: Actor;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    const bgManager = new BackgroundManager(engine);
    this.addTileMap(bgManager.getTileMap());
    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));
    this.addTitle();
    this.modalRenderer = new ModalRenderer(false);

    const centerx = engine.drawWidth / 2;
    const centery = engine.drawHeight / 2;
    const sizing = SizingManager.get().getUIButtonSizing();
    const dims = calcDimensionsSingleObjectTexture(engine.drawHeight, engine.drawWidth, Resources.introMenu, sizing.padding, sizing.maxScale);


    this.add(this.createButton(dims, centerx, centery - dims.height * 1.5 - Config.gridPadding * 1.5, Resources.introMenu, () => this.modalRenderer.introModal()));
    this.add(this.createButton(dims, centerx, centery - dims.height * 0.5 - Config.gridPadding * 0.5, Resources.playingMenu, () => this.modalRenderer.howToPlayModal()));
    this.add(this.createButton(dims, centerx, centery + dims.height * 0.5 + Config.gridPadding * 0.5, Resources.cardMenu, () => this.modalRenderer.cardModal()));
    this.add(this.createButton(dims, centerx, centery + dims.height * 1.5 + Config.gridPadding * 1.5, Resources.creditsMenu, () => this.modalRenderer.textModal("Credits", "Made by Andrew")));

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
    //this.modalRenderer.setOpenAndRerender(true);
  }

  public onDeactivate() {
  }

  private addTitle(): void {
    const dims = calcDimensionsSingleObjectTexture(this.engine.drawHeight, this.engine.drawWidth, Resources.helpTitle, 0.6, 1);
    const sprite = Resources.helpTitle.asSprite();
    const title = new Actor();
    title.addDrawing(sprite);
    title.x = this.engine.drawWidth / 2;
    title.y = dims.height / 2 + Config.gridPadding;
    title.setHeight(dims.height);
    title.setWidth(dims.width);
    title.scale = dims.scale;
    this.add(title);
  }
} 
