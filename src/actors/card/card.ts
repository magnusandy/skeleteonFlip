import * as ex from 'excalibur';
import { Config, Resources } from '../../resources';
import { Supplier } from 'java8script'
import { Vector } from 'excalibur';

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

    public constructor(screenCenter: ex.Vector, col: number, row: number, onClick: Supplier<void>, faceColor: ex.Color, type: CardType, texture: ex.Texture) {
        super();
        this.cardType = type;
        this.passedInOnClick = onClick;
        this.row = row;
        this.col = col;
        this.flipped = false;
        this.texture = texture;
        this.addDrawing("base", Card.sprite(Resources.card));
        this.addDrawing("flip", Card.sprite(this.texture));
        this.setWidth(Config.cardWidth);
        this.setHeight(Config.cardHeight);
        //this.anchor = new ex.Vector(0,0);
        this.on("pointerdown", this.fullOnClick);
        this.x = Card.calcX(col, row, screenCenter) + Config.cardWidth/2; //adding on padding for drawing from center of card
        this.y = Card.calcY(col, row, screenCenter) + Config.cardHeight/2;
    }

    private static calcX(col: number, row: number, center: ex.Vector): number {
        const leftSide = center.x
            - ((Config.gridSize / 2) * Config.cardWidth)
            - ((Config.gridSize - 1) * Config.gridPadding) / 2;

        return leftSide + (Config.cardWidth * col) + (Config.gridPadding * col)

    }

    private static calcY(col: number, row: number, center: ex.Vector) {
        const top = center.y
            - ((Config.gridSize / 2) * Config.cardHeight)
            - ((Config.gridSize - 1) * Config.gridPadding) / 2;

        return top + (Config.cardHeight * row) + (Config.gridPadding * row);
    }

    private static sprite(texture: ex.Texture): ex.Sprite {
        const sprite: ex.Sprite = texture.asSprite();
        sprite.scale = new Vector(0.5, 0.5);
        return sprite;
    }

    private fullOnClick(): void {
        if (!this.flipped) {
            this.flipped = true;
            this.setDrawing("flip");
            Resources.cardSound.play().then(this.playSound)
            
            this.passedInOnClick();
        }
    }
    public type(): CardType {
        return this.cardType;
    }

    private playSound: ()=>void = () =>  {
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
        sound.play(0.3);
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

