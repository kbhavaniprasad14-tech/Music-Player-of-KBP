const songs = [
{
    title: "Inthalo",
    artist: "Artist One",
    src: "./songs/inthalo.mp3"
},
{
    title: "Ordinary Person",
    artist: "Artist Two",
    src: "./songs/ordinaryperon.mp3"
},
{
    title: "Neeve",
    artist: "Artist Three",
    src: "./songs/Neeve-SenSongsMp3.Co.mp3"
}
];

const audio = document.getElementById("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");

const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("currentTime");

const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

let currentSong = 0;
let isPlaying = false;

function loadSong(index){

    audio.src = songs[index].src;

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    highlightSong();
}

loadSong(currentSong);

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fas fa-pause"></i>';
}

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fas fa-play"></i>';
}

playBtn.addEventListener("click",()=>{

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }

});

nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
});

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();
});

audio.addEventListener("timeupdate",()=>{

    const progressPercent =
    (audio.currentTime / audio.duration) * 100;

    progress.value = progressPercent || 0;

    currentTimeEl.textContent =
    formatTime(audio.currentTime);

    durationEl.textContent =
    formatTime(audio.duration);
});

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value / 100) * audio.duration;
});

volume.addEventListener("input",()=>{

    audio.volume = volume.value;
});

function formatTime(time){

    if(isNaN(time)) return "0:00";

    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60);

    if(secs < 10){
        secs = "0" + secs;
    }

    return `${mins}:${secs}`;
}

/* Playlist */

songs.forEach((song,index)=>{

    const li =
    document.createElement("li");

    li.textContent =
    `${song.title} - ${song.artist}`;

    li.addEventListener("click",()=>{

        currentSong = index;

        loadSong(index);

        playSong();
    });

    playlist.appendChild(li);
});

function highlightSong(){

    const items =
    document.querySelectorAll("#playlist li");

    items.forEach(item =>
    item.classList.remove("active-song"));

    if(items[currentSong]){
        items[currentSong]
        .classList.add("active-song");
    }
}

/* Auto Play Next Song */

audio.addEventListener("ended",()=>{

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
});