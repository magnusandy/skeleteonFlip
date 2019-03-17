import { Supplier } from "java8script";

export interface CardCallbackProvider {
    skeletonCardCallback: Supplier<void>;
    coinCardCallback: Supplier<void>;
    potionCardCallback: Supplier<void>;
    attackCardCallback: Supplier<void>;
    
}