// Progress bar, audio element, and play button ko select karo
let progress_bar = document.getElementById("progress_bar");
let song = document.getElementById("song");
let play_but = document.getElementById("play_but");

// Playlist show/hide button aur container ko select karo
const playlistBtn = document.querySelector('.playlist');
const playlistContainer = document.querySelector('.playlist-container');
const playlistOpenBtn = document.querySelector('.playlist .fa-angle-up');

// --- Drag up to open playlist (footer area) ---

let dragStartY = null;
let dragging = false;

// Touch events (mobile) for opening playlist
playlistBtn.addEventListener('touchstart', function(e) {
    if (e.touches.length !== 1) return;
    dragStartY = e.touches[0].clientY;
    dragging = true;
});
playlistBtn.addEventListener('touchmove', function(e) {
    if (!dragging) return;
    const currentY = e.touches[0].clientY;
    if (dragStartY - currentY > 40) { // Drag up by 40px
        openPlaylist();
        dragging = false;
    }
});
playlistBtn.addEventListener('touchend', function() {
    dragging = false;
});

// Mouse events (desktop) for opening playlist
playlistBtn.addEventListener('mousedown', function(e) {
    dragStartY = e.clientY;
    dragging = true;
});
document.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    const currentY = e.clientY;
    if (dragStartY - currentY > 40) { // Drag up by 40px
        openPlaylist();
        dragging = false;
    }
});
document.addEventListener('mouseup', function() {
    dragging = false;
});

// Helper to open playlist (slide up)
function openPlaylist() {
    playlistContainer.style.display = 'flex';
    setTimeout(() => {
        playlistContainer.classList.add('fullscreen');
    }, 10);
}

// --- Drag down to close playlist (on playlist-container) ---

let startY = null;
let isDragging = false;

// Touch events (mobile) for closing playlist
playlistContainer.addEventListener('touchstart', function(e) {
    if (!playlistContainer.classList.contains('fullscreen')) return;
    startY = e.touches[0].clientY;
    isDragging = true;
});
playlistContainer.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - startY;
    if (diffY > 60) { // 60px drag threshold
        playlistContainer.classList.remove('fullscreen');
        setTimeout(() => {
            playlistContainer.style.display = 'none';
        }, 500);
        isDragging = false;
    }
});
playlistContainer.addEventListener('touchend', function() {
    isDragging = false;
});

// Mouse events (desktop) for closing playlist
playlistContainer.addEventListener('mousedown', function(e) {
    if (!playlistContainer.classList.contains('fullscreen')) return;
    startY = e.clientY;
    isDragging = true;
});
playlistContainer.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    const currentY = e.clientY;
    const diffY = currentY - startY;
    if (diffY > 60) {
        playlistContainer.classList.remove('fullscreen');
        setTimeout(() => {
            playlistContainer.style.display = 'none';
        }, 500);
        isDragging = false;
    }
});
playlistContainer.addEventListener('mouseup', function() {
    isDragging = false;
});

// --- Playlist render and player logic ---

