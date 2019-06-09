import { Actor, Label, Vector, TextAlign, BaseAlign, Color, Sprite } from "excalibur";
import { Resources, Config } from "../../resources";
import ButtonBase from "./buttonBase";
import FontManager from "../../engine/managers/fontManager";
import { Colorize } from "excalibur/dist/Drawing/SpriteEffects";
import { Stream } from "java8script";

export default class NumberSelector {
    private min: number;
    private max: number;
    private current: number;
    private fontSize: number;
    private labelText: string;

    private leftButtonSprite:Sprite;
    private leftButton: ButtonBase;
    private rightButtonSprite: Sprite;
    private rightButton: ButtonBase;
    private numberLabel: Label;
    private topLabel: Label;

    public constructor(label: string, min: number, max: number, current: number, x: number, y: number, fontSize: number, disabled: boolean) {
        this.labelText = label;
        this.min = min;
        this.max = max;
        this.current = current;
        this.fontSize = fontSize;

        const textSize = this.fontSize - (this.fontSize * 0.25)
        const buttonSize = this.fontSize + (this.fontSize * 0.25);
        
        //top text
        this.topLabel = new Label(this.labelText, x, y-Config.gridPadding, null, FontManager.get().getMono());
        this.topLabel.fontSize = textSize
        this.topLabel.baseAlign = BaseAlign.Middle;
        this.topLabel.textAlign = TextAlign.Center;
        
        //central Number Label
        this.numberLabel = new Label(`${current}`, x, y+buttonSize, null, FontManager.get().getMono());
        this.numberLabel.fontSize = textSize
        this.numberLabel.baseAlign = BaseAlign.Middle;
        this.numberLabel.textAlign = TextAlign.Center;

        //left button
        
        this.leftButton = new ButtonBase(Resources.uiLeft, () => this.addBy(-1));
        this.leftButtonSprite = this.leftButton.getSprite();
        this.leftButton.x = x - buttonSize*1.5
        this.leftButton.y = y + buttonSize;
        this.leftButton.scale = new Vector(buttonSize/Resources.uiLeft.width, buttonSize/Resources.uiLeft.height);
        this.leftButton.setHeight(buttonSize);
        this.leftButton.setWidth(buttonSize);
        
        //right button
        this.rightButton = new ButtonBase(Resources.uiRight, () => this.addBy(1));
        this.rightButtonSprite = this.rightButton.getSprite();
        this.rightButton.x = x + buttonSize*1.5;
        this.rightButton.y = y + buttonSize;
        this.rightButton.scale = new Vector(buttonSize/Resources.uiRight.width, buttonSize/Resources.uiRight.height);
        this.rightButton.setHeight(buttonSize);
        this.rightButton.setWidth(buttonSize);

        this.updateDisabled(disabled);
    }

    public updateDisabled = (isDisabled: boolean) => {
        this.leftButtonSprite.clearEffects();
        this.rightButtonSprite.clearEffects();
        if(isDisabled) {
            const disColor = Color.Gray;
            this.topLabel.color = disColor
            this.numberLabel.color = disColor;
            this.leftButtonSprite.addEffect(new Colorize(disColor));
            this.rightButtonSprite.addEffect(new Colorize(disColor));
            this.leftButton.setDisabled(true);
            this.rightButton.setDisabled(true);
        } else {
            this.topLabel.color = Color.Black;
            this.numberLabel.color = Color.Black;
            this.leftButton.setDisabled(false);
            this.rightButton.setDisabled(false);
        }
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

    public getBottom() {
        return Stream.ofValues<Actor>(this.leftButton, this.rightButton, this.numberLabel)
        .map(a => a.getBottom())
        .max()
        .orElse(0);
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