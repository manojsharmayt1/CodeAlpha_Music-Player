// Select main elements
let progress_bar = document.getElementById("progress_bar");
let song = document.getElementById("song");
let play_but = document.getElementById("play_but");
const playlistBtn = document.querySelector('.playlist');
const playlistContainer = document.querySelector('.playlist-container');
const playlistOpenBtn = document.querySelector('.playlist .fa-angle-up');
const favIcon = document.querySelector('.fav');

let currentSong = 0;
let favoriteIndexes = [];
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

// Helper: format time
function formatTime(sec) {
    sec = Math.floor(sec);
    let min = Math.floor(sec / 60);
    let s = sec % 60;
    return `${min}:${s < 10 ? '0' : ''}${s}`;
}

// Helper: open playlist
function openPlaylist() {
    playlistContainer.classList.add('show');
    setTimeout(() => {
        playlistContainer.classList.add('fullscreen');
    }, 10);
    renderPlaylist(currentSong, getActiveTab());
}

// Helper: get active tab
function getActiveTab() {
    const activeTab = playlistContainer.querySelector('.playlist-tab.active');
    return activeTab ? activeTab.dataset.tab : 'all';
}

// Render playlist
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
            playlistContainer.querySelectorAll('.playlist-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderPlaylist(currentSong, this.dataset.tab);
        };
    });

    // Close button
    playlistContainer.querySelector('.playlist-close').onclick = function() {
        closePlaylist();
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
    }

    // Render songs
    const scrollArea = playlistContainer.querySelector('.playlist-scroll-area');
    list.forEach((item, i) => {
        const idx = indexMap[i];
        let div = document.createElement('div');
        div.className = 'playlist-item';
        if (idx === currentIdx) {
            div.classList.add('active');
            div.style.setProperty('--active-bg', `url('${item.coverpath}')`);
        }
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

    // --- Drag to close only if at top ---
    let startY = null;
    let isDragging = false;
    scrollArea.addEventListener('touchstart', function(e) {
        if (scrollArea.scrollTop === 0) {
            startY = e.touches[0].clientY;
            isDragging = true;
        } else {
            isDragging = false;
        }
    });
    scrollArea.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        const currentY = e.touches[0].clientY;
        if (currentY - startY > 40) {
            closePlaylist();
            isDragging = false;
        }
    });
    scrollArea.addEventListener('touchend', function() {
        isDragging = false;
    });
    // Mouse support
    scrollArea.addEventListener('mousedown', function(e) {
        if (scrollArea.scrollTop === 0) {
            startY = e.clientY;
            isDragging = true;
        } else {
            isDragging = false;
        }
    });
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        const currentY = e.clientY;
        if (currentY - startY > 40) {
            closePlaylist();
            isDragging = false;
        }
    });
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
}

// Song load karne ka function
function loadSong(index) {
    currentSong = index;
    song.src = playlist[index].src;
    song.load();
    play_but.classList.remove("fa-play");
    play_but.classList.add("fa-pause");
    document.querySelector('.music h1').textContent = playlist[index].title;
    document.querySelector('.music p').textContent = playlist[index].artist;
    document.getElementById('img').src = playlist[index].coverpath;
    document.getElementById('bg_img').src = playlist[index].bgpath;
    renderPlaylist(currentSong, getActiveTab());
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
    play_but.classList.remove("fa-pause");
    play_but.classList.add("fa-play");
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

volumeLow.addEventListener('click', function() {
    let newVolume = Math.max(0, song.volume - 0.1);
    song.volume = newVolume;
    volumeBar.value = newVolume * 100;
});
volumeHigh.addEventListener('click', function() {
    let newVolume = Math.min(1, song.volume + 0.1);
    song.volume = newVolume;
    volumeBar.value = newVolume * 100;
});
volumeBar.addEventListener('input', function() {
    song.volume = this.value / 100;
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

prevBtn.addEventListener('click', function() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    song.play();
    play_but.classList.remove("fa-play");
    play_but.classList.add("fa-pause");
});
nextBtn.addEventListener('click', function() {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    song.play();
    play_but.classList.remove("fa-play");
    play_but.classList.add("fa-pause");
});

// Repeat button ko select karo
const repeatBtn = document.querySelector('.repeat');
repeatBtn.addEventListener('click', function() {
    repeatBtn.classList.toggle('active');
    song.loop = repeatBtn.classList.contains('active');
});

// Shuffle button ko select karo
const shuffleBtn = document.querySelector('.shufle');
let isShuffle = false;
shuffleBtn.addEventListener('click', function() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
});

// Jab song khatam ho
song.onended = function() {
    if (isShuffle) {
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
        currentSong = (currentSong + 1) % playlist.length;
        loadSong(currentSong);
        song.play();
        play_but.classList.remove("fa-play");
        play_but.classList.add("fa-pause");
    }
};

// Favorite (heart) icon logic
favIcon.addEventListener('click', function() {
    if (song.src && playlist[currentSong]) {
        if (favoriteIndexes.includes(currentSong)) {
            favoriteIndexes = favoriteIndexes.filter(idx => idx !== currentSong);
            favIcon.classList.remove('fa-solid');
            favIcon.classList.add('fa-regular');
        } else {
            favoriteIndexes.push(currentSong);
            favIcon.classList.remove('fa-regular');
            favIcon.classList.add('fa-solid');
        }
        // If the Favorite tab is active, re-render the playlist
        const activeTab = playlistContainer.querySelector('.playlist-tab.active');
        if (activeTab && activeTab.dataset.tab === 'favorite') {
            renderPlaylist(currentSong, 'favorite');
        }
    }
});

// Open playlist on up-arrow click
playlistOpenBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    openPlaylist();
});

// Progress bar and time update
const currentTimeSpan = document.querySelector('.time .current');
const durationSpan = document.querySelector('.time .duration');
song.ontimeupdate = function() {
    progress_bar.value = song.currentTime;
    currentTimeSpan.textContent = formatTime(song.currentTime);
};
song.onloadedmetadata = function() {
    progress_bar.max = song.duration;
    progress_bar.value = song.currentTime;
    durationSpan.textContent = formatTime(song.duration);
    currentTimeSpan.textContent = formatTime(song.currentTime);
};

let dragStartY = null;
let dragging = false;

// Touch events (mobile)
playlistBtn.addEventListener('touchstart', function(e) {
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

// Mouse events (desktop)
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

function closePlaylist() {
    playlistContainer.classList.add('closing');
    playlistContainer.classList.remove('fullscreen');
    setTimeout(() => {
        playlistContainer.classList.remove('show');
        playlistContainer.classList.remove('closing');
    }, 500); // Match the transition duration
}