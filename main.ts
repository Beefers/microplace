const radioChannel = 75;

radio.setGroup(radioChannel);
console.log(`[micro:place] Initialising on radio channel ${radioChannel}...`);
radio.sendString(control.deviceName());

let currentX: place.ledLimit = 1;
let currentY: place.ledLimit = 1;

input.onButtonPressed(Button.A, () => {
    if (currentX + 1 > 5) {
        currentX = 1;
    } else {
        currentX++;
    }

    basic.showNumber(currentX);
})

input.onButtonPressed(Button.B, () => {
    if (currentY + 1 > 5) {
        currentY = 1;
    } else {
        currentY++;
    }

    basic.showNumber(currentY);
})

input.onButtonPressed(Button.AB, () => {
    radio.sendBuffer(place.packPixel({
        x: currentX,
        y: currentY,
        state: "on",
    }))
})

radio.onReceivedBuffer((recievedBuffer: Buffer) => {
    const unpackedPixel: place.pixel = place.unpackPixel(recievedBuffer);

    console.log(unpackedPixel);
});