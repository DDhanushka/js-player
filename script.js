const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const darkmodeBtn = document.querySelector("#darkmode");

// song titles
const songs = [
    "Galana Ganga Ravi jay ft. Charitha Attalage",
    "Wanka Rataa Ravi Jay",
];
// keep track of songs
let songIndex = 1;

loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();
}

// event listners
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    // const currentTime = e.srcElement.currentTime;
    // const duration = e.srcElement.duration;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function setDarkmode() {
    let currnetTheme = document.documentElement.getAttribute("data-theme");
    let switchToTheme = currnetTheme === "dark" ? "light" : "dark";
    // currnetTheme === "dark" ?  darkmodeBtn.querySelector("i.fas").classList.add("fa-sun") : darkmodeBtn.querySelector("i.fas").classList.add("fa-moon") ;
    if(currnetTheme === 'light') {
        darkmodeBtn.querySelector("i.fas").classList.remove("fa-moon") ;
        darkmodeBtn.querySelector("i.fas").classList.add("fa-sun") ;
    } else {
        darkmodeBtn.querySelector("i.fas").classList.remove("fa-sun") ;
        darkmodeBtn.querySelector("i.fas").classList.add("fa-moon") ;
    }
    document.documentElement.setAttribute("data-theme", switchToTheme);
}

// change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

document.documentElement.setAttribute("data-theme", "light");

darkmodeBtn.addEventListener("click", setDarkmode);
