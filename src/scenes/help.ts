import * as ex from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Texture, Vector, Actor, Engine } from 'excalibur';
import ButtonBase from '../actors/bars/buttonBase';
import BackgroundManager from '../engine/backgroundManager';
import { calcDimensionsSingleObjectTexture } from '../engine/helpers';
import { ExitButton } from '../actors/bars/exitButton';
import { render } from 'react-dom';
import E, { ModalRenderer } from '../modal/modal';
import { createElement } from 'react';

export class Help extends ex.Scene {

  private engine: Engine;
  private modalRenderer: ModalRenderer;
  private button: Actor;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    const bgManager = new BackgroundManager(engine);
    this.addTileMap(bgManager.getTileMap());
    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));
    this.addTitle();
    this.modalRenderer = new ModalRenderer(false, "BIG TEXET");

    this.button = new ButtonBase(Resources.helpMenu, () => {
      this.modalRenderer.setText("The goal if this game is to flip all the cards on the board without losing all of your hearts. Skeletons will hurt you, but finding swords and potions will keep you alive!");
      this.modalRenderer.setOpenAndRerender(true);
    });
    this.button.x = engine.drawWidth/2
    this.button.y = engine.drawHeight/2;
    this.button.setHeight(Resources.helpMenu.height);
    this.button.setWidth(Resources.helpMenu.width);
    this.add(this.button);
    
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
    title.x = this.engine.drawWidth/2;
    title.y = dims.height/2+ Config.gridPadding;
    title.setHeight(dims.height);
    title.setWidth(dims.width);
    title.scale = dims.scale; 
    this.add(title);
  }
} 
