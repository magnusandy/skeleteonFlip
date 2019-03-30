import * as ex from 'excalibur';
import { GameCoordinatior } from '../coordinator/coordinator';
import { Stream } from 'java8script';
import SoundManager from '../engine/soundManager';
import BackgroundManager from '../engine/backgroundManager';
import { Actor, Engine, Color } from 'excalibur';

export class GameWindow extends ex.Scene {

  private coordinator;
  private engine: Engine;

  public onInitialize(engine: ex.Engine) {
    this.engine = engine;
    this.add(new BackgroundManager(engine).getTileMap())
  }

  public onActivate() {
    SoundManager.get().backgroundMusicStart();
    const coordinator: GameCoordinatior = GameCoordinatior.initialize(this.engine);
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

      const bar = new Actor();
      bar.y = 150;
      bar.x = this.engine.drawWidth/2;
      bar.setHeight(1);
      bar.setWidth(this.engine.drawWidth)
      bar.color = Color.Red;
      bar
      this.add(bar);
  }
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

  }
} 
