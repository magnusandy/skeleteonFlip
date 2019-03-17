import * as ex from 'excalibur';
import { Config } from '../resources';

export default class Game extends ex.Engine {
  constructor() {
    super({ 
      displayMode: ex.DisplayMode.FullScreen 
    });
    this.backgroundColor = Config.backgroundColor;
  }

  public start(loader: ex.Loader) {
    return super.start(loader);
  }
}
