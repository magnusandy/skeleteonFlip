import * as ex from 'excalibur';
import { Resources, Config } from '../../resources';
import { Card } from './card';
import { Vector } from 'excalibur';
import ProgressionManager from '../../engine/progressionManager';

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
        const dims = Card.calcCardDimensions(screenCenter.y*2, screenCenter.x*2)

        this.addDrawing("0", Count.sprite(Resources[0], dims.scale));
        this.addDrawing("1", Count.sprite(Resources[1], dims.scale));
        this.addDrawing("2", Count.sprite(Resources[2], dims.scale));
        this.addDrawing("3", Count.sprite(Resources[3], dims.scale));
        this.addDrawing("4", Count.sprite(Resources[4], dims.scale));
        this.addDrawing("5", Count.sprite(Resources[5], dims.scale));
        this.addDrawing("6", Count.sprite(Resources[6], dims.scale));
        this.addDrawing("7", Count.sprite(Resources[7], dims.scale));
        this.addDrawing("8", Count.sprite(Resources[8], dims.scale));
        this.addDrawing("9", Count.sprite(Resources[9], dims.scale));


        this.setWidth(dims.width);
        this.setHeight(dims.height);
        this.x = Count.calcX(type, index, screenCenter, dims.width) + dims.width;
        this.y = Count.calcY(type, index, screenCenter, dims.height) + dims.height;
        this.setCount(initialCount);
    }

    private static calcX(type: CountType, index: number, center: ex.Vector, cardWidth: number): number {
        const leftSide = center.x
            - ((ProgressionManager.get().getGridSize() / 2) * cardWidth)
            - cardWidth
            - ((ProgressionManager.get().getGridSize()+1) * Config.gridPadding) / 2;

        if (type === "row") {
            return leftSide;
        } else {
            return leftSide + cardWidth + (cardWidth * index) + (Config.gridPadding * (index+1));
        }
    }

    private static calcY(type: CountType, index: number, center: ex.Vector, cardHeight: number): number {
        const top = center.y
            + Config.menuHeight / 2
            - ((ProgressionManager.get().getGridSize()/2)* cardHeight)
            - cardHeight
            - ((ProgressionManager.get().getGridSize()+1) * Config.gridPadding)/2;

            if(type === "col") {
                return top;
            } else {
                return top + cardHeight + (cardHeight * index) + (Config.gridPadding * (index + 1))
            }
    }

    private static sprite(texture: ex.Texture, scale: Vector): ex.Sprite {
        const sprite: ex.Sprite = texture.asSprite();
        sprite.scale = scale;
        return sprite;
    }

    public setCount(count: number): Count {
        this.setDrawing(`${count}`);
        return this;
    }
}