input.onButtonPressed(Button.A, function () {
    // shows the radio group so that it's more intuitive to connect 
    serial.writeNumber(input.lightLevel());
    const firstLightVal = input.lightLevel();
    if (count == 0) {
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

    while (input.lightLevel() > default_light_level_sender) {
        // having issues sending number over the radio?
        continue;
    }
    radio.sendNumber(1);
    basic.showString("go!");
})
radio.onReceivedNumber(function (recievedNumber: 1) {
    const start= input.runningTime();
    // don't need to raise a specific event b/c recieving a number is an event?
    const start_time = control.eventTimestamp();
    const default_light_level_reciever = input.lightLevel();
    let elasped_seconds = 0;
    basic.showString("go!");
    while(input.lightLevel() >= 0.8*default_light_level_reciever){
        continue;
    }
 
    let end_time = input.runningTime();

    elasped_seconds = (end_time - start_time)/1000;

    basic.showNumber(elasped_seconds);
    basic.showString("done!");
    radio.sendValue("time", elasped_seconds);
 

    
    
})

let count = 0
let SecondsTimer = 0

/* radio.onReceivedValue(function (name, SecondsTimer) {
    // want to display the timer on first microbit as well
    basic.showNumber(SecondsTimer);
})
*/
