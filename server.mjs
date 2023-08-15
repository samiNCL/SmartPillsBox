
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
    const ledValue = getLedValue()
    if (ledValue) {
        turnOffLed()  
    } else {
        turnOnLed()  
    }
}

// Unit test for toggleLed function
function testToggleLed() {
    // Test when ledValue is true
    getLedValue = () => true
    turnOffLed = jest.fn()
    turnOnLed = jest.fn()
    toggleLed()
    expect(turnOffLed).toHaveBeenCalled()
    expect(turnOnLed).not.toHaveBeenCalled()

    // Test when ledValue is false
    getLedValue = () => false
    turnOffLed = jest.fn()
    turnOnLed = jest.fn()
    toggleLed()
    expect(turnOffLed).not.toHaveBeenCalled()
    expect(turnOnLed).toHaveBeenCalled()
}
testToggleLed()
}
setInterval(toggleLed, 1000)

//PIR sensor detects if the box opened and report that 

const inputPin = new Gpio(14, 'in') //Gpio 14 == pin number 8 in RaspberryPi
function readInput() {
    const inputValue = getInputValue()
    if (inputValue == 1) {
        updateSensorData(data)
        console.log("Sensor data sent")
    }
}

// Unit test for readInput function
function testReadInput() {
    // Test when inputValue is 1
    getInputValue = () => 1
    updateSensorData = jest.fn()
    console.log = jest.fn()
    readInput()
    expect(updateSensorData).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledWith("Sensor data sent")

    // Test when inputValue is not 1
    getInputValue = () => 0
    updateSensorData = jest.fn()
    console.log = jest.fn()
    readInput()
    expect(updateSensorData).not.toHaveBeenCalled()
    expect(console.log).not.toHaveBeenCalled()
}
testReadInput()

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






