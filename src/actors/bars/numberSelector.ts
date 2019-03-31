import { Actor, Label, Vector, SpriteFont, TextAlign, BaseAlign } from "excalibur";
import { Resources, uiHeart } from "../../resources";
import ButtonBase from "./buttonBase";

export default class NumberSelector {
    private min: number;
    private max: number;
    private current: number;
    private fontSize: number;

    private leftButton: Actor;
    private rightButton: Actor;
    private numberLabel: Label;

    public constructor(min: number, max: number, current: number, x: number, y: number, fontSize: number) {
        this.min = min;
        this.max = max;
        this.current = current;
        this.fontSize = fontSize;

        //central Number Label
        const font = new SpriteFont(Resources.fontNumbers, '0123456789 ', true, 11, 1, 27, 32);
        this.numberLabel = new Label(`${current}`, x, y, null, font);
        //this.numberLabel.anchor = new Vector(1, 1);
        this.numberLabel.fontSize = this.fontSize;
        this.numberLabel.baseAlign = BaseAlign.Middle;
        this.numberLabel.textAlign = TextAlign.Center;

        //left button
        this.leftButton = new ButtonBase(Resources.uiLeft, () => this.addBy(-1));
        this.leftButton.x = x - this.fontSize
        this.leftButton.y = y;
        this.leftButton.scale = new Vector(this.fontSize/Resources.uiLeft.width, this.fontSize/Resources.uiLeft.height);
        this.leftButton.setHeight(this.fontSize);
        this.leftButton.setWidth(this.fontSize);
        

        //right button
        this.rightButton = new ButtonBase(Resources.uiRight, () => this.addBy(1));
        this.rightButton.x = x + this.fontSize;
        this.rightButton.y = y;
        this.rightButton.scale = new Vector(this.fontSize/Resources.uiRight.width, this.fontSize/Resources.uiRight.height);
        this.rightButton.setHeight(this.fontSize);
        this.rightButton.setWidth(this.fontSize);
    }

    //add can be negative
    private addBy(add: number): void {
        const nextCurrent = this.current + add;
        if(this.min <= nextCurrent && this.max >= nextCurrent) {
            this.current = nextCurrent;
            this.numberLabel.text = `${nextCurrent}`;
        }
    }

    public getCurrent(): number {
        return this.current;
    }

    public getDrawables(): Actor[] {
        return [
            this.leftButton, 
            this.rightButton,
            this.numberLabel
        ];
    }
}