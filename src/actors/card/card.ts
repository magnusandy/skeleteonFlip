import * as ex from 'excalibur';
import { Config, Resources } from '../../resources';
import { Supplier } from 'java8script'
import { Vector, Sprite } from 'excalibur';
import { Darken } from 'excalibur/dist/Drawing/SpriteEffects';
import SoundManager from '../../engine/soundManager';
import ProgressionManager from '../../engine/progressionManager';
import { IDimensions } from '../../engine/helpers';
import MobileManager from '../../engine/mobileManager';

export enum CardType {
    COIN = "coin",
    SKELETON = "skeleton",
    POTION = "potion",
    ATTACK = "attack",
}

interface ICard {
    type: () => CardType;
}

export class Card extends ex.Actor implements ICard {

    private cardType: CardType;
    private passedInOnClick: Supplier<void>;
    private row: number;
    private col: number;
    private flipped: boolean;
    private texture: ex.Texture;
    private baseSprite: Sprite;

    public constructor(screenCenter: ex.Vector, col: number, row: number, onClick: Supplier<void>, faceColor: ex.Color, type: CardType, texture: ex.Texture) {
        super();
        this.cardType = type;
        this.passedInOnClick = onClick;
        this.row = row;
        this.col = col;
        this.flipped = false;
        this.texture = texture;
        const dims: IDimensions = Card.calcCardDimensions(screenCenter.y * 2, screenCenter.x * 2)
        this.baseSprite = Card.sprite(Resources.card, dims.scale);
        this.addDrawing("base", this.baseSprite);
        this.addDrawing("flip", Card.sprite(this.texture, dims.scale));
        this.setWidth(dims.width);
        this.setHeight(dims.height);
        this.on("pointerup", this.fullOnClick);
        this.on("pointerenter", this.onEnter);
        this.on("pointerleave", this.onExit);
        this.x = Card.calcX(col, dims.width, screenCenter) + dims.width; //adding on padding for drawing from center of card
        this.y = Card.calcY(dims.height, row, screenCenter) + dims.height;
    }

    private onEnter: () => void = () => {
        this.baseSprite.clearEffects();
        this.baseSprite.addEffect(new Darken(0.2));
    }

    private onExit: () => void = () => {
        this.baseSprite.clearEffects();
    }

    private static calcX(col: number, cardWidth: number, center: ex.Vector): number {
        const leftSide = center.x
            - ((ProgressionManager.get().getGridSize() / 2) * cardWidth)
            - ((ProgressionManager.get().getGridSize() - 1) * Config.gridPadding) / 2;

        return leftSide + (cardWidth * col) + (Config.gridPadding * col)
    }

    private static calcY(cardHeight: number, row: number, center: ex.Vector) {
        const top = center.y // center of screen
            + (MobileManager.get().getMenuHeight()/2) //adjust for menu size
            - ((ProgressionManager.get().getGridSize() / 2) * cardHeight)
            - ((ProgressionManager.get().getGridSize() - 1) * Config.gridPadding) / 2;

        return top + (cardHeight * row) + (Config.gridPadding * row);
    }

    public static calcCardDimensions(screenHeight: number, screenWidth: number): IDimensions {
        const { height, width } = Resources.card;
        const usableHeight = screenHeight - MobileManager.get().getMenuHeight();
        const maxHeight = Card.calcMaxCardHeight(usableHeight);
        const maxWidth = Card.calcMaxCardWidth(screenWidth);
        const scaleByWidth = maxWidth / width;

        if ((scaleByWidth * (height * (ProgressionManager.get().getGridSize() + 1))) > usableHeight) {
            // using width as the scale base pushes height out of the screen
            const scaleByHeight = maxHeight / height;
            return {
                width: width * scaleByHeight,
                height: maxHeight,
                scale: new Vector(scaleByHeight, scaleByHeight)
            }
        } else {
            return {
                width: maxWidth,
                height: height * scaleByWidth,
                scale: new Vector(scaleByWidth, scaleByWidth)
            }
        }
    }

    private static calcMaxCardHeight(screenHeight: number): number {
        const workableScreenHeight = screenHeight * 0.95;
        return (workableScreenHeight / (ProgressionManager.get().getGridSize() + 1)) - Config.gridPadding;
    }

    private static calcMaxCardWidth(screenWidth: number): number {
        const workableWidth = screenWidth * 0.95;
        return (workableWidth / (ProgressionManager.get().getGridSize() + 1)) - Config.gridPadding;
    }

    private static sprite(texture: ex.Texture, scale: Vector): ex.Sprite {
        const sprite: ex.Sprite = new Sprite(texture, 0, 0, texture.width, texture.height);
        sprite.scale = scale;
        return sprite;
    }

    private fullOnClick(): void {
        if (!this.flipped) {
            this.flipped = true;
            this.setDrawing("flip");
            SoundManager.get().playSoundInterrupt(
                Resources.cardSound,
                this.playSound
            );
            this.passedInOnClick();
        }
    }
    public type(): CardType {
        return this.cardType;
    }

    private playSound: () => void = () => {
        let sound: ex.Sound;
        if (this.cardType === CardType.SKELETON) {
            sound = Resources.boneSound;
        } else if (this.cardType === CardType.ATTACK) {
            sound = Resources.swordSound;
        } else if (this.cardType === CardType.COIN) {
            sound = Resources.coinSound;
        } else if (this.cardType === CardType.POTION) {
            sound = Resources.potionSound;
        }
        SoundManager.get().playSoundInterrupt(sound);
    }

    public getRow(): number {
        return this.row;
    }

    public getCol(): number {
        return this.col;
    }

    public isFlipped(): boolean {
        return this.flipped;
    }

    public static skeleton(screenCenter: ex.Vector, row: number, col: number, onClick: Supplier<void>): Card {
        return new Card(screenCenter, col, row, onClick, ex.Color.White, CardType.SKELETON, Resources.skull);
    }

    public static potion(screenCenter: ex.Vector, row: number, col: number, onClick: Supplier<void>): Card {
        return new Card(screenCenter, col, row, onClick, ex.Color.Red, CardType.POTION, Resources.potion);
    }

    public static attack(screenCenter: ex.Vector, row: number, col: number, onClick: Supplier<void>): Card {
        return new Card(screenCenter, col, row, onClick, ex.Color.Gray, CardType.ATTACK, Resources.sword);
    }

    public static coin(screenCenter: ex.Vector, row: number, col: number, onClick: Supplier<void>): Card {
        return new Card(screenCenter, col, row, onClick, ex.Color.Yellow, CardType.COIN, Resources.coin);
    }
}

