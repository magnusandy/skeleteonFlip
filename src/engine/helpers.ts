import { Texture, Vector } from "excalibur";
import { Supplier } from "java8script";

interface IDimensions {
    width: number;
    height: number;
    scale: Vector;
}

//paddingPercent should be a decimal between 0-1
function calcDimensionsSingleObjectTexture(screenHeight: number, screenWidth: number, texture: Texture, paddingPercent?: number, maxScale?: number): IDimensions {
    return calcDimensionsSingleObject(screenHeight, screenWidth, texture.height, texture.width, paddingPercent, maxScale);
}

function calcDimensionsSingleObject(screenHeight: number, screenWidth: number, textHeight: number, textWidth: number, paddingPercent?: number, maxScale?: number): IDimensions {

    const paddingToUse = paddingPercent ? paddingPercent : 1;
    const maxHeight = screenHeight * paddingToUse;
    const maxWidth = screenWidth * paddingToUse;
    const scaleByWidth = maxWidth / textWidth;

    if ((scaleByWidth * textHeight) > screenHeight) {
        // using width as the scale base pushes height out of the screen
        const scaleByHeight = maxHeight / textHeight;
        const scaleToUse = maxScale < scaleByHeight ? maxScale : scaleByHeight;
        return {
            width: textWidth * scaleToUse,
            height: maxHeight * scaleToUse,
            scale: new Vector(scaleToUse, scaleToUse)
        }
    } else {
        const scaleToUse = maxScale < scaleByWidth ? maxScale : scaleByWidth;
        return {
            width: maxWidth * scaleToUse,
            height: textHeight * scaleToUse,
            scale: new Vector(scaleToUse, scaleToUse)
        }
    }
}

function safePointerUp(onClick: Supplier<void>): (event?: any) => void {
    return (event?: any) => {
            if (event.ev.type === "pointerup") {
                //this is kinda nasty need to filter out the duplicate touch events, only accept the regular pointer up ones
                onClick();
            }
    }
}


export {
    IDimensions,
    calcDimensionsSingleObject,
    calcDimensionsSingleObjectTexture,
    safePointerUp
}