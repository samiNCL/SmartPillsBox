
/**
 *  
    Sami Saeed A Alghamdi 
    170497910
    Smart Pill Box 
    Prototype to help  carers track the adherence to medications remotely 
 */

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { Gpio } from 'onoff'
const led = new Gpio(27, 'out')
var i = 0
console.log("Hi")
//Normal situation = Blue LED flashes slowly and Buzzer ticks regularly

function toggleLed() {
    const currentValue = led.readSync()
    if (currentValue) {
        led.writeSync(0)  // turn off
    } else {
        led.writeSync(1)  // turn on
    }

}
setInterval(toggleLed, 1000)

//PIR sensor detects if the box opened and report that 

const inputPin = new Gpio(14, 'in') //Gpio 14 == pin number 8 in RaspberryPi
function readInput() {
    const value = inputPin.readSync()
    if (value == 1) {
        sensorUpdate(data)

        console.log("Reading sent")


    }
}

setInterval(readInput, 700) //PIR sensor


//------------------------------------------

const currentFolder = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use('/', express.static(path.join(currentFolder, 'public')))

app.listen(3000, () => {
    console.log(`Listening at http://localhost:3000`)
})




const lastReadings = {
    box: {
        OpenedIn: null,
    },
}

//

function sensorUpdate(data) {
    lastReadings['box'] = data
    console.log("UPDATE:Box" + JSON.stringify(data))
}



let timestamp = new Date();

const data = {
    OpenedIn: timestamp,

}



//----------------------------------------
// API to provide a reading of the most recent data

app.get('/data', (req, res) => {
    res.json(lastReadings)
})
 // More code in ./public/index.html






