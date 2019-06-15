import { Actor, Label, Texture, BaseAlign, TextAlign } from "excalibur";
import ButtonBase from "../bars/buttonBase";
import { calcDimensionsSingleObjectTexture, IDimensions } from "../../engine/helpers";
import { ModalRenderer } from "../../modal/modal";
import { Config } from "../../resources";
import FontManager from "../../engine/managers/fontManager";
import SizingManager from "../../engine/managers/sizingManager";

export interface UpgradeDetails {
    title: string;
    price: number;
    currentLevel: number;
    maxLevel: number;
    description: string;
}

export default class UpgradeWidget {
    private tileButton: Actor;
    private label: Label;
    private purchaseOnClick: () => void;
    private upgradeDetails: UpgradeDetails;

    public constructor(x, y, tileDims: IDimensions, tileTexture: Texture, label: string, details: UpgradeDetails, onClick: () => void) {

        this.tileButton = new ButtonBase(tileTexture, () => ModalRenderer.get().upgradeMaxGridModal(3, 100, onClick));
        this.tileButton.x = x;
        this.tileButton.y = y;
        this.tileButton.scale = tileDims.scale;
        this.tileButton.setHeight(tileDims.height);
        this.tileButton.setWidth(tileDims.width);

        this.label = new Label(label, this.tileButton.getRight() + Config.gridPadding, y, null, FontManager.get().getMono());
        this.label.fontSize = SizingManager.get().getUIItemSize();
        this.label.baseAlign = BaseAlign.Middle;
        this.label.textAlign = TextAlign.Left;
    }

    public getDrawables(): Actor[] {
        return [
            this.label,
            this.tileButton
        ];
    }

    public  getBottom(): number {
        return this.tileButton.getBottom();
    }
}