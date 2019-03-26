import { Actor, Vector, Sprite, Scene } from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import { Supplier } from 'java8script';
import { Darken } from 'excalibur/dist/Drawing/SpriteEffects';
import ButtonBase from '../actors/bars/buttonBase';
import { calcDimensionsSingleObject } from '../engine/helpers';

export class MainMenu extends Scene {

  private screenWidth: number;
  private screenHeight: number;
  private game: ex.Engine;

  private title: Actor;
  private start: Actor;
  private options: Actor;

  public onInitialize(engine: ex.Engine) {
    this.screenWidth = engine.drawWidth;
    this.screenHeight = engine.drawHeight;
    this.game = engine;
  }

  public onActivate() {
    const scale = new Vector(1, 1);
    this.start = new ButtonBase(
      Resources.startMenu, () => this.game.goToScene(Scenes.GAME_WINDOW),
      scale
    );
    this.sizeProperly(this.start, 0.4, 0.5, Resources.startMenu);
    this.add(this.start)

    this.options = new ButtonBase(
      Resources.optionMenu,
      () => { },
      scale
    );
    this.sizeProperly(this.options, 0.4, 0.5,Resources.startMenu);

    this.add(this.options);
    

    this.title = this.sizeProperly(new Actor(), 0.8, 1.5,Resources.title);
    this.add(this.title);


    this.placeActors();
  }

  public sizeProperly(actor, padding, scale, resource): Actor {
    const dims = calcDimensionsSingleObject(this.screenHeight, this.screenWidth, resource, padding, scale);
    console.log(dims);
    actor.addDrawing(resource);
    actor.scale = dims.scale;
    actor.setHeight(dims.height);
    actor.setWidth(dims.width);
    return actor;
  }

  public placeActors() {
    console.log(this.start);
    this.start.x = this.screenWidth / 2;
    this.start.y = this.screenHeight / 2 - this.start.getHeight() / 2 - Config.gridPadding;

    this.options.x = this.screenWidth / 2;
    this.options.y = this.screenHeight / 2 + this.options.getHeight() / 2 + Config.gridPadding;

    this.title.x = this.screenWidth / 2;
    this.title.y = this.screenHeight / 2 - this.start.getHeight()*1.7;
  }

  public onDeactivate() { }
}