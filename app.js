const myPlayIcon = document.querySelector("#play");
const myAudioFile = document.querySelector("audio");
let isAudioPlaying = false;

function playAudio() {
    myAudioFile.play();
}

function pauseAudio() {
    myAudioFile.pause();
}

myPlayIcon.addEventListener("click", function () {
    if (!isAudioPlaying) {
        playAudio();
        isAudioPlaying = true;
        myPlayIcon.textContent = "Pause";
    } else {
        pauseAudio();
        isAudioPlaying = false;
        myPlayIcon.textContent = "Play";
    }
});

// Forward button
const songsData = [
    {
        imageName: "images/image2.jpg",
        audioName: "audios/audio2.mp3",
        songName: "Jammy Jummy",
        singerName: "Jammy",
    },
    {
        imageName: "images/image3.jpg",
        audioName: "audios/audio3.mp3",
        songName: "Savage Love",
        singerName: "The Weeknd",
    },
    {
        imageName: "images/image4.jpg",
        audioName: "audios/audio4.mp3",
        songName: "Shape of You",
        singerName: "The Mahi",
    },
];

// Select elements
const myImage = document.querySelector("img");
const mySongName = document.querySelector("h2");
const mySingerName = document.querySelector("h3");
const myForwardIcon = document.querySelector("#forward");
const myBackwardIcon = document.querySelector("#backward"); // Backward button

function loadSong(info) {
    myImage.src = info.imageName;
    myAudioFile.src = info.audioName;
    mySongName.textContent = info.songName;
    mySingerName.textContent = info.singerName;

    resetPlayer();
    isAudioPlaying = false;
    myPlayIcon.textContent = "Play";
}

function resetPlayer() {
    pauseAudio();
    isAudioPlaying = false;
    myPlayIcon.textContent = "Play";
    myCurrentTimee.textContent = "0:00";  // Reset current time
    myProgressInner.style.width = "0%";   // Reset progress bar
}

let songIndex = 0;
myForwardIcon.addEventListener("click", function () {
    songIndex++;
    if (songIndex >= songsData.length) {
        songIndex = 0; // Loop back to the first song
    }
    loadSong(songsData[songIndex]);
    playAudio();
    isAudioPlaying = true;  // Ensure the song plays after loading
    myPlayIcon.textContent = "Pause";
});

// **Backward functionality**
myBackwardIcon.addEventListener("click", function () {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songsData.length - 1; // Loop to the last song if at the beginning
    }
    loadSong(songsData[songIndex]);
    playAudio();
    isAudioPlaying = true;  // Ensure the song plays after loading
    myPlayIcon.textContent = "Pause";
});

// Getting and displaying current time and total time
const myTotalTimee = document.querySelector(".totaltime");
const myCurrentTimee = document.querySelector(".currenttime");
const myProgressInner = document.querySelector(".progressinner");

myAudioFile.addEventListener("loadedmetadata", function () {
    let myTotalTime = myAudioFile.duration;

    if (!isNaN(myTotalTime)) {
        let totalTimeInMinutes = Math.floor(myTotalTime / 60);
        let totalTimeInSeconds = Math.floor(myTotalTime % 60);
    
        totalTimeInSeconds = totalTimeInSeconds < 10 ? `0${totalTimeInSeconds}` : totalTimeInSeconds;
    
        myTotalTimee.textContent = `${totalTimeInMinutes}:${totalTimeInSeconds}`;
    }
});

// Update current time as the audio plays
myAudioFile.addEventListener("timeupdate", function () {
    let myCurrentTime = myAudioFile.currentTime;
    let myTotalTime = myAudioFile.duration;

    if (!isNaN(myTotalTime)) {
        let audioPlayedPercentage = (myCurrentTime / myTotalTime) * 100;
        myProgressInner.style.width = `${audioPlayedPercentage}%`;

        let currentTimeInMinutes = Math.floor(myCurrentTime / 60);
        let currentTimeInSeconds = Math.floor(myCurrentTime % 60);
        currentTimeInSeconds = currentTimeInSeconds < 10 ? `0${currentTimeInSeconds}` : currentTimeInSeconds;

        myCurrentTimee.textContent = `${currentTimeInMinutes}:${currentTimeInSeconds}`;
    }
});

// Shuffle button
const myShuffle = document.querySelector("#shuffle");

myShuffle.addEventListener("click", function () {
    let randomSongIndex = Math.floor(Math.random() * songsData.length);
    loadSong(songsData[randomSongIndex]);
    playAudio();
    isAudioPlaying = true;  // Play the song after shuffling
    myPlayIcon.textContent = "Pause";
});

// Store favorite song in local storage
const myHeart = document.querySelector("#heart");

myHeart.addEventListener("click", function () {
    if (myHeart.style.color === "red") {
        myHeart.style.color = "";  // Reset color if it's already red (unlike)
        localStorage.removeItem(mySongName.textContent);  // Remove from localStorage
    } else {
        myHeart.style.color = "red";
        // Store the song name (key) and singer name (value) in local storage
        localStorage.setItem(mySongName.textContent, mySingerName.textContent);
    }
});
