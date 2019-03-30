import * as ex from 'excalibur';

export default class Game extends ex.Engine {
  constructor() {
    super({ 
      suppressConsoleBootMessage: true,
      displayMode: ex.DisplayMode.FullScreen,
      suppressPlayButton: true //todo think about customizing the button
    });
  }

  public start(loader: ex.Loader) {
    return super.start(loader);
  }
}
