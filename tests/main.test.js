import { fetchData, save } from '../public/js/main.js';
import { toggleLed, readInput, getLedValue, turnOffLed, turnOnLed, getInputValue } from '../server.mjs';

// Unit tests for fetchData function
test('fetchData function', () => {
    // Test when data.box.OpenedIn is not null
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ box: { OpenedIn: new Date() } }),
        })
    );
    save = jest.fn();
    fetchData();
    expect(save).toHaveBeenCalled();

    // Add more test cases here
});

// Unit tests for save function
test('save function', () => {
    // Test when data is not null
    const data = { box: { OpenedIn: new Date() } };
    save(data);
    expect(localStorage.getItem('data')).toEqual(JSON.stringify(data));

    // Test when data is null
    save(null);
    expect(localStorage.getItem('data')).toBeNull();
});

// Unit tests for toggleLed function
test('toggleLed function', () => {
    // Test when ledValue is true
    getLedValue = () => true;
    turnOffLed = jest.fn();
    turnOnLed = jest.fn();
    toggleLed();
    expect(turnOffLed).toHaveBeenCalled();
    expect(turnOnLed).not.toHaveBeenCalled();

    // Test when ledValue is false
    getLedValue = () => false;
    turnOffLed = jest.fn();
    turnOnLed = jest.fn();
    toggleLed();
    expect(turnOffLed).not.toHaveBeenCalled();
    expect(turnOnLed).toHaveBeenCalled();
});

// Unit tests for readInput function
test('readInput function', () => {
    // Test when inputValue is 1
    getInputValue = () => 1;
    updateSensorData = jest.fn();
    console.log = jest.fn();
    readInput();
    expect(updateSensorData).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith("Sensor data sent");

    // Test when inputValue is not 1
    getInputValue = () => 0;
    updateSensorData = jest.fn();
    console.log = jest.fn();
    readInput();
    expect(updateSensorData).not.toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalled();
});

// Add more test functions here

