import { Actor, Label, Sprite, Vector, BaseAlign, TextAlign, Color } from "excalibur";
import { Resources, Config } from "../../resources";
import SizingManager from "../../engine/managers/sizingManager";
import FontManager from "../../engine/managers/fontManager";

export default class CoinCount {

    private coinCount: number;
    private coinIcon: Actor;
    private countLabel: Label;

    private constructor(currentCount: number, countIcon: Actor, countLabel: Label) {
        this.coinCount = currentCount;
        this.coinIcon = countIcon;
        this.countLabel = countLabel;
    }

    public static create(x: number, y: number, currentCount: number): CoinCount {
        const coinActor = CoinCount.createCoinIcon(x, y);
        return new CoinCount(
            currentCount,
            coinActor,
            CoinCount.createCountLabel(currentCount, coinActor.getRight() + Config.gridPadding, y),
        );
    }

    public getCoinCount(): number {
        return this.coinCount;
    }

    public addToCoinCount(toAdd: number): void {
        this.coinCount = this.coinCount + toAdd;
        this.countLabel.text = `${this.coinCount}`;
    }

    public drawables(): Actor[] {
        return [
            this.coinIcon,
            this.countLabel,
        ];
    }

    private static createCoinIcon(x: number, y: number): Actor {
        const texture = Resources.uiCoins;
        const sprite = new Sprite(texture, 0, 0, texture.width, texture.height);
        const scale = new Vector(SizingManager.get().getUIItemSize() / texture.width, SizingManager.get().getUIItemSize() / texture.height);
        const actor = new Actor(x, y, texture.width, texture.height);
        actor.addDrawing(sprite);
        actor.scale = scale;
        return actor;
    }

    private static createCountLabel(currentCount: number, x: number, y: number): Label {
        const label = new Label(
            `${currentCount}`,
            x,
            y,
            null,
            FontManager.get().getMono()
        );

        label.fontSize = SizingManager.get().getUIItemSize() * 0.7;
        label.baseAlign = BaseAlign.Middle;
        label.textAlign = TextAlign.Left;
        label.color = Color.fromHex("#958a2d");
        return label;
    }
}