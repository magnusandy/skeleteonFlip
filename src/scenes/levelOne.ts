import * as ex from 'excalibur';
import { GameCoordinatior } from '../coordinator/coordinator';
import { Stream } from 'java8script';

export class GameWindow extends ex.Scene {

  public onInitialize(engine: ex.Engine) {
  }
  public onActivate() {
    const coordinator: GameCoordinatior = GameCoordinatior.initialize(this.engine);

    coordinator.getGridAsList()
      .forEach(c => this.add(c));

    Stream.ofValues(coordinator.getUIBar(), coordinator.getRowCounts(), coordinator.getColCounts())
      .map(l => Stream.ofValues(...l))
      .flatMap(l => l)
      .forEach(c => this.add(c));

  }
  public onDeactivate() { }
} 
