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

export abstract class GameWindowBase extends ex.Scene {

  protected coordinator: GameCoordinator;
  protected engine: Engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    this.add(new BackgroundManager(engine).getTileMap())
    this.add(new ExitButton(engine, () => engine.goToScene(Scenes.MAIN_MENU)));
    this.coordinator = GameCoordinator.initialize(this.engine);
  }

  public onActivate() {
    SoundManager.get().backgroundMusicStart();
    this.coordinator.getAllActors()
      .forEach(c => this.add(c));
  }

  public onDeactivate() {
    this.coordinator.getAllActors()
      .forEach(c => this.remove(c));
  }
} 
