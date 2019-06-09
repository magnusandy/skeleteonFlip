import { SpriteFont } from "excalibur";
import { Resources } from "../../resources";

export default class FontManager {

    private generalMono: SpriteFont;
    private static singleton: FontManager;
    
    //this class should not be constructed until after the resources have been loaded
    private constructor() {
        this.generalMono = new SpriteFont(Resources.myMono, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.: ', true, 12, 4, 99, 135);
    }

    public static get(): FontManager {
        if(this.singleton) {
            return this.singleton;
        } else {
            return new FontManager();
        }
    }

    public getMono(): SpriteFont {
        return this.generalMono;
    }

}