// Playlist array
const playlist = [
    {
        src: "Song/1.m4a",
        title: "Jaane Ja",
        artist: "TJ Chahal",
        coverpath: "Music_Covers/1.jpg",
        bgpath: "Music_Covers/1.jpg"
    },
    {
        src: "Song/2.m4a",
        title: "Humdum",
        artist: "Aditya Rikhari",
        coverpath: "Music_Covers/2.jpg",
        bgpath: "Music_Covers/2.jpg"
    },
    {
        src: "Song/3.m4a",
        title: "Safar",
        artist: "Juss, Mixsingh",
        coverpath: "Music_Covers/3.jpg",
        bgpath: "Music_Covers/3.jpg"
    },
    {
        src: "Song/4.m4a",
        title: "Janiye",
        artist: "Vishal Mishra",
        coverpath: "Music_Covers/4.jpg",
        bgpath: "Music_Covers/4.jpg"
    },
    {
        src: "Song/5.m4a",
        title: "Qatal",
        artist: "Guru Randhawa, Sanjoy, Gill Machhrai",
        coverpath: "Music_Covers/5.jpg",
        bgpath: "Music_Covers/5.jpg"
    },
    {
        src: "Song/6.m4a",
        title: "Hass Hass",
        artist: "Diljit Dosanjh, Sia, Greg Kurstin",
        coverpath: "Music_Covers/6.jpg",
        bgpath: "Music_Covers/6.jpg"
    },
    {
        src: "Song/7.m4a",
        title: "Till The End",
        artist: "King, NEXA Music",
        coverpath: "Music_Covers/7.jpg",
        bgpath: "Music_Covers/7.jpg"
    },
    {
        src: "Song/8.m4a",
        title: "Haseen",
        artist: "Talwlinder, NDS, Rippy Grewal",
        coverpath: "Music_Covers/8.jpg",
        bgpath: "Music_Covers/8.jpg"
    },
    {
        src: "Song/9.m4a",
        title: "Nasha",
        artist: "Vision & talwlinder",
        coverpath: "Music_Covers/9.jpg",
        bgpath: "Music_Covers/9.jpg"
    },
    {
        src: "Song/10.m4a",
        title: "Samjho Na",
        artist: "Aditya Rikhari",
        coverpath: "Music_Covers/10.jpg",
        bgpath: "Music_Covers/10.jpg"
    },
    {
        src: "Song/11.m4a",
        title: "Mi Amor",
        artist: "Sharn, THE Paul",
        coverpath: "Music_Covers/11.jpg",
        bgpath: "Music_Covers/11.jpg"
    },
    {
        src: "Song/12.m4a",
        title: "Jhol",
        artist: "Maanu, Annural Khalid",
        coverpath: "Music_Covers/12.jpg",
        bgpath: "Music_Covers/12.jpg"
    },
    {
        src: "Song/13.m4a",
        title: "Talwinder",
        artist: "Raiyan, Twinkle Thareja",
        coverpath: "Music_Covers/13.jpg",
        bgpath: "Music_Covers/13.jpg"
    },
    {
        src: "Song/14.m4a",
        title: "Wishes",
        artist: "Hasan Raheem, Umair, Talwlinder",
        coverpath: "Music_Covers/14.jpg",
        bgpath: "Music_Covers/14.jpg"
    },
    {
        src: "Song/15.m4a",
        title: "Nasamajh",
        artist: "Aditya Rikhari",
        coverpath: "Music_Covers/15.jpg",
        bgpath: "Music_Covers/15.jpg"
    },
];
let currentSong = 0;

// Favorite indexes array
let favoriteIndexes = [];

// Custom playlist indexes array
let customPlaylistIndexes = [];

// Render playlist items in the playlist container
function renderPlaylist(currentIdx, mode = 'all') {
    // Set the title based on the mode
    let titleText = 'All Songs';
    if (mode === 'favorite') titleText = 'Favorite';

    playlistContainer.innerHTML = `
        <div class="playlist-header">
            <div class="playlist-tabs">
                <button class="playlist-tab${mode === 'all' ? ' active' : ''}" data-tab="all">All Songs</button>
                <button class="playlist-tab${mode === 'favorite' ? ' active' : ''}" data-tab="favorite">Favorite</button>
            </div>
            <span class="playlist-title">${titleText}</span>
            <i class="fa-solid fa-xmark playlist-close"></i>
        </div>
        <div class="playlist-scroll-area"></div>
    `;

    // Tab switching
    playlistContainer.querySelectorAll('.playlist-tab').forEach(tab => {
        tab.onclick = function() {
            renderPlaylist(currentSong, this.dataset.tab);
        };
    });

    // Close button
    playlistContainer.querySelector('.playlist-close').onclick = function() {
        playlistContainer.classList.remove('fullscreen');
        setTimeout(() => {
            playlistContainer.classList.remove('show');
        }, 500);
    };

    // Determine which list to show
    let list = [];
    let indexMap = [];
    if (mode === 'all') {
        list = playlist;
        indexMap = playlist.map((_, idx) => idx);
    } else if (mode === 'favorite') {
        list = playlist.filter((_, idx) => favoriteIndexes.includes(idx));
        indexMap = favoriteIndexes.slice();
    } else if (mode === 'custom') {
        list = playlist.filter((_, idx) => customPlaylistIndexes.includes(idx));
        indexMap = customPlaylistIndexes.slice();
    }

    // Render songs
    const scrollArea = playlistContainer.querySelector('.playlist-scroll-area');
    list.forEach((item, idx) => {
        let div = document.createElement('div');
        div.className = 'playlist-item';
        if (idx === currentIdx) div.classList.add('active');
        div.innerHTML = `
            <img class="playlist-song-cover" src="${item.coverpath}" alt="cover">
            <div class="playlist-info">
                <div class="playlist-song_name">${item.title}</div>
                <div class="playlist-artist">${item.artist}</div>
            </div>
            <div class="playlist-duration-block">
                <div class="playlist-duration" id="playlist-duration-${idx}">
                    ${idx === currentIdx ? '<i class="fa-solid fa-chart-simple"></i>' : '--:--'}
                </div>
            </div>
        `;
        div.onclick = function(e) {
            // Prevent click if add-to-custom button is clicked
            if (e.target.classList.contains('add-to-custom')) return;
            loadSong(idx);
            song.play();
            play_but.classList.remove("fa-play");
            play_but.classList.add("fa-pause");
            playlistContainer.classList.remove('fullscreen');
            setTimeout(() => {
                playlistContainer.classList.remove('show');
            }, 500);
            renderPlaylist(idx, mode);
        };
        scrollArea.appendChild(div);

        // Only load duration for non-active songs
        if (idx !== currentIdx) {
            let audio = new Audio();
            audio.src = item.src;
            audio.addEventListener('loadedmetadata', function() {
                const durationSpan = document.getElementById(`playlist-duration-${idx}`);
                if (durationSpan) {
                    durationSpan.textContent = formatTime(audio.duration);
                }
            });
        }
    });
}

