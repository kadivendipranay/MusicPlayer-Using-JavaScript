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

function loadSong(info) {
    // Logic to load the new song
    myImage.src = info.imageName;
    myAudioFile.src = info.audioName;
    mySongName.textContent = info.songName;
    mySingerName.textContent = info.singerName;

    // Pause the audio and reset play icon text
    pauseAudio();
    isAudioPlaying = false;
    myPlayIcon.textContent = "Play";
}

let songIndex = 0;
myForwardIcon.addEventListener("click", function () {
    // Load the current song
    loadSong(songsData[songIndex]);
    
    // Move to the next song, and loop if necessary
    songIndex++;
    if (songIndex >= songsData.length) {
        songIndex = 0; // Loop back to the first song
    }
});
