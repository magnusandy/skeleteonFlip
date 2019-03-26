import { Texture, Vector } from "excalibur";

interface IDimensions {
    width: number;
    height: number;
    scale: Vector;
}

//paddingPercent should be a decimal between 0-1
function calcDimensionsSingleObject(screenHeight: number, screenWidth: number, texture: Texture, paddingPercent?: number, maxScale?: number): IDimensions {
    
    const paddingToUse = paddingPercent ? paddingPercent : 1;
    const { height, width } = texture;
    const maxHeight = screenHeight * paddingToUse;
    const maxWidth = screenWidth * paddingToUse;
    const scaleByWidth = maxWidth / width;

    if ((scaleByWidth * height) > screenHeight) {
        // using width as the scale base pushes height out of the screen
        const scaleByHeight = maxHeight / height;
        const scaleToUse = maxScale < scaleByHeight ? maxScale : scaleByHeight;
        return {
            width: width * scaleToUse,
            height: maxHeight,
            scale: new Vector(scaleToUse, scaleToUse)
        }
    } else {
        const scaleToUse = maxScale < scaleByWidth ? maxScale : scaleByWidth;
        return {
            width: maxWidth,
            height: height * scaleToUse,
            scale: new Vector(scaleToUse, scaleToUse)
        }
    }
}

export {
    IDimensions,
    calcDimensionsSingleObject
}