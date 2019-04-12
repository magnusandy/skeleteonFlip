import { Actor, Sprite, EventTypes } from "excalibur";
import { Supplier } from "java8script";
import { Darken } from "excalibur/dist/Drawing/SpriteEffects";
import SoundManager from "../../engine/soundManager";
import { Resources } from "../../resources";
import { safePointerUp } from "../../engine/helpers";

export default class ButtonBase extends Actor {
    private sprite: Sprite;
    public drawHeight: number;
    private disabled: boolean;

    public constructor(texture: ex.Texture, onClick: Supplier<void>, disabled?: boolean) {
        super();
        this.disabled = disabled ? disabled : false;
        this.sprite = new Sprite(texture, 0, 0, texture.width, texture.height);
        this.addDrawing(this.sprite);
        this.on("pointerdown", this.onDown);
        this.on(EventTypes.PointerUp, this.onClickWrapper(onClick));
        this.on("pointerenter", this.onEnter);
        this.on("pointerleave", this.onExit);
    }

    public getSprite():Sprite {
        return this.sprite;
    }

    private onClickWrapper(onClick: Supplier<void>) {
        return safePointerUp(() => {
            if (!this.disabled) {
                this.sprite.clearEffects();
                SoundManager.get().playSoundInterrupt(Resources.buttonSound);
                onClick();
            }
        });
    }

    private onDown: () => void = () => {
        if (!this.disabled) {
            this.sprite.clearEffects();
            this.sprite.addEffect(new Darken(0.2))
        }

    }

    private onEnter: () => void = () => {
        if (!this.disabled) {
            this.sprite.clearEffects();
            this.sprite.addEffect(new Darken(0.1))
        }

    }

    private onExit: () => void = () => {
        if (!this.disabled) {
            this.sprite.clearEffects();
        }
    }

    public setDisabled(disabled: boolean) {
        this.disabled = disabled;
    }

}