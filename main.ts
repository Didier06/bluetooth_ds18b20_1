// détecte une erreur pour la lecture de la température sur le sonde DS18B20
dstemp.sensorError(function (errorMessage, errorCode, port) {
    erreur_temperature = 1
})
let erreur_temperature = 0
let temp = 0
erreur_temperature = 0
basic.showIcon(IconNames.Diamond)
// communication bluetooth sur canal 1
radio.setGroup(1)
basic.pause(1000)
basic.clearScreen()
loops.everyInterval(2000, function () {
    // pour garder un seul chiffre après la virgule
    temp = Math.round(dstemp.celsius(DigitalPin.P0) * 10) / 10
    if (erreur_temperature == 0) {
        basic.showNumber(temp)
        radio.sendValue("temp1", temp)
        basic.pause(200)
        basic.clearScreen()
    } else {
        // Si erreur de lecture on envoie -100 
        radio.sendValue("temp1", -100)
        erreur_temperature = 0
        basic.pause(1000)
    }
})
