import { Config } from '../../resources';
import { Color, Engine, Input, DisplayMode } from 'excalibur';

export default class Game extends Engine {

  constructor() {
    super({ 
      suppressConsoleBootMessage: true,
      displayMode: DisplayMode.FullScreen,
      pointerScope: Input.PointerScope.Canvas, //make it so clicks don't go "through" the help modals
      suppressPlayButton: true, //todo think about customizing the button
      backgroundColor: Color.fromHex(Config.backgroundColor),
    });
  }

  public start(loader: ex.Loader) {
    return super.start(loader);
  }
}
