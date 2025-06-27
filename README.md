# Music Player

A modern, responsive web-based music player built with HTML, CSS, and JavaScript.

---

## Features

- **Play/Pause, Next, Previous, Shuffle, Repeat:**  
  Full control over playback with intuitive buttons and keyboard/mouse/touch support.

- **Volume Control:**  
  Adjust volume with a slider or quick-access icons for mute/max.

- **Progress Bar:**  
  See and seek the current position in the song. Displays elapsed and total time.

- **Playlist Popup:**  
  - **All Songs Tab:** View and play all available songs.
  - **Favorite Tab:** Add/remove songs to your favorites and play them easily.
  - **Song Details:** Each item shows cover image, song name, artist, and duration.
  - **Current Song Highlight:** The currently playing song is visually highlighted, and its cover image appears as a subtle background in the playlist.
  - **Click to Play:** Instantly play any song by clicking it in the playlist.

- **Favorite (Heart) Icon:**  
  Add or remove the currently playing song from your favorites with a single click.

- **Responsive Design:**  
  Works beautifully on both desktop and mobile devices.

- **Visual Effects:**  
  - Blurred background image for the player.
  - Animated transitions for playlist popup and controls.
  - Custom scrollbar for playlist.

---

## Folder Structure

```
Music Player/
├── index.html          # Main HTML file
├── style.css           # All styles for the player and playlist
├── script.js           # All player and playlist logic
├── Song/               # Folder for your audio files
│   ├── 1.m4a
│   ├── 2.m4a
│   └── ... (add more songs)
├── Music_Covers/       # Folder for your cover images
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ... (add more covers)
```

---

## How to Use

1. **Add Your Songs and Covers:**
   - Place your audio files in the `Song/` folder.
   - Place your cover images in the `Music_Covers/` folder.

2. **Configure the Playlist:**
   - Open `script.js`.
   - Update the `playlist` array with the correct `src`, `title`, `artist`, and `coverpath` for each song.
   - Example:
     ```javascript
     {
       src: "Song/1.m4a",
       title: "Song Title",
       artist: "Artist Name",
       coverpath: "Music_Covers/1.jpg"
     }
     ```

3. **Open the Player:**
   - Open `index.html` in your browser.
   - Enjoy your music!

---

## Customization

- **Change Colors or Layout:**  
  Edit `style.css` to adjust backgrounds, fonts, and layout.

- **Add More Features:**  
  The code is modular and commented. You can add new tabs, playlists, or effects as you like.

- **Change Playlist Logic:**  
  You can modify how favorites work, add more playlists, or change the way songs are loaded.

---

## Troubleshooting

- **No Sound?**
  - Make sure your audio files are in the correct folder and the paths in `script.js` are correct.
  - Check your browser’s console for errors.
  - Some browsers block autoplay; try clicking the play button manually.

- **Playlist Not Showing?**
  - Make sure you have the correct HTML structure and the playlist popup is not hidden by CSS.

- **Cover Images Not Showing?**
  - Check that the `coverpath` in your `playlist` array matches the actual image file name and path.

---

## Credits

- [FontAwesome](https://fontawesome.com/) for icons
- Inspired by modern mobile music apps

---

## Screenshots

> _Add screenshots here if you want to show off your player’s look!_

---

Enjoy your music!  
_— Your Music Player