# SmartPillsBox: A Smart Medication Management System

## Overview 
   SmartPillsBox is a prototype of a smart medication management system. It is designed to assist people with chronic conditions in tracking their medication intake. The system is equipped with a Passive Infrared Sensor (PIR sensor) and is controlled by a server script (`server.mjs`) and a web interface (`./public/Index.html`).


## Installation and Setup

### Prerequisites
* Node.js and npm
* Raspberry PI (Linux)

### Steps
1. Clone the repository to your local machine.
2. Navigate to the project folder.
3. Install the necessary Node.js modules via npm by running `npm install`.
4. Run the server script with the command `node server.mjs`. Ensure there are no errors in the terminal.
5. Visit `localhost:3000` in your web browser to access the web interface.

Note: If you do not have a Raspberry PI or PIR, you can still demonstrate the system based on fake data (not from the sensor data). To do this, open `./public/Index.html` and follow the in-code comments.
 
 
 ## Usage
 
 SmartPillsBox is designed to help people with chronic conditions track their medication intake. When the box is opened within the prescribed time range for taking the medication, this will be reported positively. If the box is not opened within this time range, the system will report a problem.
 
 For a more technical description of how the system works, refer to the in-code comments.
 
## Contribution

We welcome contributions from other developers. Please follow the coding standards used throughout the project and submit your pull requests for review.

## License

This project is licensed under the ISC License.

## Contact Information

For any queries or further information, please contact the project maintainer, Sami, at samiNCL@gmail.com.

Thank you, 
Sami 
Fri 26 Mar 2021

