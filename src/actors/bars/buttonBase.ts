import { Actor, Sprite, EventTypes } from "excalibur";
import { Supplier } from "java8script";
import { Darken } from "excalibur/dist/Drawing/SpriteEffects";

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
        return (event?: any) => {
            if(event.ev.type === "pointerup") {
                //this is kinda nasty need to filter out the duplicate touch events, only accept the regular pointer up ones
                this.sprite.clearEffects();
                onClick();
            } else {
            }
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