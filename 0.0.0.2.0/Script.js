
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
    MPBar.style = `background : linear-gradient(90deg, blue ${MPBarValue}%, #e1e1e1 0%);`;
    MRemainingTime.textContent = CalculateTime((Media.duration - Media.currentTime));
    RefVP();
});

Play.addEventListener('click' , function () {
    Playing();
});

Media.addEventListener('click' , function () {
    Playing();
});

MPBar.addEventListener('input' , function () {
    Media.currentTime = (( this.value / 100 ) * Media.duration);
});

BW_F.addEventListener('click' , function () {
    Media.currentTime = 0 ;
});

BW.addEventListener('click' , function () {
    Media.currentTime = Media.currentTime - 5;
});

FW.addEventListener('click' , function () {
    Media.currentTime = Media.currentTime + 5;
});

FW_F.addEventListener('click' , function () {
    Media.currentTime = Media.duration ;
});

MFullScreen.addEventListener('click' , function () {
    GetFS();
});

MVIcon.addEventListener('click' , function () {
    MVValue.classList.toggle('active');
});

MVInput.addEventListener('input' , function () {
    Media.volume = (this.value / 100);
    MVInput.style = `background : linear-gradient(90deg, blue ${MVInput.value}%, #e1e1e1 0%);`;
});

function RefVP() {
    MVInput.style = `background : linear-gradient(90deg, blue ${MVInput.value}%, #e1e1e1 0%);`;
    if (MVInput.value >= 50) {
        MVIcon.classList.remove( 'fa-volume-low' , 'fa-volume-off' );
        MVIcon.classList.add( 'fa-volume-high' );
    } else {if (MVInput.value >0) {
        MVIcon.classList.remove( 'fa-volume-high' , 'fa-volume-off' );
        MVIcon.classList.add( 'fa-volume-low' );
    } else {
        MVIcon.classList.remove( 'fa-volume-high' , 'fa-volume-low' );
        MVIcon.classList.add( 'fa-volume-off' );
    };}
};

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
    return minuteValue + ':' + secondValue ;
};

function Playing () {
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
};

function GetFS() {
    if (!document.fullscreenElement) {
        if(MediaPlayer.requestFullscreen) {
            MediaPlayer.requestFullscreen();
        } else if(MediaPlayer.mozFullScreenElement) {
            MediaPlayer.mozFullScreenElement();
        } else if(MediaPlayer.msFullscreenElement) {
            MediaPlayer.msFullscreenElement();
        } else if(MediaPlayer.webkitFullscreenElement) {
            MediaPlayer.webkitFullscreenElement();
        };
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen(); 
        } else if(document.mozCancelFullscreen) {
            document.mozCancelFullscreen(); 
        } else if(document.msCancelFullscreen) {
            document.msCancelFullscreen(); 
        } else if(document.webkitCancelFullscreen) {
            document.webkitCancelFullscreen(); 
        };
    };
};

window.addEventListener("keydown", function(KeyControl) {
    switch(KeyControl.code) {
        case "Space":
            Playing ();
          break;
        case "ArrowLeft":
            Media.currentTime = Media.currentTime - 5;
          break;
        case "ArrowRight":
            Media.currentTime = Media.currentTime + 5;
          break;
        case "Enter":
            GetFS();
          break;
        case "ArrowUp":
            if (Media.volume <= 0.95) {
                Media.volume += 0.05;
            } else {
                Media.volume = 1;
            }
            MVInput.value = (Media.volume *100);
          break;
        case "ArrowDown":
            if (Media.volume >= 0.05) {
                Media.volume -= 0.05;
            } else {
                Media.volume = 0;
            }
            MVInput.value = (Media.volume *100);
          break;
    };
});