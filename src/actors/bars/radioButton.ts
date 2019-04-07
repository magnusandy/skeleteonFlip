import { Sprite, Actor, Vector, SpriteFont } from "excalibur";
import { Resources } from "../../resources";
import { Darken } from "excalibur/dist/Drawing/SpriteEffects";
import { Supplier } from "java8script";
import SoundManager from "../../engine/soundManager";

export default class RadioButton extends Actor {
    private checked: boolean;
    private checkedSprite: Sprite;
    private uncheckedSprite: Sprite;

    constructor(size: number, x: number, y: number, defaultValue: boolean) {
        super();
        this.checked = defaultValue;
        this.checkedSprite = new Sprite(Resources.uiX, 0, 0, Resources.uiX.width, Resources.uiX.height);
        this.uncheckedSprite = new Sprite(Resources.uiBlank, 0, 0, Resources.uiBlank.width, Resources.uiBlank.height);
        this.scale = new Vector(size / Resources.uiX.width, size / Resources.uiX.height);
        this.setHeight(size);
        this.setWidth(size);
        this.x = x;
        this.y = y;

        //get drawing ready
        this.addDrawing("checked", this.checkedSprite);
        this.addDrawing("unchecked", this.uncheckedSprite);
        if (this.checked) {
            this.setDrawing("checked");
        } else {
            this.setDrawing("unchecked");
        }
        this.on("pointerdown", this.onDown);
        this.on("pointerenter", this.onEnter);
        this.on("pointerleave", this.onExit);
        this.on("pointerup", this.onClickWrapper(this.toggleButton))
    }

    public isChecked(): boolean {
        return this.checked;
    }

    private onClickWrapper(onClick: Supplier<void>) {
        return (event?: any) => {
            if (event.ev.type === "pointerup") {
                //this is kinda nasty need to filter out the duplicate touch events, only accept the regular pointer up ones
                this.currentSprite().clearEffects();
                SoundManager.get().playSoundInterrupt(Resources.buttonSound)
                onClick();
                this.onEnter();
            } else {
            }
        }
    }

    private currentSprite(): Sprite {
        return this.checked ? this.checkedSprite : this.uncheckedSprite;
    }

    private onDown: () => void = () => {
        this.currentSprite().clearEffects();
        this.currentSprite().addEffect(new Darken(0.2))
    }

    private onEnter: () => void = () => {
        this.currentSprite().clearEffects();
        this.currentSprite().addEffect(new Darken(0.1))
    }

    private onExit: () => void = () => {
        this.currentSprite().clearEffects();
    }


    private toggleButton = () => {
        this.checked = !this.checked;
        if (this.checked) {
            this.setDrawing("checked");
        } else {
            this.setDrawing("unchecked");
        }
    }

}