import { Label, BaseAlign, TextAlign } from "excalibur";
import FontManager from "../../engine/fontManager";
import ProgressionManager from "../../engine/progression/progressionManager";

export default class LevelDisplay extends Label {
    private static PREFIX: string = "Level";
    public constructor(x: number, y: number, size: number, startingLevel: string) {
        super(
            LevelDisplay.createLabelText(startingLevel),
            x,
            y,
            null,
            FontManager.get().getMono()
        );

        this.fontSize = size;
        this.baseAlign = BaseAlign.Middle;
        this.textAlign = TextAlign.Center;

    }

    private static createLabelText(level: string) {
        return ProgressionManager.get().isProgressionDisabled() ? "" :`${LevelDisplay.PREFIX} ${level}`;
    }

    public updateLevel(newLevel: string): void {
        this.text = LevelDisplay.createLabelText(newLevel);
    }

}