import { Texture, Sound } from "excalibur";
import  Upgrade from "./actors/upgrades/upgrade";

const reqImg = (imgpath: string) => require(`./images/${imgpath}`);

const sword = reqImg('sword.png');
const skull = reqImg('skull.png');
const potion = reqImg('potion.png');
const coin = reqImg('coin.png');
const card = reqImg('card.png');
const startMenu = reqImg('menu/start.png');
const optionMenu = reqImg('menu/options.png');
const helpMenu = reqImg('menu/help.png');
const cardsMenu = reqImg('menu/cards.png');
const introMenu = reqImg('menu/intro.png');
const creditsMenu = reqImg('menu/credits.png');
const playingMenu = reqImg('menu/playing.png');
const confirmMenu = reqImg('menu/confirm.png');
const nextMenu = reqImg('menu/next.png');
const menuMenu = reqImg('menu/menu.png');
const upgradeMenu = reqImg('menu/upgrade.png');

const title = reqImg('title.png');
const gameOverImg = reqImg('GameOver.png');
const zero = reqImg('numbers/0.png');
const one = reqImg('numbers/1.png');
const two = reqImg('numbers/2.png');
const three = reqImg('numbers/3.png');
const four = reqImg('numbers/4.png');
const five = reqImg('numbers/5.png');
const six = reqImg('numbers/6.png');
const seven = reqImg('numbers/7.png');
const eight = reqImg('numbers/8.png');
const nine = reqImg('numbers/9.png');

const uiSword = reqImg('ui/sword.png');
const uiHeart = reqImg('ui/heart.png');
const uiCoins = reqImg('ui/coinPile.png');
const uiLeft = reqImg('ui/left.png');
const uiRight = reqImg('ui/right.png');
const uiX = reqImg('ui/x.png');
const uiBlank = reqImg('ui/blank.png');
const uiScroll = reqImg('ui/scroll.png');

const optionTitle = reqImg('optionTitle.png');
const helpTitle = reqImg('helpTitle.png');
const upgradeTitle = reqImg('upgradesTitle.png');

const gridTile = reqImg('upgrades/grid.png');
const difficultyTile = reqImg('upgrades/difficulty.png');

const fontMono = require('./fonts/myMono.png');

const victory = reqImg('victory.png');
const cardSound = require('./sounds/card.wav');
const potionSound = require('./sounds/potion.wav');
const boneSound = require('./sounds/bone.wav');
const swordSound = require('./sounds/sword.wav');
const laughSound = require('./sounds/laugh.ogg');
const coinSound = require('./sounds/coin.wav');
const backgroundMusic = require('./sounds/background.wav');
const victorySound = require('./sounds/victory.mp3');
const buttonSound = require('./sounds/button.wav');

const backgroundTile = reqImg('background.png');

const Resources = {
    victory: new Texture(victory),
    gameOver: new Texture(gameOverImg),
    title: new Texture(title),
    sword: new Texture(sword),
    skull: new Texture(skull),
    potion: new Texture(potion),
    coin: new Texture(coin),
    card: new Texture(card),

    startMenu: new Texture(startMenu),
    optionMenu: new Texture(optionMenu),
    helpMenu: new Texture(helpMenu),
    cardMenu: new Texture(cardsMenu),
    introMenu: new Texture(introMenu),
    creditsMenu: new Texture(creditsMenu),
    playingMenu: new Texture(playingMenu),
    confirmMenu: new Texture(confirmMenu),
    nextMenu: new Texture(nextMenu),
    menuMenu: new Texture(menuMenu),
    upgradeMenu: new Texture(upgradeMenu),

    optionTitle: new Texture(optionTitle),
    helpTitle: new Texture(helpTitle),
    backgroundTile: new Texture(backgroundTile),
    upgradeTitle: new Texture(upgradeTitle),

    0: new Texture(zero),
    1: new Texture(one),
    2: new Texture(two),
    3: new Texture(three),
    4: new Texture(four),
    5: new Texture(five),
    6: new Texture(six),
    7: new Texture(seven),
    8: new Texture(eight),
    9: new Texture(nine),

    uiSword: new Texture(uiSword),
    uiHeart: new Texture(uiHeart),
    uiLeft: new Texture(uiLeft),
    uiRight: new Texture(uiRight),
    uiX: new Texture(uiX),
    uiBlank: new Texture(uiBlank),
    uiCoins: new Texture(uiCoins),
    uiScroll: new Texture(uiScroll),

    gridTile: new Texture(gridTile),
    difficultyTile: new Texture(difficultyTile),

    myMono: new Texture(fontMono),

    cardSound: new Sound(cardSound),
    boneSound: new Sound(boneSound),
    coinSound: new Sound(coinSound),
    laughSound: new Sound(laughSound),
    potionSound: new Sound(potionSound),
    swordSound: new Sound(swordSound),
    victorySound: new Sound(victorySound),
    buttonSound: new Sound(buttonSound),
    backgroundMusic: new Sound(backgroundMusic),
}

const Config = {
    maxHealth: 3,
    maxAttack: 2,
    gridPadding: 4,
    backgroundColor: "#dddddd",
    exitButtonSize: 50,
    uiBigSize: 50,
    optionPadding: 30,
};

export const Upgrades = {
    gridSize: Upgrade.create({
        title: "Grid Size",
        description: "Unlock bigger grids to increase the challenge. This will allow story mode to go to a higher max level, as well as allow the larger sizes to be chosen for practice.",
        prices: [
            {level: 1, price: 10},
            {level: 2, price: 20},
            {level: 3, price: 30},
            {level: 4, price: 40},
            {level: 5, price: 50},
            {level: 6, price: 60},
            {level: 7, price: 70},
            {level: 8, price: 80},
            {level: 9, price: 90}
        ]
    }),
    difficulty: Upgrade.create({
        title: "Difficulty",
        description: "Things getting routine? Upgrade the difficulty to increase the challenge. Higher difficulties mean less room for error, more skeletons, but more rewards!",
        prices: [
            {level: 1, price: 10},
            {level: 2, price: 20},
            {level: 3, price: 30},
            {level: 4, price: 40},
            {level: 5, price: 50},
        ]
    }),
}

export { Resources, Config, uiHeart }
