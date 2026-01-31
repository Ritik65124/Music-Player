document.addEventListener("DOMContentLoaded", () => {

    /* ================== BASIC PLAYER ================== */

    let play = document.getElementById("play");
    let progressBar = document.getElementById("progressBar");
    let audio = new Audio();

    let currentSong = 0; // ✅ FIX: 0 based
    let songOnShuffle = false;
    let songOnRepeat = false;

    /* ================== SONG DATA ================== */

    let songs = [
        { songName: 'Agar Tum Mil', songDes: 'Shreya Ghoshal', songImage: 'Images/1.jpg', songPath: 'Audio/1.mp3', category: 'popular' },
        { songName: 'Aksar Is Duniya', songDes: 'Emraan, Himesh', songImage: 'Images/2.jpg', songPath: 'Audio/2.mp3', category: 'popular' },
        { songName: 'Bahut Pyaar', songDes: 'Anuradha Paudwal', songImage: 'Images/3.jpg', songPath: 'Audio/3.mp3', category: 'popular' },
        { songName: 'Tum Hi Ho', songDes: 'Arijit Singh', songImage: 'Images/6.jpg', songPath: 'Audio/6.mp3', category: 'popular' },
        { songName: 'Kesariya', songDes: 'Arijit Singh', songImage: 'Images/9.jpg', songPath: 'Audio/9.mp3', category: 'popular' },
        { songName: 'Raataan Lambiyan', songDes: 'Jubin Nautiyal', songImage: 'Images/11.jpg', songPath: 'Audio/11.mp3', category: 'popular' },

        { songName: 'Heeriye', songDes: 'Arijit Singh', songImage: 'Images/10.jpg', songPath: 'Audio/10.mp3', category: 'recommended' },
        { songName: 'Apna Bana Le', songDes: 'Arijit Singh', songImage: 'Images/12.jpg', songPath: 'Audio/12.mp3', category: 'recommended' },
        { songName: 'Channa Mereya', songDes: 'Arijit Singh', songImage: 'Images/14.jpg', songPath: 'Audio/14.mp3', category: 'recommended' },
        { songName: 'Hawayein', songDes: 'Arijit Singh', songImage: 'Images/15.jpg', songPath: 'Audio/15.mp3', category: 'recommended' },
        { songName: 'Dil Diyan Gallan', songDes: 'Atif Aslam', songImage: 'Images/16.jpg', songPath: 'Audio/16.mp3', category: 'recommended' },
        { songName: 'Shayad', songDes: 'Arijit Singh', songImage: 'Images/18.jpg', songPath: 'Audio/18.mp3', category: 'recommended' },

        { songName: 'Chhalakata Jawaniya', songDes: 'Pawan Singh', songImage: 'Images/4.jpg', songPath: 'Audio/4.mp3', category: 'recent' },
        { songName: 'Cooler Kurti Mein', songDes: 'Khesari Lal Yadav', songImage: 'Images/5.jpg', songPath: 'Audio/5.mp3', category: 'recent' },
        { songName: 'One Bottle Down', songDes: 'Yo Yo Honey Singh', songImage: 'Images/7.jpg', songPath: 'Audio/7.mp3', category: 'recent' },
        { songName: 'Panche Ke Nache', songDes: 'Bhojpuri', songImage: 'Images/8.jpg', songPath: 'Audio/8.mp3', category: 'recent' },
        { songName: 'Teri Mitti', songDes: 'B Praak', songImage: 'Images/13.jpg', songPath: 'Audio/13.mp3', category: 'recent' },
        { songName: 'Kaise Hua', songDes: 'Vishal Mishra', songImage: 'Images/17.jpg', songPath: 'Audio/17.mp3', category: 'recent' }
    ];


    let order = [...songs];

    /* ================== CREATE SONG CARDS ================== */

    const popularBox = document.getElementById("popularSongs");
    const recommendedBox = document.getElementById("recommendedSongs");
    const recentBox = document.getElementById("recentSongs");

    function createCard(song, index) {
        return `
            <div class="music-card">
                <img src="${song.songImage}">
                <div class="music-play-btn">
                    <i data-index="${index}" class="playMusic fa-solid fa-circle-play"></i>
                </div>
                <div class="img-title">${song.songName}</div>
                <div class="img-description">${song.songDes}</div>
            </div>
        `;
    }

    songs.forEach((song, index) => {
        if (song.category === "popular") popularBox.innerHTML += createCard(song, index);
        if (song.category === "recommended") recommendedBox.innerHTML += createCard(song, index);
        if (song.category === "recent") recentBox.innerHTML += createCard(song, index);
    });

    /* ================== NOW BAR ================== */

    let nowBar = document.querySelector(".nowBar");

    function updateNowBar() {
        nowBar.querySelector("img").src = order[currentSong].songImage;
        nowBar.querySelector(".img-title-info").innerText = order[currentSong].songName;
        nowBar.querySelector(".img-des-info").innerText = order[currentSong].songDes;
    }

    /* ✅ LOAD FIRST SONG */
    audio.src = order[currentSong].songPath;
    updateNowBar();

    /* ================== PLAY / PAUSE ================== */

    play.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            play.classList.replace("fa-circle-play", "fa-circle-pause");
        } else {
            audio.pause();
            play.classList.replace("fa-circle-pause", "fa-circle-play");
        }
    });

    /* ================== PROGRESS BAR ================== */

    audio.addEventListener("timeupdate", () => {
        progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
        progressBar.style.setProperty(
            "--seek-before-width",
            `${progressBar.value}%`
        );

    });

    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value * audio.duration) / 100;
    });

    /* ================== CARD PLAY ================== */

    function makeAllPlay() {
        document.querySelectorAll(".playMusic").forEach(el => {
            el.classList.replace("fa-circle-pause", "fa-circle-play");
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("playMusic")) {
            makeAllPlay();
            currentSong = Number(e.target.dataset.index);

            audio.src = order[currentSong].songPath;
            audio.play();

            e.target.classList.replace("fa-circle-play", "fa-circle-pause");
            play.classList.replace("fa-circle-play", "fa-circle-pause");

            updateNowBar();
        }
    });

    /* ================== NEXT / PREVIOUS ================== */

    document.getElementById("forward").addEventListener("click", () => {
        currentSong = (currentSong + 1) % order.length;
        audio.src = order[currentSong].songPath;
        audio.play();
        updateNowBar();
    });

    document.getElementById("backward").addEventListener("click", () => {
        currentSong = currentSong === 0 ? order.length - 1 : currentSong - 1;
        audio.src = order[currentSong].songPath;
        audio.play();
        updateNowBar();
    });

    /* ================== SHUFFLE / REPEAT ================== */

    const shuffleBtn = document.getElementById("shuffle");
    const repeatBtn = document.getElementById("repeat");

    shuffleBtn.addEventListener("click", () => {
        songOnShuffle = !songOnShuffle;
        songOnRepeat = false;
        shuffleBtn.classList.toggle("active", songOnShuffle);
        repeatBtn.classList.remove("active");
    });

    repeatBtn.addEventListener("click", () => {
        songOnRepeat = !songOnRepeat;
        songOnShuffle = false;
        repeatBtn.classList.toggle("active", songOnRepeat);
        shuffleBtn.classList.remove("active");
    });

    audio.addEventListener("ended", () => {
        if (songOnRepeat) {
            audio.currentTime = 0;
            audio.play();
        } else if (songOnShuffle) {
            currentSong = Math.floor(Math.random() * order.length);
            audio.src = order[currentSong].songPath;
            audio.play();
            updateNowBar();
        } else {
            document.getElementById("forward").click();
        }
    });

    /* ================== SEARCH ================== */

    let searchInput = document.querySelector(".input-box");

    searchInput.addEventListener("input", () => {
        let value = searchInput.value.toLowerCase();
        document.querySelectorAll(".music-card").forEach(card => {
            let title = card.querySelector(".img-title").innerText.toLowerCase();
            let desc = card.querySelector(".img-description").innerText.toLowerCase();
            card.style.display = (title.includes(value) || desc.includes(value)) ? "block" : "none";
        });
    });

    /* ================== HAMBURGER ================== */

    let menuBtn = document.getElementById("menuBtn");
    let sidebar = document.querySelector(".main-left-part");

    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("hide");
    });

});


/* ===== MOBILE SEARCH TOGGLE (ONE AT A TIME) ===== */

const mobileSearchBtn = document.getElementById("mobileSearchBtn");
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector(".input-box");

if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener("click", () => {

        // hide icon
        mobileSearchBtn.style.display = "none";

        // show search bar
        searchBar.classList.add("show-search");
        searchBar.style.display = "flex";

        // focus input -> keyboard open
        searchInput.focus();
    });
}

