radio.onReceivedValue(function (name, SecondsTimer) {
    // want to display the number that the other one recorded
    
    basic.showNumber(SecondsTimer)
})
input.onButtonPressed(Button.A, function () {
    // shows the radio group so that it's more intuitive to connect 
    count += 1
    basic.showNumber(count);
    radio.setGroup(count);
})
input.onButtonPressed(Button.B, function () {
    default_light_level = input.lightLevel()
    // number shouldn't matter b/c everyone is on a different radio
    basic.showString("ready!");
    if (input.lightLevel() < default_light_level) {
        radio.sendNumber(1);
        basic.showString( "go!");
    }
})
radio.onReceivedNumber(function (recievedNumber:1) {
    basic.showString("go!");
    // sets the light level with the laser 
    default_light_level2 = input.lightLevel();
    while (input.lightLevel() > 0.8 * default_light_level2) {
        // visual count until laser is passed
        loops.everyInterval(1000, () =>{
            SecondsTimer += 1;
            basic.showNumber(SecondsTimer);
        })
    }
    basic.showNumber(SecondsTimer);
    radio.sendValue("time", SecondsTimer);
})
let default_light_level2 = input.lightLevel()
let default_light_level = input.lightLevel()
let count = 0
let SecondsTimer = 0
