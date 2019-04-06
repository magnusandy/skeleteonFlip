import RadioButton from "./radioButton";
import { Label, SpriteFont, Actor, BaseAlign, TextAlign, Engine } from "excalibur";
import { Resources } from "../../resources";
import FontManager from "../../engine/fontManager";

export default class LabeledRadio {

    private radio: RadioButton;
    private label: Label;

    constructor(label: string, size: number, x: number, y: number, defaultVal: boolean, engine: Engine) {
        this.label = new Label(label, x, y, null, FontManager.get().getMono());//need to x adjust after
        this.label.fontSize = size;
        this.label.baseAlign = BaseAlign.Middle;
        this.label.textAlign = TextAlign.Center;
        const labelWidth = this.label.getTextWidth(engine.ctx);
        console.log(`labelwidth ${labelWidth}`)
        this.label.x = x - labelWidth/3;
        
        this.radio = new RadioButton(size, x+labelWidth*(2/3), y, defaultVal);
        
    }

    public isChecked(): boolean {
        return this.radio.isChecked();
    }

    public getDrawables(): Actor[] {
        return [
            this.radio,
            this.label
        ];
    }
}