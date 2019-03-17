import * as ex from 'excalibur';
import { GameWindow } from './scenes/levelOne';
import { Resources } from './resources';
import { Scenes } from './scenes/scenes';
import { MainMenu } from './scenes/mainMenu';
import Game from './engine/Game';
import { GameLoader } from './engine/GameLoader';
import { GameOver } from './scenes/gameOver';

const game = new Game();
game.add(Scenes.MAIN_MENU, new MainMenu(game));
game.add(Scenes.GAME_OVER, new GameOver(game));
game.add(Scenes.GAME_WINDOW, new GameWindow(game));

let loader = new GameLoader();
Object.keys(Resources)
      .forEach(k => loader.addResource(Resources[k]));
    
game.start(loader).then(() => {
  game.goToScene(Scenes.MAIN_MENU);
});
