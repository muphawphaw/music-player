const playlistContainerTag = document.getElementsByClassName("playlistContainer")[0];

const audioTag = document.getElementsByClassName("audioTag")[0];

const currentTimeAndDurationTag = document.getElementsByClassName("currentAndTotalTime")[0];

const currentProgressTag= document.getElementById("currentProgress");

const playButtonTag = document.getElementsByClassName("playButton")[0];

const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];

const previousButtonTag = document.getElementsByClassName("previousButton")[0];

const nextButtonTag = document.getElementsByClassName("nextButton")[0];
const tracks = [
    {trackId : "music/track1.mp3", title: "December night"},
    {trackId : "music/track2.mp3", title: "Hello world"},
    {trackId : "music/track3.mp3", title: "Gone"},
    {trackId : "music/track4.mp3", title: "Love"},
];

for (let i = 0;i < tracks.length; i++){
    const tracksTag = document.createElement("div");
    tracksTag.addEventListener("click", () =>{
        currentPlayingIndex = i;
        playSong();
    })
    tracksTag.classList.add("trackItem");
    const title = (i + 1).toString()+ ". "+ tracks[i].title;
    tracksTag.textContent = title;
    playlistContainerTag.append(tracksTag);
    
};

let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => { //fire event
    duration = Math.floor(audioTag.duration); // without milisec
    durationText = minuteAndSecondText(duration);
});

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentText = minuteAndSecondText(currentTime);
    const currentAndDurationText = currentText + "/" +durationText;
    currentTimeAndDurationTag.textContent = currentAndDurationText;
    updateCurrentProgress(currentTime);
});

const updateCurrentProgress = (currentTime) =>{
   const currentProgressWidth = (500/duration) * currentTime;
   currentProgressTag.style.width = currentProgressWidth.toString() + "px"; // js to css
}

const minuteAndSecondText = (totalTime) => {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    const minuteText = minutes < 10 ? "0" +minutes.toString() : minutes;
    const secondsText = seconds < 10 ? "0" +seconds.toString() : seconds;
    return minuteText + ":" + secondsText;
};

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", ()=>{
    const currentTime = Math.floor(audioTag.currenTime);
    isPlaying= true;
    if (currentTime === 0){
        playSong();  
    }else{
        audioTag.play();
        updatePlayAndPauseButton();
    };
});

pauseButtonTag.addEventListener("click",() => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
})

previousButtonTag.addEventListener("click", () => {
    if(currentPlayingIndex === 0){
        return;
    }else{
        currentPlayingIndex -= 1;
        playSong();
    }
});

nextButtonTag.addEventListener("click", () => {
    if(currentPlayingIndex === tracks.length -1){
        return;
    }else{
        currentPlayingIndex += 1;
        playSong();
    }
})
const playSong=()=>{
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying= true;
    updatePlayAndPauseButton();
}
const updatePlayAndPauseButton= () => {
    if(isPlaying){
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    }else{
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
}