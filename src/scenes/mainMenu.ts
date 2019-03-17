import * as ex from 'excalibur';
import { Label, Actor, Vector, Engine, SpriteSheet } from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Supplier } from 'java8script';

export class MainMenu extends ex.Scene {

  private screenWidth: number;
  private screenHeight: number;
  private game: ex.Engine;

  public onInitialize(engine: ex.Engine) {
    this.screenWidth = engine.canvasWidth;
    this.screenHeight = engine.canvasHeight;
    this.engine = engine;
  }

  public onActivate() {

    const title = Resources.title.asSprite();
    const titleActor = new Actor();
    titleActor.addDrawing(title);
    titleActor.x = this.screenWidth/2;
    titleActor.y = this.screenHeight/3;
    this.add(titleActor);
    
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
  }
  public onDeactivate() {}
}

class MenuButton extends ex.Actor {
  static buttonScale = new Vector(0.4, 0.4);
  public drawHeight: number;

  public constructor(texture: ex.Texture, onClick: Supplier<void>) {
    super();
    const sprite = texture.asSprite();
    sprite.scale = MenuButton.buttonScale;
    this.addDrawing(sprite)
    this.setHeight(sprite.drawHeight);
    this.setWidth(sprite.drawWidth);
    this.on("pointerdown", onClick);
    this.drawHeight = sprite.drawHeight;
  }
}