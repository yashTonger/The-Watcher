// global data
    var isStarted=  false;
    var isPause= false;
    var isLight = false;
    var isEnd = false;
    var isSpacePressed= false;
    var isEyeClosed =false;
    var ismute= false;

    var Totalrows= 30;
    var Totalcolumn= 30;
    var grid = document.getElementById("grid");
    var blood = 0;  


//adding grid
    for(let r = 1;r<=Totalrows;r++) {
        for(let c = 1;c<=Totalcolumn;c++) {
        
            grid.innerHTML +='<div id="id'+r+c+'" class="cell"></div>'; 
        }
    }



//functions ============>


    //bitting
    function bit(currentCell) {
        if(isSpacePressed && !isPause && isStarted && !isEnd)
        {
            if(isLight){
                kill();
            }
            else{
                if( !currentCell.classList.contains('marked')){
                    blood++;
                    
                    currentCell.classList.add('marked') ;
                    if(blood==5||blood==9||blood==13||blood==18||blood==21||blood==25||blood==29)
                    {
                        lightOn();
                    }
                    else {
                        if(blood==30){
                            win();
                        }
                    }
                }
            }
        }

    }

    //light On
    function lightOn() {
        if( !isPause && isStarted && !isEnd && !isLight)
        {
            isLight=true;
            openEye();
            document.getElementById("light-filter").style.background = "rgba(0,0,0,0)";

            setTimeout(() =>{
                if(isSpacePressed){
                    lightOff();
                }
                else{
                    kill();
                }
            },5000);
        }

    }

    //light Off
    function lightOff() {
        if(isStarted && !isEnd){
            isLight=false;
            closeEye();
            document.getElementById("light-filter").style.background = "rgba(0,0,0,0.2)";
        }

    }
    
    // stop mosqito animation
    function stopMonment() {
        if(isStarted && !isPause && !isSpacePressed){
            isSpacePressed=true;
            document.getElementById("mosquito1").classList.remove("fly");
            if(!ismute){
                //pasue mosquito sound
            }
        }

    }
     // start mosqito animation
     function startMonment() {
        if(isStarted && !isPause && isSpacePressed){
            isSpacePressed=false;
            document.getElementById("mosquito1").classList.add("fly");
            if(!ismute){
                //play mosquito sound
            }
        }
    }

     // mosqito animation
     function mosquitoMotion(e) {
        if(!isEnd && !isSpacePressed){
            var doc = document.documentElement;
            var eyeX = (((doc.clientWidth-e.clientX)/doc.clientWidth)*100)/(5*1.1414);
            var eyeY = ((((doc.clientHeight/2) - e.clientY)/doc.clientWidth)*100)/(5*1.1414);
            var eyeBallLeft = (eyeX - eyeY)/1.414;
            var eyeBalltop = (eyeX + eyeY)/1.414;
            var rightEyeX = (10*1.1414)-eyeX;
            var rightEyeBallLeft = (rightEyeX - eyeY)/1.414;
            var rightEyeBallTop = (rightEyeX + eyeY)/1.414;

            document.getElementById("mosquito1").style.left= e.clientX   + "px";
            document.getElementById("mosquito1").style.top= e.clientY +1 + "px";
            document.getElementById("leftEyeBall").style.left= eyeBallLeft + 2 + "vw";
            document.getElementById("leftEyeBall").style.top= eyeBalltop + 2 + "vw";
            document.getElementById("rightEyeBall").style.left= rightEyeBallLeft  + 2  + "vw";
            document.getElementById("rightEyeBall").style.top= rightEyeBallTop  + 2 + "vw";
        }
    }

    //close eye
    function closeEye() {
        if(!isEyeClosed && !isEnd && isStarted && !isPause){
            if(!document.getElementById("leftEyeLid").classList.contains('closed')){
                isEyeClosed=true;
                document.getElementById("leftEyeLid").classList.add('closed');
                document.getElementById("rightEyeLid").classList.add('closed');
            }
        }
    }
    
    //open eye
    function openEye() {
        if( isEyeClosed && !isEnd && isStarted && !isPause && isLight){
            if(document.getElementById("leftEyeLid").classList.contains('closed')){
                isEyeClosed=false;
                document.getElementById("leftEyeLid").classList.remove('closed');
                document.getElementById("rightEyeLid").classList.remove('closed');
            }
        }
    }

    //pause
    function pause() {
        if(isStarted && !isPause && !isEnd ){

            isPause=true;
            document.getElementById('dashboard').style.visibility="visible";
            document.getElementById('replay').style.visibility="visible";
            document.getElementById('resume').style.visibility="visible";
            document.getElementById('mute').style.visibility="visible";
            
            document.getElementById('replay').classList.remove('disable');
            document.getElementById('resume').classList.remove('disable');
            document.getElementById('mute').classList.remove('disable');
            
            document.getElementById('pause').classList.add('disable');
            document.getElementById('pause').style.visibility="hidden";

        }
        
    }

    //unpause
    function unpause() {
        if(isStarted && isPause && !isEnd ){
            
            isPause=false;
            document.getElementById('dashboard').style.visibility="hidden";
            document.getElementById('replay').style.visibility="hidden";
            document.getElementById('resume').style.visibility="hidden";
            document.getElementById('mute').style.visibility="hidden";
            
            document.getElementById('replay').classList.add('disable');
            document.getElementById('resume').classList.add('disable');
            document.getElementById('mute').classList.add('disable');


            document.getElementById('pause').classList.remove('disable');
            document.getElementById('pause').style.visibility="visible";
        }
    }

    //replay
    function replay() {
        if(isStarted && isPause &&!isEnd){
            unpause();
            start();
        }

        
    }

    //start the game
    function start() {

        //setting flags
        isStarted=true;
        isPause=false;
        ismute=false;
        isEnd=false;
        isSpacePressed=false;
        blood=0;


        document.getElementById('dashboard').style.visibility="hidden";
        console.log("play-sounds");
        lightOff();

        //buttons config
            document.getElementById('replay').style.visibility="hidden";
            document.getElementById('resume').style.visibility="hidden";
            document.getElementById('mute').style.visibility="hidden";
            document.getElementById('go').style.visibility="hidden";
            document.getElementById('pause').style.visibility="visible";
            
            if(!document.getElementById('replay').classList.contains('disable')){
                document.getElementById('replay').classList.add('disable');
            }
            if(!document.getElementById('resume').classList.contains('disable')){
                document.getElementById('resume').classList.add('disable');
            }
            if(!document.getElementById('mute').classList.contains('disable')){
                document.getElementById('mute').classList.add('disable');
            }
            if(!document.getElementById('go').classList.contains('disable')){
                document.getElementById('go').classList.add('disable');
            }
            if(document.getElementById('pause').classList.contains('disable')){
                document.getElementById('pause').classList.remove('disable');
            }
            


        
        //remove old marks
        for(let r = 1;r<=Totalrows;r++) {
            for(let c = 1;c<=Totalcolumn;c++) {
            
               if(document.getElementById("id"+r+c).classList.contains("marked"))
                {
                    document.getElementById("id"+r+c).classList.remove("marked");
                }
            }
        }



    } 

    //end
    function end(result) {
        //is satrted - false 
    }
    
    // win
    function win(){
        if(isStarted && !isPause && !isLight && !isEnd){

            stopMonment();
            isEnd=true;
            console.log("win-animation");
            end("win");
        }
    }

    // kill
    function kill() {
        if(isStarted && !isPause && isLight && !isEnd){

            stopMonment();
            isEnd=true;
            console.log("kill-animation");
            end("kill");
        }
    }

    //mute
    function mute() {
        if(ismute){
            console.log("un-mute");
            ismute=false;
            document.getElementById("outer-ring").classList.add("unmuted");
        }
        else {
            console.log("mute");
            ismute=true;
            document.getElementById("outer-ring").classList.remove("unmuted");
        }

    }


//eventLisnteners

    //go button

    document.getElementById("go").addEventListener('click',start);

    //grid

    const allCells=document.getElementsByClassName("cell");
    const allCellsArray = Array.from(allCells)

    allCellsArray.forEach( function(currentCell, index ) {
        
        currentCell.addEventListener('click', bit(currentCell));
    });

    //eye
    document.getElementById("leftEye").addEventListener('mouseover', closeEye);
    document.getElementById("leftEye").addEventListener('mouseout',openEye);
    document.getElementById("rightEye").addEventListener('mouseover',closeEye);
    document.getElementById("rightEye").addEventListener('mouseout',openEye);

    //pause button

    document.getElementById("Pause").addEventListener('click',pause);

    //unpause button

    document.getElementById("resume").addEventListener('click',unpause);

    //replay button

    document.getElementById("replay").addEventListener('click',replay);

    //mute bottons

    document.getElementById("mute").addEventListener('click',mute);

    //space button

    document.addEventListener('keydown',stopMonment);
    document.addEventListener('keyup', startMonment);
    //mouse position

    document.documentElement.addEventListener('mousemove', mosquitoMotion);

