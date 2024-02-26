const playlistContainerTag = document.getElementsByClassName("playlistContainer")[0];

const audioTag = document.getElementsByClassName("audioTag")[0];
const tracks = [
    {trackId : "music/track1.mp3", title: "December night"},
    {trackId : "music/track2.mp3", title: "Hello world"},
    {trackId : "music/track3.mp3", title: "Gone"},
    {trackId : "music/track4.mp3", title: "Love"},
];

for (let i = 0;i < tracks.length; i++){
    const tracksTag = document.createElement("div");
    tracksTag.addEventListener("click", () =>{
        const trackId = tracks[i].trackId;
        audioTag.src = trackId;
        audioTag.play();
    })
    tracksTag.classList.add("trackItem");
    const title = (i + 1).toString()+ ". "+ tracks[i].title;
    tracksTag.textContent = title;
    playlistContainerTag.append(tracksTag);

};