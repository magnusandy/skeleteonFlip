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
const zero = require('./images/numbers/0.png');
const one = require('./images/numbers/1.png');
const two = require('./images/numbers/2.png');
const three = require('./images/numbers/3.png');
const four = require('./images/numbers/4.png');
const five = require('./images/numbers/5.png');
const six = require('./images/numbers/6.png');
const seven = require('./images/numbers/7.png');
const eight = require('./images/numbers/8.png');
const nine = require('./images/numbers/9.png');
const uiSword = require('./images/ui/sword.png');
const uiHeart = require('./images/ui/heart.png');
const victory = require('./images/victory.png');
const cardSound = require('./sounds/card.wav');
const potionSound = require('./sounds/potion.wav');
const boneSound = require('./sounds/bone.wav');
const swordSound = require('./sounds/sword.wav');
const laughSound = require('./sounds/laugh.ogg');
const coinSound = require('./sounds/coin.wav');

const Resources = {
    victory: new ex.Texture(victory),
    gameOver: new ex.Texture(gameOverImg),
    title: new ex.Texture(title),
    sword: new ex.Texture(sword),
    skull: new ex.Texture(skull),
    potion: new ex.Texture(potion),
    coin: new ex.Texture(coin),
    card: new ex.Texture(card),
    startMenu: new ex.Texture(startMenu),
    optionMenu: new ex.Texture(optionMenu),    
    0: new ex.Texture(zero), 
    1: new ex.Texture(one), 
    2: new ex.Texture(two), 
    3: new ex.Texture(three), 
    4: new ex.Texture(four), 
    5: new ex.Texture(five), 
    6: new ex.Texture(six), 
    7: new ex.Texture(seven), 
    8: new ex.Texture(eight), 
    9: new ex.Texture(nine), 
    uiSword: new ex.Texture(uiSword),
    uiHeart: new ex.Texture(uiHeart),
    cardSound: new ex.Sound(cardSound),
    boneSound: new ex.Sound(boneSound),
    coinSound: new ex.Sound(coinSound),
    laughSound: new ex.Sound(laughSound),
    potionSound: new ex.Sound(potionSound),
    swordSound: new ex.Sound(swordSound),
    
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
    buffDifficultyFactor: 1, //easy 0, med 1, hard 2
    backgroundColor: Color.Gray,
};

export { Resources, Config, uiHeart}
