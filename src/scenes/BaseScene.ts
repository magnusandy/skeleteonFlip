import { Scene, Engine, Axis, Texture } from "excalibur";
import BackgroundManager from "../engine/backgroundManager";
import { Config } from "../resources";
import ScrollBar from "../actors/bars/scrollBar";
import { IDimensions } from "../engine/helpers";
import ButtonBase from "../actors/bars/buttonBase";

export default class BaseScene extends Scene {

    public scrollBar: ScrollBar;
    public engine: Engine;

    constructor(engine: Engine) {
        super(engine);
        this.engine = engine;
        this.scrollBar = new ScrollBar(engine);
        this.add(this.scrollBar);//for some reason adding in the initialize makes the drag stop working
    }

    public setBackround(bottomOfBottomElement: number) {
        if (bottomOfBottomElement > this.engine.drawHeight) {
            this.addTileMap(BackgroundManager.getCustomTileMap(this.engine.drawWidth, bottomOfBottomElement + Config.optionPadding));//need to draw to fit the whole canvas rather than just the screen 
        } else {
            this.addTileMap(BackgroundManager.getDefaultTileMap(this.engine));
        }
    }

    public initScroll(bottomOfBottomElement: number) {
        this.scrollBar.setScrollBottom(this.engine.drawHeight / 2 + (bottomOfBottomElement - this.engine.drawHeight) + Config.optionPadding)
        this.camera.strategy.lockToActorAxis(this.scrollBar, Axis.Y)
    }

    public createButton(dims: IDimensions, x: number, y: number, texture: Texture, onClick: () => void): ButtonBase {
        const button = new ButtonBase(texture, onClick);
        button.x = x
        button.y = y
        button.scale = dims.scale;
        button.setHeight(dims.height);
        button.setWidth(dims.width);
        return button;
    }
}