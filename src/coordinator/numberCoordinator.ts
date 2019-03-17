import { Label } from "excalibur";
import { Supplier } from "java8script";

export class NumberCoordinator {
    private max: number;
    private current: number;
    private labelPrefix: string;
    private label: Label;
    private onZero: Supplier<void>;

    private constructor(labelPrefix: string, max, current, label: Label, onZeroCallback: Supplier<void>) {
        this.current = current;
        this.max = max;
        this.label = label;
        this.labelPrefix = labelPrefix;
        this.onZero = onZeroCallback;
    }

    public static create(labelPrefix: string, x, y, max:number, onZeroCallback: Supplier<void>, current?: number): NumberCoordinator {
        const defaultedCurrent: number = current ? current : 0;
        return new NumberCoordinator(
            labelPrefix,
            max,
            defaultedCurrent,
            new Label(labelPrefix + defaultedCurrent, x, y, '20px Arial'),
            onZeroCallback
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
        this.label.text = this.labelPrefix + this.current;
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
        this.label.text = this.labelPrefix + this.current;
        return this.current;
    }

    //returns the current value
    public getCurrent(): number {
        return this.current;
    }

    public getLabel(): Label {
        return this.label;
    }
 }