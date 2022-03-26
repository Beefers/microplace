const radioChannel = 75;

radio.setGroup(radioChannel);
console.log(`[micro:place] Initialising on radio channel ${radioChannel}...`);
radio.sendString(control.deviceName());

let currentState: "on" | "off" = "on";
let currentX: place.ledLimit = 0;
let currentY: place.ledLimit = 0;

input.onButtonPressed(Button.A, () => {
    if (currentX + 1 > 4) {
        currentX = 0;
    } else {
        currentX++;
    }

    let scrot = led.screenshot();
    basic.showNumber(currentX + 1, 50);
    scrot.plotImage();
})

input.onButtonPressed(Button.B, () => {
    if (currentY + 1 > 4) {
        currentY = 0;
    } else {
        currentY++;
    }

    let scrot = led.screenshot();
    basic.showNumber(currentY + 1, 100);
    scrot.plotImage();
})

input.onGesture(Gesture.Shake, () => {
    if (currentState === "on") {
        currentState = "off";
    } else {
        currentState = "on";
    }

    let scrot = led.screenshot();
    basic.showString(currentState, 100);
    scrot.plotImage();
})

input.onButtonPressed(Button.AB, () => {
    const pixel = {
        x: currentX,
        y: currentY,
        state: currentState,
    }

    place.showPixel(pixel);
    radio.sendBuffer(place.packPixel(pixel));
})

radio.onReceivedBuffer((recievedBuffer: Buffer) => {
    const unpackedPixel: place.pixel = place.unpackPixel(recievedBuffer);

    if (unpackedPixel.state === "on") {
        led.plot(unpackedPixel.x, unpackedPixel.y);
    } else {
        led.unplot(unpackedPixel.x, unpackedPixel.y);
    }
});