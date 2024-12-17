const playlistContainer = document.getElementById("playlist");

const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const shuffleButton = document.getElementById("shuffle");

const songNameDisplay = document.querySelector(".display-text h2");
const artistNameDisplay = document.querySelector(".display-text p");

function yellowOrWhitePlayButton(bool) {
    if (bool) {
        // Make the PLay Button Yellow
        playButton.querySelector("img").src="img/svg/play-yellow.svg";

    } else {
        // Make the PLay Button Yellow
        playButton.querySelector("img").src="img/svg/play.svg";

    }
}

let wasCurrentSongDeleted = false;
// WEB Audio API
const audio = new Audio();

const goToPreviousSong = () => {
    if (!userData?.currentSong || getCurrentSongIndex(userData.currentSong) === 0) return;
    playSong(userData.songs[getCurrentSongIndex(userData.currentSong) - 1].id);
}

const pauseSong = () => {
    audio.pause();
    userData.currentSongTime = audio.currentTime;
    yellowOrWhitePlayButton(0);
}
const goToNextSong = () => {
    if (!userData?.currentSong) {
        playSong(userData.songs[0].id);
    } else {
        const currentSongIndex = getCurrentSongIndex();
        if ((userData.songs.length - 1) > currentSongIndex) {
            playSong(userData.songs[currentSongIndex + 1].id);
        }

    }
}
const shuffleSongs = () => {
    userData.currentSong = null;
    clearSongDetails();
    clearPlaylistContainer();
    displaySongs("random");
    audio.pause();
    yellowOrWhitePlayButton(0);
}
const playSong = (id) => {

    // Revert backgroundColor
    if (userData.currentSong && !wasCurrentSongDeleted) {
        playlistContainer.querySelector(`#song-${userData.currentSong.id}`).style.backgroundColor = "#3B3B4F";
    }
    wasCurrentSongDeleted = false;
    // Find the song to be played.
    const song = userData?.songs.find(song => song.id === id);

    audio.src = song.src;
    audio.title = song.title

    // The song should play from beginning if it is the selected song
    if (!userData?.currentSong || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;

        // The song should start from where it stopped
    } else {
        audio.currentTime = userData?.currentSongTime;
    }

    userData.currentSong = song;

    yellowOrWhitePlayButton(1);

    highlightPlayingSong(song);

    displaySongDetails();

    audio.play();
}
// EVENT LISTENERS

playButton.addEventListener('click', () => {
    if (!userData?.currentSong) {
        playSong(userData.songs[0].id);
    } else {
        playSong(userData.currentSong.id);
    }
});
previousButton.addEventListener('click', goToPreviousSong);
pauseButton.addEventListener('click', pauseSong);
nextButton.addEventListener('click', goToNextSong);
shuffleButton.addEventListener('click', shuffleSongs);


const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
    },
    {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    },
    {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    },
    {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    },
    {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    },
    {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    },
];

const userData = {
    songs: [...allSongs],
    currentSong: null,
    currentSongTime: 0
};

displaySongs("ascending");


///////////HELPER FUNCTIONS/////////////////////////////////////////////////////////////
function sortSongs(songArray, direction) {
    let sortedArray = null;

    if(direction === "ascending") {
        sortedArray = userData.songs.toSorted((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        })
    }

    else if (direction === "descending") {
       sortedArray = userData.songs.toSorted((a, b) => {
            if (a.title > b.title) return -1;
            if (a.title < b.title) return 1;
            return 0;
        })

    }
    else if (direction === "random") {
        // This randomizes an array by returning a mix of positive and negative values to the sort fn.
        sortedArray = userData.songs.toSorted(() => Math.random() - 0.5);
    }

    if (sortedArray) return sortedArray;
    else return songArray
}

function highlightPlayingSong(playingSong) {
    playlistContainer.querySelector(`#song-${playingSong.id}`).style.backgroundColor = "#1B1B32";
}

function displaySongDetails() {
    const currentArtist = userData?.currentSong?.artist;
    const currentTitle = userData?.currentSong?.title;

    // textContent should be used over innerText whenever possible
    songNameDisplay.textContent = currentTitle ? currentTitle : "";
    artistNameDisplay.textContent = currentArtist ? currentArtist : "";
}

function clearSongDetails() {
    songNameDisplay.innerText = "";
    artistNameDisplay.innerText = "";
}

function selectDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete");

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', deleteSong);
    });
}

function displaySongs(direction) {
    const sortedSongs = sortSongs(userData.songs, direction);
    sortedSongs.forEach(song => {

    const HTMLString = `
    <li id="song-${song.id}">
        <div class="song-title-artist" onclick="playSong(${song.id})">
            <p>${song.title}</p>
            <div>
                <span>${song.artist}</span>
                <span>${song.duration}</span>
            </div>
        </div>
        <button class="delete ${song.id}" type="button" aria-label="Delete">
            <img id="${song.id}" src="../img/svg/delete.svg" alt=""/>
        </button>
    </li>
    `;
    playlistContainer.innerHTML += HTMLString;
})
    selectDeleteButtons();

    userData.songs = sortedSongs;
}

function clearPlaylistContainer() {
    playlistContainer.innerHTML = "";
}

function getCurrentSongIndex(song) {
    if (song) return userData.songs.indexOf(song);
    return userData.songs.indexOf(userData.currentSong);
}

function deleteSong(e) {

    const songToDelete = findSongToDelete();
    const songToDeleteIndex = getCurrentSongIndex(songToDelete);
    deleteSongFromSongsArray();
    clearPlaylistContainer();
    displaySongs();

    // Checks whether song to be deleted is currently playing
    if (songToDelete.src === audio.src) {
        wasCurrentSongDeleted = true;
        audio.pause();
        goToNextSong();
        return;
    }

    highlightPlayingSong(userData.currentSong);
    // TODO: FINISH RESET BUTTON
    // Do this when the playlist is empty
    if (userData?.songs.length === 0) {

        // Create an element using JS
        const resetButton = document.createElement("div");
        const resetText = document.createTextNode("Reset Playlist");

        resetButton.id = "reset";
        resetButton.ariaLabel = "Reset playlist";

        resetButton.appendChild(resetText);
        playlistContainer.appendChild(resetButton);

        resetButton.addEventListener('click', () => {
            userData.songs = [...allSongs];
            displaySongs("ascending");
        })
    }


    function findSongToDelete() {
        let songToReturn = null;
        userData?.songs?.forEach(song => {
            if (song.id === Number(e.target.id)) {
                songToReturn = song;
            }
        })
        return songToReturn;
    }


    function deleteSongFromSongsArray() {
        // Returns songs array without deleted song
        userData.songs.splice(songToDeleteIndex, 1);
    }

    //displaySongs method without direction parameter, makes no changes to sort.

}

//TODO: Next song should play after current song ends, until the end of the playlist