import * as ex from 'excalibur';
import { Resources, Config } from '../../resources';

type CountType = 'col' | 'row';

export default class Count extends ex.Actor {

    private type: CountType;
    private index: number;
    private screenCenter: ex.Vector;

    public constructor(type: CountType, index: number, screenCenter: ex.Vector, initialCount: number) {
        super();
        this.type = type;
        this.index = index;
        this.screenCenter = screenCenter;
        this.addDrawing("0", Count.sprite(Resources[0]));
        this.addDrawing("1", Count.sprite(Resources[1]));
        this.addDrawing("2", Count.sprite(Resources[2]));
        this.addDrawing("3", Count.sprite(Resources[3]));
        this.addDrawing("4", Count.sprite(Resources[4]));
        this.addDrawing("5", Count.sprite(Resources[5]));
        this.addDrawing("6", Count.sprite(Resources[6]));
        this.addDrawing("7", Count.sprite(Resources[7]));
        this.addDrawing("8", Count.sprite(Resources[8]));
        this.addDrawing("9", Count.sprite(Resources[9]));

        this.setWidth(Config.cardWidth);
        this.setHeight(Config.cardHeight);
        this.x = Count.calcX(type, index, screenCenter)
        this.y = Count.calcY(type, index, screenCenter)
        this.setCount(initialCount);
    }

    private static calcX(type: CountType, index: number, center: ex.Vector): number {
        const leftSide = center.x
            - ((Config.gridSize / 2) * Config.cardWidth)
            - Config.cardWidth
            - ((Config.gridSize+1) * Config.gridPadding) / 2;

        if (type === "row") {
            return leftSide;
        } else {
            return leftSide + Config.cardWidth + (Config.cardWidth * index) + (Config.gridPadding * (index+1));
        }
    }

    private static calcY(type: CountType, index: number, center: ex.Vector): number {
        const top = center.y
            - ((Config.gridSize/2)* Config.cardHeight)
            - Config.cardHeight
            - ((Config.gridSize+1) * Config.gridPadding)/2;

            if(type === "col") {
                return top;
            } else {
                return top + Config.cardHeight + (Config.cardHeight * index) + (Config.gridPadding * (index + 1))
            }
    }

    private static sprite(texture: ex.Texture): ex.Sprite {
        const sprite: ex.Sprite = texture.asSprite();
        sprite.scale = new ex.Vector(0.5, 0.5);
        return sprite;
    }

    public setCount(count: number): Count {
        this.setDrawing(`${count}`);
        return this;
    }
}