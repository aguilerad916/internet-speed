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

//gets random image
let imageApi = "https://source.unsplash.com/random?topic=nature";

//image loads
image.onload = async function() {
    endTime = new Date().getTime();

    await fetch(imageApi).then((res) => {
        imageSize = res.headers.get("content-length");
        calculateSpeed();
    });
};

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
        let averageSpeedInBits =  (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbs =  (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbs =  (totalMbSpeed / numTests).toFixed(2);

        //display the speeds
        bitSpeed.innerHTML += `${averageSpeedInBits}`;
        kbSpeed.innerHTML += `${averageSpeedInKbs}`;
        mbSpeed.innerHTML += `${averageSpeedInMbs}`;
        info.innerHTML = "Test Completed";
    } else {
        startTime = new Date().getTime();
        image.src = imageApi;
    };
}

const init = async () => {
    info.innerHTML = "Testing... ";
    startTime = new Date().getTime();
    image.src = imageApi;

};


window.onload = () => {
    for(let i = 0; i < numTests; i++) {
        init();
    }
};
