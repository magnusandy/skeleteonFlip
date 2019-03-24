import * as ex from 'excalibur';
import { GameWindow } from './scenes/levelOne';
import { Resources } from './resources';
import { Scenes } from './scenes/scenes';
import { MainMenu } from './scenes/mainMenu';
import Game from './engine/game';
import { GameLoader } from './engine/gameLoader';
import { GameOver } from './scenes/gameOver';
import { Victory } from './scenes/victory';

const game = new Game();
game.add(Scenes.MAIN_MENU, new MainMenu(game));
game.add(Scenes.GAME_OVER, new GameOver(game));
game.add(Scenes.GAME_WINDOW, new GameWindow(game));
game.add(Scenes.VICTORY, new Victory(game));

let loader = new GameLoader();
Object.keys(Resources)
      .forEach(k => loader.addResource(Resources[k]));
    
game.start(loader).then(() => {
  game.goToScene(Scenes.MAIN_MENU);
});
