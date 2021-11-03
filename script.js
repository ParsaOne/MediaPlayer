let startbox = document.querySelector('.start-box');
let inputcounter = startbox.querySelector('#input-counter');
let startcounter = startbox.querySelector('#start-counter');
let erorelement =document.querySelector('#error-message');
let timercircle = document.querySelector('.c100');
let time = timercircle.querySelector('span');
let loading = document.querySelector('.message .loading');
let success = document.querySelector('.message .success');

startcounter.addEventListener('click' , function(e) {
    let seconds = parseInt(inputcounter.value);

    if(isNaN(seconds)){
        erorelement.textContent='Your Time Is Wrong...'
        erorelement.style.display='block';
        return;
    }

    erorelement.style.display='none';
    startbox.style.display='none';
    timercircle.style.display='block';
    time.textContent = seconds;
    loading.textContent='Progressing...';
    loading.style.display = 'block';
    success.style.display = 'none';
    let inputsec= seconds;
    let lastPercent = 'p100';
    timercircle.classList.add(lastPercent); 

    let timeid = setInterval(() => {
        if(seconds <= 0  ){
            clearInterval(timeid);
            startbox.style.display='block';
            timercircle.style.display='none';
            inputcounter.value='';
            loading.style.display = 'none';
            success.style.display = 'block';
            success.textContent = 'Done...';
            timercircle.classList.remove(lastPercent);
            return;
        }
        
        seconds -=1;
        timercircle.classList.remove(lastPercent); 
        let percent = Math.floor(100-(((inputsec-seconds)/inputsec)*100));
        lastPercent = `p${percent}`;
        timercircle.classList.add(lastPercent);
        time.textContent=seconds; 

    },1000);})
