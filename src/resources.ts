import * as ex from 'excalibur';
import { Color } from 'excalibur';
const sword = require('./images/sword.png');
const skull = require('./images/skull.png');
const potion = require('./images/potion.png');
const coin = require('./images/coin.png');
const card = require('./images/card.png');
const startMenu = require('./images/startMenu.png');
const optionMenu = require('./images/optionsMenu.png');
const title = require('./images/title.png');
const gameOverImg = require('./images/gameOver.png');

const Resources = {
    gameOver: new ex.Texture(gameOverImg),
    title: new ex.Texture(title),
    sword: new ex.Texture(sword),
    skull: new ex.Texture(skull),
    potion: new ex.Texture(potion),
    coin: new ex.Texture(coin),
    card: new ex.Texture(card),
    startMenu: new ex.Texture(startMenu),
    optionMenu: new ex.Texture(optionMenu),     
}

const Config = {
    maxHealth: 3,
    maxAttack: 2,
    gridPadding: 8,
    gridSize: 4,
    gridOffset: 100,
    cardHeight: 90,
    cardWidth: 75,
    skeletonDifficultyFactor: 2.0, //easy 3 (30%), medium 2.5 (40%), hard 2 (50%)
    buffDifficultyFactor: 2, //easy 0, med 1, hard 2
    backgroundColor: Color.Gray,
};

export { Resources, Config }
