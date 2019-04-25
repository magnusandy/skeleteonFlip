import * as ex from 'excalibur';

export default class Game extends ex.Engine {

  constructor() {
    super({ 
      suppressConsoleBootMessage: true,
      displayMode: ex.DisplayMode.FullScreen,
      pointerScope: ex.Input.PointerScope.Canvas, //make it so clicks don't go "through" the help modals
      suppressPlayButton: true, //todo think about customizing the button
    });
  }

  public start(loader: ex.Loader) {
    return super.start(loader);
  }
}
