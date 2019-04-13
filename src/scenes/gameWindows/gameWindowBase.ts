import * as ex from 'excalibur';
import { GameCoordinator } from '../../coordinator/coordinator';
import { Stream } from 'java8script';
import SoundManager from '../../engine/soundManager';
import BackgroundManager from '../../engine/backgroundManager';
import { Actor, Engine, Color, Texture, Vector } from 'excalibur';
import { Resources, Config } from '../../resources';
import ButtonBase from '../../actors/bars/buttonBase';
import { Scenes } from '../scenes';
import LevelDisplay from '../../actors/bars/level';
import ProgressionManager from '../../engine/progression/progressionManager';
import SizingManager from '../../engine/sizingManager';
import { ExitButton } from '../../actors/bars/exitButton';

export class GameWindowBase extends ex.Scene {

  private coordinator: GameCoordinator;
  protected engine: Engine;
  private levelDisplay: LevelDisplay;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    this.add(new BackgroundManager(engine).getTileMap())
    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));

    //todo move this to be actually score keeper
    /*
    const coins: Actor = new Actor();
    coins.addDrawing(Resources.uiCoins);
    coins.scale = new Vector(Config.uiItemSize / Resources.uiCoins.width, Config.uiItemSize / Resources.uiCoins.height);
    coins.x = Config.uiItemSize / 2;
    coins.y = Config.uiItemSize * 2.5;
    this.add(coins);
    */

    const mm: SizingManager = SizingManager.get();
    this.levelDisplay = new LevelDisplay(engine.drawWidth / 2, mm.getMenuHeight() - mm.getUIItemSize() / 2, mm.getUIItemSize(), ProgressionManager.get().getLevelString());
    this.add(this.levelDisplay);

  }

  public onActivate() {
    this.levelDisplay.updateLevel(ProgressionManager.get().getLevelString());

    SoundManager.get().backgroundMusicStart();
    const coordinator: GameCoordinator = GameCoordinator.initialize(this.engine);
    this.coordinator = coordinator;

    coordinator.getGridAsList()
      .forEach(c => this.add(c));

    coordinator.getColCountCards()
      .forEach(c => this.add(c));

    coordinator.getRowCountCards()
      .forEach(c => this.add(c));

    Stream.ofValues(this.coordinator.getStatTrackers())
      .map(l => Stream.ofValues(...l))
      .flatMap(l => l)
      .forEach(c => this.add(c));

    //cordova specific
    //document.addEventListener("backbutton", this.onBackButton);
  }

  private onBackButton = () => this.engine.goToScene(Scenes.MAIN_MENU);

  public onDeactivate() {
    this.coordinator.getGridAsList()
      .forEach(c => this.remove(c));

    this.coordinator.getColCountCards()
      .forEach(c => this.remove(c));

    this.coordinator.getRowCountCards()
      .forEach(c => this.remove(c));

    Stream.ofValues(this.coordinator.getStatTrackers())
      .map(l => Stream.ofValues(...l))
      .flatMap(l => l)
      .forEach(c => this.remove(c));

    //document.removeEventListener("backbutton", this.onBackButton);
  }
} 
