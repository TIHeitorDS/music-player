import { musicData } from "../seed/music.js";

const musicPlayer = document.querySelector("[data-music-player]");
const musicCover = document.querySelector("[data-music-cover]");
const musicTitle = document.querySelector("[data-music-title]");
const musicArtist = document.querySelector("[data-music-artist]");
const musicSource = document.querySelector("[data-music]");
const pauseBtn = document.querySelector("[data-pause-btn]");
const playBtn = document.querySelector("[data-play-btn]");
const nextBtn = document.querySelector("[data-next-btn]");
const prevBtn = document.querySelector("[data-prev-btn]");
const currentBar = document.querySelector(".current-bar");
const timeStamps = document.querySelectorAll(".time-stamps p");
const muteBtn = document.querySelector("[data-mute-btn]");
const volumeSlider = document.querySelector(".volume-slider");

let currentMusic = 0;
let lastVolume = 1;

function loadMusic() {
  const music = musicData[currentMusic];

  musicCover.src = music.cover;
  musicCover.alt = `Capa da múscia ${music.title} de ${music.artist}`;
  musicTitle.textContent = music.title;
  musicArtist.textContent = music.artist;
  musicSource.src = music.audio;
  musicPlayer.load();
}

loadMusic();

playBtn.addEventListener("click", () => {
  if (musicPlayer.paused) {
    musicPlayer.play();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  } else {
    musicPlayer.pause();
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  }
});

pauseBtn.addEventListener("click", () => {
  if (!musicPlayer.paused) {
    musicPlayer.pause();
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  } else {
    musicPlayer.play();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  }
});

musicPlayer.addEventListener("timeupdate", () => {
  const { currentTime, duration } = musicPlayer;
  const progressPercent = (currentTime / duration) * 100;
  currentBar.style.width = `${progressPercent}%`;

  const minutesDuration = Math.floor(duration / 60) || 0;
  const secondsDuration = Math.floor(duration % 60) || 0;
  const minutesCurrent = Math.floor(currentTime / 60) || 0;
  const secondsCurrent = Math.floor(currentTime % 60) || 0;

  timeStamps[0].textContent = `${String(minutesCurrent).padStart(
    2,
    "0"
  )}:${String(secondsCurrent).padStart(2, "0")}`;
  timeStamps[1].textContent = `${String(minutesDuration).padStart(
    2,
    "0"
  )}:${String(secondsDuration).padStart(2, "0")}`;
});

nextBtn.addEventListener("click", () => {
  currentMusic++;
  if (currentMusic >= musicData.length) {
    currentMusic = 0;
  }
  loadMusic();
  musicPlayer.play();
});

prevBtn.addEventListener("click", () => {
  currentMusic--;
  if (currentMusic < 0) {
    currentMusic = musicData.length - 1;
  }
  loadMusic();
  musicPlayer.play();
});

musicPlayer.addEventListener("play", () => {
  playBtn.classList.add("pause");
});

volumeSlider.addEventListener("input", (e) => {
  musicPlayer.volume = e.target.value;
  if (musicPlayer.volume === 0) {
    musicPlayer.muted = true;
  } else {
    musicPlayer.muted = false;
    lastVolume = musicPlayer.volume;
  }
});

muteBtn.addEventListener("click", () => {
  if (musicPlayer.muted || musicPlayer.volume === 0) {
    musicPlayer.muted = false;
    musicPlayer.volume = lastVolume;
    volumeSlider.value = lastVolume;
  } else {
    musicPlayer.muted = true;
    musicPlayer.volume = 0;
    volumeSlider.value = 0;
  }
});
