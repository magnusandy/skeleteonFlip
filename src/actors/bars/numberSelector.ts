import { Actor, Label, Vector, TextAlign, BaseAlign } from "excalibur";
import { Resources, Config } from "../../resources";
import ButtonBase from "./buttonBase";
import FontManager from "../../engine/fontManager";

export default class NumberSelector {
    private min: number;
    private max: number;
    private current: number;
    private fontSize: number;
    private labelText: string;

    private leftButton: Actor;
    private rightButton: Actor;
    private numberLabel: Label;
    private topLabel: Label;

    public constructor(label: string, min: number, max: number, current: number, x: number, y: number, fontSize: number) {
        this.labelText = label;
        this.min = min;
        this.max = max;
        this.current = current;
        this.fontSize = fontSize;
        
        //top text
        this.topLabel = new Label(this.labelText, x, y-Config.gridPadding, null, FontManager.get().getMono());
        this.topLabel.fontSize = this.fontSize;
        this.topLabel.baseAlign = BaseAlign.Middle;
        this.topLabel.textAlign = TextAlign.Center;
        //central Number Label
        this.numberLabel = new Label(`${current}`, x, y+fontSize, null, FontManager.get().getMono());
        //this.numberLabel.anchor = new Vector(1, 1);
        this.numberLabel.fontSize = this.fontSize;
        this.numberLabel.baseAlign = BaseAlign.Middle;
        this.numberLabel.textAlign = TextAlign.Center;

        //left button
        this.leftButton = new ButtonBase(Resources.uiLeft, () => this.addBy(-1));
        this.leftButton.x = x - this.fontSize*1.5
        this.leftButton.y = y + fontSize;
        this.leftButton.scale = new Vector(this.fontSize/Resources.uiLeft.width, this.fontSize/Resources.uiLeft.height);
        this.leftButton.setHeight(this.fontSize);
        this.leftButton.setWidth(this.fontSize);
        
        //right button
        this.rightButton = new ButtonBase(Resources.uiRight, () => this.addBy(1));
        this.rightButton.x = x + this.fontSize*1.5;
        this.rightButton.y = y + fontSize;
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

    public setCurrent(newCurrent: number): void {
        this.current = newCurrent;
        this.numberLabel.text = `${newCurrent}`;
    }

    public getDrawables(): Actor[] {
        return [
            this.leftButton, 
            this.rightButton,
            this.numberLabel,
            this.topLabel
        ];
    }
}