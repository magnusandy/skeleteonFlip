import * as ex from 'excalibur';
import { Label, Actor, Vector, Engine, SpriteSheet, Sprite, Events } from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Supplier } from 'java8script';
import { Darken } from 'excalibur/dist/Drawing/SpriteEffects';
import SoundManager from '../engine/soundManager';

export class MainMenu extends ex.Scene {

  private screenWidth: number;
  private screenHeight: number;
  private game: ex.Engine;

  public onInitialize(engine: ex.Engine) {
    this.screenWidth = engine.drawWidth;
    this.screenHeight = engine.drawHeight;
    this.engine = engine;
  }

  public onActivate() {
    SoundManager.get().backgroundMusicStart();
    const startActor = new MenuButton(
      Resources.startMenu, () => this.engine.goToScene(Scenes.GAME_WINDOW)
    );
    startActor.x = this.screenWidth/2;
    startActor.y = this.screenHeight/2 - startActor.drawHeight/2 - Config.gridPadding;

    this.add(startActor)

    const optionActor = new MenuButton(
      Resources.optionMenu,
      () => {}
    );
    optionActor.x = this.screenWidth/2;
    optionActor.y = this.screenHeight/2 + optionActor.drawHeight/2 + Config.gridPadding;
    this.add(optionActor)

    const title = Resources.title.asSprite();
    const titleActor = new Actor();
    titleActor.addDrawing(title);
    titleActor.x = this.screenWidth/2;
    titleActor.y = this.screenHeight/2 - startActor.drawHeight*2;
    this.add(titleActor);
  
  }
  public onDeactivate() {}
}

class MenuButton extends ex.Actor {
  static buttonScale = new Vector(0.4, 0.4);
  public drawHeight: number;
  private sprite: Sprite;

  public constructor(texture: ex.Texture, onClick: Supplier<void>) {
    super();
    this.sprite = texture.asSprite();
    this.sprite.scale = MenuButton.buttonScale;
    this.addDrawing(this.sprite)
    this.setHeight(this.sprite.drawHeight);
    this.setWidth(this.sprite.drawWidth);
    this.on("pointerDown", this.onDown);
    this.on("pointerup", onClick);
    this.on("pointerenter", this.onEnter);
    this.on("pointerleave", this.onExit);
    this.drawHeight = this.sprite.drawHeight;
  }

  private onDown: () => void = () => {
    this.sprite.clearEffects();
    this.sprite.addEffect(new Darken(0.2))
  }

  private onEnter: () => void = () => {
    this.sprite.clearEffects();
    this.sprite.addEffect(new Darken(0.1))
  }

  private onExit: () => void = () => {
    this.sprite.clearEffects();
  }
  
}