let t = document.getElementById("t");
t.style.color = "black";
let notif = "No data recieved from the box yet"; // Notification for carers 
t.innerHTML = notif;

async function fetchData() {
    const response = await fetch('/data')
    if (!response.ok) throw new Error('Failure while fetching json')
    data = await response.json()

    if (data.box.OpenedIn != null) {
        let r = data.box.OpenedIn;
        let timeObj = new Date(r);
        t.style.color = "green";
        notif = "Box opened! " + timeObj;
        t.innerHTML = notif;

        save(timeObj);
    }
}

fetchData()

// Unit test for fetchData function
function testFetchData() {
    // Mock fetch function
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ box: { OpenedIn: new Date() } }),
        })
    );

    // Mock save function
    save = jest.fn();

    // Call fetchData function
    fetchData();

    // Assert that save function was called
    expect(save).toHaveBeenCalled();
}
testFetchData()

function save(timeObj) {
    // Here we will save sensor data (objects of dates)  after turning them to Days and Hours.
    //Then these data can be used for track patient adherence over time 

    let requestDB = indexedDB.open('SensorData', 1);

    //onupgradeneeded  to  initialize database
    requestDB.onupgradeneeded = () => {
        let db = requestDB.result;

        if (!db.objectStoreNames.contains('Records')) {    // if there is no object store create one called records
            db.createObjectStore('Records', { keyPath: 'id', autoIncrement: true }) // id = keypath = day of week number
        }
    }

    //onsuccess
    requestDB.onsuccess = () => {
        let db = requestDB.result;

        let tr = db.transaction(['Records'], "readwrite"); // transiction obj

        let addObject = tr.objectStore('Records'); // to be used in adding data

        let someData = { day: iDay, hour: iHour }; //data to add
        addObject.add(someData); // really adding

        let searchx = addObject.getAll()
        searchx.onsuccess = () => {
            console.log("Successful");

            console.log(searchx.result);
        }

        searchx.onerror = () => {
            console.log("Error");

            console.log(searchx.error);
        }
    }

    //onerror 
    requestDB.onerror = () => {
        console.log(requestDB.error)
    }
}

