import { Actor, Vector, Sprite, Texture } from "excalibur";
import { Config } from "../../resources";
import MobileManager from "../../engine/mobileManager";

export default class StatTracker extends Actor {
    private enabled: boolean;
    public sprite: Sprite;
    private static DISABLED_OPACITY: number = 0.50;

    public constructor(enabled: boolean, x: number, y: number, texture: Texture) {
        super();
        this.x = x;
        this.y = y;
        this.sprite = new Sprite(texture, 0, 0, texture.width, texture.height );
        this.scale = new Vector(MobileManager.get().getUIItemSize()/texture.width, MobileManager.get().getUIItemSize()/texture.height);
        this.addDrawing(this.sprite);
        this.setEnabled(enabled);
        
    }

    public setEnabled(enabled: boolean): StatTracker {
        this.enabled = enabled;
        this.sprite.clearEffects();
        if(enabled) {
            this.sprite.opacity(1);
        } else {
            this.sprite.opacity(StatTracker.DISABLED_OPACITY);
        }
        return this;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }
}