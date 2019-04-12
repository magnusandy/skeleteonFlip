import { GameWindow } from './scenes/gameWindow';
import { Resources } from './resources';
import { Scenes } from './scenes/scenes';
import { MainMenu } from './scenes/mainMenu';
import Game from './engine/game';
import { GameLoader } from './engine/gameLoader';
import { GameOver } from './scenes/gameOver';
import { Victory } from './scenes/victory';
import { Options } from './scenes/options';
import { Help } from './scenes/help';
import SizingManager from './engine/sizingManager';
import PlayerSettingsManager from './engine/progression/playerSettingsManager';

const game = new Game();
const mainMenu = new MainMenu(game);
game.add(Scenes.MAIN_MENU, mainMenu);
game.add(Scenes.GAME_OVER, new GameOver(game));
game.add(Scenes.GAME_WINDOW, new GameWindow(game));
game.add(Scenes.VICTORY, new Victory(game));
game.add(Scenes.OPTIONS, new Options(game));
game.add(Scenes.HELP, new Help(game));


let loader = new GameLoader();
Object.keys(Resources)
      .forEach(k => loader.addResource(Resources[k]));
    
game.start(loader).then(() => {
  SizingManager.initialize(game);
  PlayerSettingsManager.initialize();
  game.goToScene(Scenes.MAIN_MENU);
});
