import { Actor, Vector, Scene } from 'excalibur';
import { Resources, Config } from '../resources';
import { Scenes } from './scenes';
import ButtonBase from '../actors/bars/buttonBase';
import { calcDimensionsSingleObjectTexture } from '../engine/helpers';
import BackgroundManager from '../engine/backgroundManager';

export class MainMenu extends Scene {

  private screenWidth: number;
  private screenHeight: number;
  private game: ex.Engine;

  private title: Actor;
  private start: Actor;
  private help: Actor;
  private options: Actor;

  public onInitialize(engine: ex.Engine) {
    this.screenWidth = engine.drawWidth;
    this.screenHeight = engine.drawHeight;
    this.game = engine;
    const bgManager = new BackgroundManager(engine);
    this.addTileMap(bgManager.getTileMap());

    this.start = new ButtonBase(
      Resources.startMenu, () => this.game.goToScene(Scenes.GAME_WINDOW),
    );
    this.sizeProperly(this.start, 0.4, 0.5, Resources.startMenu);
    this.add(this.start)

    this.options = new ButtonBase(
      Resources.optionMenu,
      () => this.game.goToScene(Scenes.OPTIONS),
    );
    this.sizeProperly(this.options, 0.4, 0.5, Resources.optionMenu);
    this.add(this.options);

    this.help = new ButtonBase(
      Resources.helpMenu,
      () => this.game.goToScene(Scenes.HELP),
    );
    this.sizeProperly(this.help, 0.4, 0.5, Resources.helpMenu);
    this.add(this.help);

    this.title = this.sizeProperly(new Actor(), 0.9, 1, Resources.title);
    this.title.addDrawing(Resources.title);
    this.add(this.title);

    this.placeActors();
  }

  public onActivate() {
  }

  public sizeProperly(actor, padding, scale, resource): Actor {
    const dims = calcDimensionsSingleObjectTexture(this.screenHeight, this.screenWidth, resource, padding, scale);
    actor.scale = dims.scale;
    actor.setHeight(dims.height);
    actor.setWidth(dims.width);
    return actor;
  }

  public placeActors() {
    this.start.x = this.screenWidth / 2;
    this.start.y = this.screenHeight / 2 - this.start.getHeight() - Config.gridPadding;

    this.options.x = this.screenWidth / 2;
    this.options.y = this.screenHeight / 2;

    this.help.x = this.screenWidth / 2;
    this.help.y = this.screenHeight / 2 + this.help.getHeight() + Config.gridPadding;

    this.title.x = this.screenWidth / 2;
    this.title.y = this.title.getHeight()/2 + Config.gridPadding;
  }

  public onDeactivate() { }
}