import { Actor, Sprite, Vector } from "excalibur";
import { Supplier } from "java8script";
import { Darken } from "excalibur/dist/Drawing/SpriteEffects";

export default class ButtonBase extends Actor {
    private sprite: Sprite;
    public drawHeight: number;

    public constructor(texture: ex.Texture, onClick: Supplier<void>) {
        super();
        this.addDrawing(texture);
        this.sprite = texture.asSprite();
        this.on("pointerdown", this.onDown);
        this.on("pointerup", this.onClickWrapper(onClick));
        this.on("pointerenter", this.onEnter);
        this.on("pointerleave", this.onExit);
    }

    private onClickWrapper(onClick: Supplier<void>): Supplier<void> {
        return () => {
            this.sprite.clearEffects();
            onClick();
        }
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