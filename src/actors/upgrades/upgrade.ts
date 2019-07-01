import { Map, Stream, Comparator, Collectors } from 'java8script';
import {UpgradeDetails} from './upgradeWidget'

export interface UpgradeDescription {
    title: string,
    description: string,
    prices: { level: number, price: number }[]
}

export default class Upgrade {
    private title: string;
    private description: string;
    private maxLevel: number;
    private currentLevelToPriceMap: Map<number, number>;

    private constructor(title: string, description: string, maxLevel: number, currentLevelToPriceMap: Map<number, number>) {
        this.title = title;
        this.description = description;
        this.currentLevelToPriceMap = currentLevelToPriceMap;
        this.maxLevel = maxLevel;
    }

    public static create(upDesc: UpgradeDescription) {
        return new Upgrade(
            upDesc.title,
            upDesc.description,
            Stream.of(upDesc.prices)
                .map(p => p.level)
                .max(Comparator.default())
                .orElse(0),
            Stream.of(upDesc.prices)
            .collect(Collectors.toMap(
                d => d.level,
                d => d.price
            ))
        );
    }

    public getDetails(currentLevel: number): UpgradeDetails {
        return {
            title: this.title,
            description: this.description,
            maxLevel: this.maxLevel,
            currentLevel: currentLevel,
            price: this.currentLevelToPriceMap.get(currentLevel)
        }
    }
}