// Call this function after loading a song or when opening the playlist
renderPlaylist(currentSong);

// Song load karne ka function
function loadSong(index) {
    currentSong = index;
    song.src = playlist[index].src;
    song.load();
    play_but.classList.remove("fa-play");
    play_but.classList.add("fa-pause");
    // Song info update karo
    document.querySelector('.music h1').textContent = playlist[index].title;
    document.querySelector('.music p').textContent = playlist[index].artist;
    // Song image update karo
    document.getElementById('img').src = playlist[index].coverpath;
    // Background image update karo
    document.getElementById('bg_img').src = playlist[index].bgpath;
    renderPlaylist(currentSong);

    // Update heart icon state
    if (favoriteIndexes.includes(index)) {
        favIcon.classList.remove('fa-regular');
        favIcon.classList.add('fa-solid');
    } else {
        favIcon.classList.remove('fa-solid');
        favIcon.classList.add('fa-regular');
    }
}

// Page load par pehla song set karo
window.onload = function() {
    loadSong(0);
    // Play button ko default state par set karo
    play_but.classList.remove("fa-pause");
    play_but.classList.add("fa-play");
};

const currentTimeSpan = document.querySelector('.time .current');
const durationSpan = document.querySelector('.time .duration');

// Time ko mm:ss format me convert karne ka helper
function formatTime(sec) {
    sec = Math.floor(sec);
    let min = Math.floor(sec / 60);
    let s = sec % 60;
    return `${min}:${s < 10 ? '0' : ''}${s}`;
}

// Range bar (progress/volume) ka color set karne ka function
function setRangeBarColor(bar, value, max) {
    const percent = (value / max) * 100;
    bar.style.background = `linear-gradient(to right, #fff 0%, #fff ${percent}%, #444 ${percent}%, #444 100%)`;
}

// Song play hote waqt progress bar aur current time update karo
song.ontimeupdate = function() {
    progress_bar.value = song.currentTime;
    setRangeBarColor(progress_bar, song.currentTime, song.duration);
    currentTimeSpan.textContent = formatTime(song.currentTime);
};

// Jab song metadata load ho, duration aur progress bar set karo
song.onloadedmetadata = function() {
    progress_bar.max = song.duration;
    progress_bar.value = song.currentTime;
    setRangeBarColor(progress_bar, song.currentTime, song.duration);
    durationSpan.textContent = formatTime(song.duration);
    currentTimeSpan.textContent = formatTime(song.currentTime);
};

