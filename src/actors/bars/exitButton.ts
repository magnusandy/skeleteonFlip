import ButtonBase from "./buttonBase";
import { Vector, Engine } from "excalibur";
import { Resources, Config } from "../../resources";
import { Supplier } from "java8script";

export class ExitButton extends ButtonBase {

    public constructor(engine: Engine, onExit: Supplier<void>) {
        const texture = Resources.uiX;
        super(texture, onExit);
        this.scale = new Vector(Config.exitButtonSize / texture.width, Config.exitButtonSize / texture.height);
        this.setHeight(Config.exitButtonSize);
        this.setWidth(Config.exitButtonSize);
        this.x = engine.drawWidth - Config.exitButtonSize / 2 - Config.gridPadding;
        this.y = Config.exitButtonSize / 2 + Config.gridPadding;
    }
}