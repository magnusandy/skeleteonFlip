import { Actor, Color, Engine } from "excalibur";

export default class ScrollBar extends Actor {

    private scrollBarTop: number;
    private scrollBarBotton: number;
    private isDragging = false;

    constructor(engine: Engine) {
        super();
        this.scrollBarBotton = engine.drawHeight / 2;
        this.scrollBarTop = engine.drawHeight / 2; // dont want to be able to go past the top of the screen

        this.x = engine.drawWidth - 25;
        this.y = engine.drawHeight / 2;
        this.setWidth(50);
        this.setHeight(50);
        this.color = Color.Red;
        
        this.on('pointerdragstart', (pe: ex.Input.PointerEvent) => {
            this.isDragging = true;
        });

        this.on('pointerdragend', (pe: ex.Input.PointerEvent) => {
            this.isDragging = false;
        });

        this.on('pointerdragmove', (pe: ex.Input.PointerEvent) => {
            if (this.isDragging) {
                const worldY = pe.pointer.lastWorldPos.y;
                if (worldY > this.scrollBarTop && worldY < this.scrollBarBotton) {
                    this.y = pe.pointer.lastWorldPos.y;
                }
            }
        });

        this.on('pointerdragleave', (pe: ex.Input.PointerEvent) => {
            if (this.isDragging) {
                const worldY = pe.pointer.lastWorldPos.y;
                if (worldY > this.scrollBarTop && worldY < this.scrollBarBotton) {
                    this.y = pe.pointer.lastWorldPos.y;
                }
            }
        });
    }

    public setScrollBottom(num: number) {
        this.scrollBarBotton = num;
        if(Math.floor(this.scrollBarBotton) <= Math.floor(this.scrollBarTop)) {
            this.visible = false;
        }
    }
}