// Play/Pause button ka kaam
function PlayPause() {
    if (play_but.classList.contains("fa-pause")) {
        song.pause();
        play_but.classList.remove("fa-pause");
        play_but.classList.add("fa-play");
    }
    else {
        song.play();
        play_but.classList.remove("fa-play");
        play_but.classList.add("fa-pause");
    }
}

// Volume control elements ko select karo
const volumeBar = document.querySelector('.volume_bar');
const volumeLow = document.querySelector('.fa-volume-low');
const volumeHigh = document.querySelector('.fa-volume-high');

// Volume kam karne ka button (10% kam)
volumeLow.addEventListener('click', function() {
    let newVolume = Math.max(0, song.volume - 0.1);
    song.volume = newVolume;
    volumeBar.value = newVolume * 100;
    setRangeBarColor(volumeBar, newVolume * 100, 100, '#f7b207');
});

// Volume zyada karne ka button (10% zyada)
volumeHigh.addEventListener('click', function() {
    let newVolume = Math.min(1, song.volume + 0.1);
    song.volume = newVolume;
    volumeBar.value = newVolume * 100;
    setRangeBarColor(volumeBar, newVolume * 100, 100, '#f7b207');
});

// Volume slider se bhi volume control ho
volumeBar.addEventListener('input', function() {
    song.volume = this.value / 100;
    setRangeBarColor(volumeBar, this.value, 100, '#f7b207');
});

// Progress bar se song ko seek karo
progress_bar.onchange = function() {
    song.play();
    song.currentTime = progress_bar.value;
    play_but.classList.remove("fa-play");
    play_but.classList.add("fa-pause");
}

// Previous/Next buttons ko select karo
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Previous song button ka kaam
prevBtn.addEventListener('click', function() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    song.play();
    play_but.classList.remove("fa-play");
    play_but.classList.add("fa-pause");
});

// Next song button ka kaam
nextBtn.addEventListener('click', function() {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    song.play();
    play_but.classList.remove("fa-play");
    play_but.classList.add("fa-pause");
});

// Repeat button ko select karo
const repeatBtn = document.querySelector('.repeat');

// Repeat button par click par loop toggle karo
repeatBtn.addEventListener('click', function() {
    // Active class toggle karo
    repeatBtn.classList.toggle('active');
    // Agar active hai to loop on, warna off
    song.loop = repeatBtn.classList.contains('active');
});

// Shuffle button ko select karo
const shuffleBtn = document.querySelector('.shufle');
let isShuffle = false;

// Shuffle icon par click par color change aur shuffle mode toggle karo
shuffleBtn.addEventListener('click', function() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
});

// Jab song khatam ho
song.onended = function() {
    if (isShuffle) {
        // Random song play karo (current song ke alawa)
        let next;
        do {
            next = Math.floor(Math.random() * playlist.length);
        } while (next === currentSong && playlist.length > 1);
        currentSong = next;
        loadSong(currentSong);
        song.play();
        play_but.classList.remove("fa-play");
        play_but.classList.add("fa-pause");
    } else {
        // Normal next song
        currentSong = (currentSong + 1) % playlist.length;
        loadSong(currentSong);
        song.play();
        play_but.classList.remove("fa-play");
        play_but.classList.add("fa-pause");
    }
};

// Favorite (heart) icon ko select karo
const favIcon = document.querySelector('.fav');

// Heart icon par click par icon toggle karo (filled/empty)
favIcon.addEventListener('click', function() {
    if (song.src && playlist[currentSong]) {
        if (favoriteIndexes.includes(currentSong)) {
            // Remove from favorites
            favoriteIndexes = favoriteIndexes.filter(idx => idx !== currentSong);
            favIcon.classList.remove('fa-solid');
            favIcon.classList.add('fa-regular');
        } else {
            // Add to favorites
            favoriteIndexes.push(currentSong);
            favIcon.classList.remove('fa-regular');
            favIcon.classList.add('fa-solid');
        }
        // If the Favorite tab is active, re-render the playlist
        const activeTab = document.querySelector('.playlist-tab.active');
        if (activeTab && activeTab.dataset.tab === 'favorite') {
            renderPlaylist(currentSong, 'favorite');
        }
    }
});

playlistOpenBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    openPlaylist();
});