import { Label, Texture } from "excalibur";
import { Supplier, Stream } from "java8script";
import StatTracker from "../actors/bars/statTracker";

export class NumberCoordinator {
    private max: number;
    private current: number;
    private onZero: Supplier<void>;

    private statActors: StatTracker[];

    private constructor(max, current, onZeroCallback: Supplier<void>, statActors: StatTracker[]) {
        this.current = current;
        this.max = max;
        this.onZero = onZeroCallback;
        this.statActors = statActors;
    }

    public static create(x, y, max:number, onZeroCallback: Supplier<void>, texture: Texture, current?: number): NumberCoordinator {
        const defaultedCurrent: number = current ? current : 0;
        const statActors = Stream.range(0, max)
                            .map(idx => {
                                if(idx > (defaultedCurrent - 1)) {
                                    return new StatTracker(false, x + (idx * 50), y, texture);
                                } else {
                                    return new StatTracker(true, x + (idx * 50), y, texture);
                                }
                            })
                            .toArray();
    
        return new NumberCoordinator(
            max,
            defaultedCurrent,
            onZeroCallback,
            statActors
        );
    }

    //adds value to the current, respecting the maximum.
    //returns the current value after the update
    public add(value: number): number {
        if((this.current + value) > this.max) {
            this.current = this.max;
        } else {
            this.current = this.current + value;
        }
       this.statActors[this.current - 1].setEnabled(true);
        return this.current;
    }

    //subtracts the value from the current, respecting 0 as the lower bound.
    public subtract(value: number): number {
        if(this.current - value <= 0) {
            this.current = 0;
            this.onZero();
        } else {
            this.current = this.current - value;
        }
        this.statActors[this.current].setEnabled(false);
        return this.current;
    }

    //returns the current value
    public getCurrent(): number {
        return this.current;
    }

    public getStatActors(): StatTracker[] {
        return this.statActors;
    }
 }