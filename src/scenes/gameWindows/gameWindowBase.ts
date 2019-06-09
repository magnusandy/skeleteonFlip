import { GameCoordinator } from '../../coordinator/coordinator';
import SoundManager from '../../engine/managers/soundManager';
import BackgroundManager from '../../engine/managers/backgroundManager';
import { Engine, Scene } from 'excalibur';
import { Scenes } from '../scenes';
import { ExitButton } from '../../actors/bars/exitButton';

export abstract class GameWindowBase extends Scene {

  protected coordinator: GameCoordinator;
  protected engine: Engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    this.add(BackgroundManager.getDefaultTileMap(engine))
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
