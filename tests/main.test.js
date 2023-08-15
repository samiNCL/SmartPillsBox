import { fetchData, save } from '../public/js/main.js';
import { toggleLed, readInput } from '../server.mjs';

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
    // Add test cases here
});

// Unit tests for toggleLed function
test('toggleLed function', () => {
    // Add test cases here
});

// Unit tests for readInput function
test('readInput function', () => {
    // Add test cases here
});

// Add more test functions here

