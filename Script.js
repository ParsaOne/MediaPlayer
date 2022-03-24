
let MediaPlayer = document.querySelector('.MP');
let Media = MediaPlayer.querySelector('#VideoSRC');
let MPControls = MediaPlayer.querySelector('.MPC');

let MPBar = MPControls.querySelector('.MPCPBC');

let BW_F = MPControls.querySelector('.BW_F');
let BW = MPControls.querySelector('.BW');
let Play = MPControls.querySelector('.Play');
    let PIcon = Play.querySelector('i');
let FW = MPControls.querySelector('.FW');
let FW_F = MPControls.querySelector('.FW_F');

let MPTimer = MPControls.querySelector('.MPTimer');
let MCurrentTime = MPTimer.querySelector('.CT');
let MFullTime = MPTimer.querySelector('.VT');
let MRemainingTime = MPTimer.querySelector('.RT');

let MFullScreen = MPControls.querySelector('.FS');

let MVolume = MPControls.querySelector('.Volume');
let MVIcon = MVolume.querySelector('.icon');
let MVValue = MVolume.querySelector('.VP');
let MVInput = MVolume.querySelector('.VPB');



Media.volume = 0.75;
Media.addEventListener('timeupdate', (MediaTimeUpdate) => {
    let MPBarValue ;
    MCurrentTime.textContent = CalculateTime(Media.currentTime);
    MPBarValue =  (( Media.currentTime / Media.duration ) * 100 );
    MPBar.value = MPBarValue ;
    MPBar.style = `background : linear-gradient(90deg, blue ${MPBarValue}%, #e1e1e1 0%);`
    MRemainingTime.textContent = CalculateTime((Media.duration - Media.currentTime));

});

Play.addEventListener('click' , function Playing () {
    MFullTime.textContent = CalculateTime(Media.duration);
    if (Media.paused) {
        PIcon.classList.remove('fa-play');
        PIcon.classList.add('fa-pause');
        Media.play();
    } else {
        PIcon.classList.remove('fa-pause');
        PIcon.classList.add('fa-play');
        Media.pause();
    };
});

MPBar.addEventListener('input' , function () {
    Media.currentTime = (( this.value / 100 ) * Media.duration);
});

BW_F.addEventListener('click' , function () {
    Media.currentTime = 0 ;
});

BW.addEventListener('click' , function () {
    Media.currentTime = Media.currentTime - 10;
});

FW.addEventListener('click' , function () {
    Media.currentTime = Media.currentTime + 10;
});

FW_F.addEventListener('click' , function () {
    Media.currentTime = Media.duration ;
});

MFullScreen.addEventListener('click' , function () {
    if (!document.fullscreenElement) {
        if(MediaPlayer.requestFullscreen) {
            MediaPlayer.requestFullscreen();
        } else if(MediaPlayer.mozFullScreenElement) {
            MediaPlayer.mozFullScreenElement()
        } else if(MediaPlayer.msFullscreenElement) {
            MediaPlayer.msFullscreenElement()
        } else if(MediaPlayer.webkitFullscreenElement) {
            MediaPlayer.webkitFullscreenElement()
        }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      } else if(document.mozCancelFullscreen) {
        document.mozCancelFullscreen(); 
      } else if(document.msCancelFullscreen) {
        document.msCancelFullscreen(); 
      } else if(document.webkitCancelFullscreen) {
        document.webkitCancelFullscreen(); 
      }
    }
});

MVIcon.addEventListener('click' , function () {
    MVValue.classList.toggle('active');
});

MVInput.addEventListener('input' , function () {
    Media.volume = (this.value / 100);
    this.style = `background : linear-gradient(90deg, blue ${this.value}%, #e1e1e1 0%);`
});

function CalculateTime (time) {
    let minuteValue;
    let secondValue;
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - ( minutes * 60 ));

    if (minutes < 10) {
        minuteValue = '0' + minutes ;
    } else {
        minuteValue = minutes ;
    };
    if (seconds < 10) {
        secondValue = '0' + seconds ;
    } else {
        secondValue = seconds ;
    };
    
    return minuteValue + ':' + secondValue
};