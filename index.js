let startTime, endTime;
let imageSize = "";
let image = new Image();

let bitSpeed = document.getElementById("bits");
let kbSpeed = document.getElementById("kbs");
let mbSpeed = document.getElementById("mbs");
let info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 5;
let testCompleted = 0;

// Use a more reliable image source
let imageApi = "https://picsum.photos/200/300";

function calculateSpeed() {
    let timeDuration = (endTime - startTime) / 1000;
    let loadedBits = imageSize * 8;
    let speedInBits = loadedBits / timeDuration;
    let speedInKbs = speedInBits / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBits;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    if (testCompleted == numTests) {
        let averageSpeedInBits = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbs = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbs = (totalMbSpeed / numTests).toFixed(2);

        bitSpeed.innerHTML += `${averageSpeedInBits}`;
        kbSpeed.innerHTML += `${averageSpeedInKbs}`;
        mbSpeed.innerHTML += `${averageSpeedInMbs}`;
        info.innerHTML = "Test Completed";
    } else {
        runTest();
    }
}

function runTest() {
    startTime = new Date().getTime();
    
    fetch(imageApi)
        .then(response => {
            imageSize = response.headers.get("content-length");
            if (!imageSize) {
                throw new Error("Content-Length header is missing");
            }
            return response.blob();
        })
        .then(res => {
            endTime = new Date().getTime();
            calculateSpeed();
        })
        .catch(error => {
            console.error("Error during speed test:", error);
            info.innerHTML = "Test failed. Please try again.";
        });
}

function init() {
    info.innerHTML = "Testing... ";
    totalBitSpeed = 0;
    totalKbSpeed = 0;
    totalMbSpeed = 0;
    testCompleted = 0;
    
    for (let i = 0; i < numTests; i++) {
        runTest();
    }
}

window.onload = init;