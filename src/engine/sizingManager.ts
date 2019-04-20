import { Engine } from "excalibur";

export interface IButtonSizing {
    padding: number, 
    maxScale: number
}
/***
 * Deal with font and item scaling for mobile devices
 */
export default class SizingManager {
    private engine: Engine;
    private static singleton: SizingManager;

    private constructor(engine: Engine) {
        this.engine = engine;
    }

    public static initialize(engine: Engine) {
        if(!this.singleton) {
            this.singleton = new SizingManager(engine);
        } else {
            console.log("Mobile Manager already initialized");
        }
    }

    public static get(): SizingManager {
        if(this.singleton) {
            return this.singleton;
        } else {
            throw "Mobile Manager Not defined yet";
        }
    }

    public isMobile(): boolean {
        return this.engine.drawWidth < 1200; 
    }
    public getUIItemSize() {
        return this.isMobile() ? 30 : 50;
    }

    public getUIButtonSizing(): IButtonSizing {
        return this.isMobile() 
        ? {padding: 0.4, maxScale: 0.3}
        : {padding: 0.4, maxScale: 0.5}
    }

    public getMenuHeight(): number {
        return this.getUIItemSize() * 3;
    }

}