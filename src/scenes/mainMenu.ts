import { Actor, Vector, Sprite, Scene } from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Supplier } from 'java8script';
import { Darken } from 'excalibur/dist/Drawing/SpriteEffects';
import ButtonBase from '../actors/bars/buttonBase';

export class MainMenu extends Scene {

  private screenWidth: number;
  private screenHeight: number;
  private game: ex.Engine;

  public onInitialize(engine: ex.Engine) {
    this.screenWidth = engine.drawWidth;
    this.screenHeight = engine.drawHeight;
    this.game = engine;
  }

  public onActivate() {
    const scale = new Vector(0.5,0.5);
    const startActor = new ButtonBase(
      Resources.startMenu, () => this.game.goToScene(Scenes.GAME_WINDOW),
      scale
    );
    startActor.x = this.screenWidth/2;
    startActor.y = this.screenHeight/2 - startActor.drawHeight/2 - Config.gridPadding;

    this.add(startActor)

    const optionActor = new ButtonBase(
      Resources.optionMenu,
      () => {},
      scale
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