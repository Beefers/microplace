/**
 * The library that powers micro:place
*/
namespace place {
    export type ledLimit = 0 | 1 | 2 | 3 | 4;

    export interface pixel {
        x: ledLimit;
        y: ledLimit;
        state: "on" | "off";
    }

    export function packPixel(pixelData: pixel) {
        let pixelState: number;

        if(pixelData.state === "on") {
            pixelState = 1;
        } else {
            pixelState = 0;
        }

        return msgpack.packNumberArray([pixelData.x, pixelData.y, pixelState])
    }

    export function unpackPixel(packedPixel: Buffer) {
        const unpackedArray = msgpack.unpackNumberArray(packedPixel);

        let pixelState: "on" | "off";

        if (unpackedArray[2] === 1) {
            pixelState = "on";
        } else {
            pixelState = "off";
        }

        return {
            x: unpackedArray[0],
            y: unpackedArray[1],
            state: pixelState
        } as pixel;
    }

    export function showPixel(pixelData: pixel) {
        if (pixelData.state === "on") {
            led.plot(pixelData.x, pixelData.y)
        } else {
            led.unplot(pixelData.x, pixelData.y)
        }
    }
}