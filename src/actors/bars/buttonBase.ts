import { Actor, Sprite, EventTypes } from "excalibur";
import { Supplier } from "java8script";
import { Darken } from "excalibur/dist/Drawing/SpriteEffects";
import SoundManager from "../../engine/soundManager";
import { Resources } from "../../resources";
import { safePointerUp } from "../../engine/helpers";

export default class ButtonBase extends Actor {
    private sprite: Sprite;
    public drawHeight: number;

    public constructor(texture: ex.Texture, onClick: Supplier<void>) {
        super();
        this.sprite = new Sprite(texture, 0, 0, texture.width, texture.height);
        this.addDrawing(this.sprite);
        this.on("pointerdown", this.onDown);
        this.on(EventTypes.PointerUp, this.onClickWrapper(onClick));
        this.on("pointerenter", this.onEnter);
        this.on("pointerleave", this.onExit);
    }

    private onClickWrapper(onClick: Supplier<void>) {
        return  safePointerUp(() => {
            this.sprite.clearEffects();
            SoundManager.get().playSoundInterrupt(Resources.buttonSound);
            onClick();
        });
    }

    private onDown: () => void = () => {
        this.sprite.clearEffects();
        this.sprite.addEffect(new Darken(0.2))
    }

    private onEnter: () => void = () => {
        this.sprite.clearEffects();
        this.sprite.addEffect(new Darken(0.1))
    }

    private onExit: () => void = () => {
        this.sprite.clearEffects();
    }

}