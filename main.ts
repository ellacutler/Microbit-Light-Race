
input.onButtonPressed(Button.A, function () {
    // shows the radio group so that it's more intuitive to connect 
    serial.writeNumber(input.lightLevel());
    const firstLightVal = input.lightLevel();
    if(count == 0){
        basic.showNumber(firstLightVal);
    }
    
    count += 1
    basic.showNumber(count);
    radio.setGroup(count);
    radio.setTransmitPower(7);
})
input.onButtonPressed(Button.B, function () {
    const default_light_level_sender = input.lightLevel()
    // number shouldn't matter b/c everyone is on a different radio
    basic.showString("ready!");
    if (input.lightLevel() < default_light_level_sender) {
        // having issues sending number over the radio?
        radio.sendNumber(1);
        basic.showString( "go!");
    }
})
radio.onReceivedNumber(function (recievedNumber:1) {
    basic.showString("go!");
    // sets the light level with the laser 
    const default_light_level_reciever = input.lightLevel();
    while (input.lightLevel() > 0.8 * default_light_level_reciever) {
        // visual count until laser is passed
        loops.everyInterval(1000, () =>{
            SecondsTimer += 1;
           // basic.showNumber(SecondsTimer);
        })
    }
    basic.showNumber(SecondsTimer);
    radio.sendValue("time", SecondsTimer);
})

let count = 0
let SecondsTimer = 0

/* radio.onReceivedValue(function (name, SecondsTimer) {
    // want to display the timer on first microbit as well

    basic.showNumber(SecondsTimer);
})
*/