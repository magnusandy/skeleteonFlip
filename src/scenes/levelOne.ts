import * as ex from 'excalibur';
import { GameCoordinatior } from '../coordinator/coordinator';
import { Stream } from 'java8script';

export class GameWindow extends ex.Scene {

  private coordinator;

  public onInitialize(engine: ex.Engine) {
  }

  public onActivate() {
    
    const coordinator: GameCoordinatior = GameCoordinatior.initialize(this.engine);
    this.coordinator = coordinator;

    coordinator.getGridAsList()
      .forEach(c => this.add(c));

    coordinator.getColCountCards()
    .forEach(c => this.add(c));

    coordinator.getRowCountCards()
    .forEach(c => this.add(c));

    Stream.ofValues(coordinator.getUIBar())
      .map(l => Stream.ofValues(...l))
      .flatMap(l => l)
      .forEach(c => this.add(c));

  }
  public onDeactivate() {
    this.coordinator.getGridAsList()
      .forEach(c => this.remove(c));

    this.coordinator.getColCountCards()
    .forEach(c => this.remove(c));

    this.coordinator.getRowCountCards()
    .forEach(c => this.remove(c));

    Stream.ofValues(this.coordinator.getUIBar())
      .map(l => Stream.ofValues(...l))
      .flatMap(l => l)
      .forEach(c => this.remove(c));
   }
} 
