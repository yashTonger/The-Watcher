// global data
    var isStarted=  false;
    var isPause= false;
    var isLight = false;
    var isEnd = false;
    var isMotionStoped= false;
    var isFlownAway=false;
    var isEyeClosed =false;
    var ismute= false;
    var isBiting= -1;

    var Totalrows= 30;
    var Totalcolumn= 30;
    var grid = document.getElementById("grid");
    var blood = 0;  

    var mosquito =  document.getElementById("mosquito1");
    var Rules = " <h1>Welcome to the Game!</h1>"+
    "<p>Follow the instructions below to play:</p>"+
    "<ol>"+
      "<li>Step 1: Choose a difficulty level</li>"+
      "<li>Step 2: Click the 'Start' button to begin</li>"+
      "<li>Step 3: Play the game using the arrow keys</li>"+
      "<li>Step 4: Have fun and aim for the high score!</li> "+
    "</ol>";

//adding grid
    for(let r = 1;r<=Totalrows;r++) {
        for(let c = 1;c<=Totalcolumn;c++) {
        
            grid.innerHTML +='<div id="id'+r+c+'" class="cell"></div>'; 
        }
    }



//functions ============>

    //stop bitting
    function bitStop(){
        isBiting =-1;
        startMonment();
    }

    //bitting
    function bit(currentCell,index) {
        console.log("bit");
        if(!isMotionStoped && !isPause && isStarted && !isEnd && !isFlownAway)
        {
            stopMonment();
            
            if(isLight){
                kill();
            }
            else{ 
                setTimeout(()=>{
                    if( !currentCell.classList.contains('marked') && isBiting==index){
                        blood++;
                        scoreUpdate();
                        
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
                },2000);
                isBiting=index;
            }
        }

    }

    //updaate blood bar 
    function scoreUpdate(){
        var score= blood*3.333334;

        document.getElementById("score").style.width = ""+score+"%";
    }

    //light On
    function lightOn() {
        if( !isPause && isStarted && !isEnd && !isLight)
        {
            isLight=true;
            openEye();
            document.getElementById("light-filter").style.background = "rgba(0,0,0,0)";

            setTimeout(() =>{
                if(isFlownAway){
                    lightOff();
                }
                else{
                    kill();
                }
            },4000);
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
        if(isStarted && !isPause && !isMotionStoped){
            isMotionStoped=true;
            mosquito.classList.remove("fly");
            if(!ismute){
                //pasue mosquito sound
            }
        }

    }



     // start mosqito animation
     function startMonment() {
        if(isStarted && !isPause && isMotionStoped){
            isMotionStoped=false;
            mosquito.classList.add("fly");
            if(!ismute){
                //play mosquito sound
            }
        }
    }

    //fly away 
    function flyAway() {
        if(isStarted && !isPause && !isFlownAway){
            isFlownAway=true;
            mosquito.classList.remove("flyBack");
            mosquito.classList.add("flyAway");
            if(!ismute){
                //pasue mosquito sound
            }
        }

    }


    //fly back
    function flyBack() {
        if(isStarted && !isPause && isFlownAway){
            isFlownAway=false;
            mosquito.classList.remove("flyAway");
            mosquito.classList.add("flyBack");
            if(!ismute){
                //play mosquito sound
            }
        }
    }



     // mosqito animation
     function mosquitoMotion(e) {
        if(!isEnd && !isMotionStoped){
            var doc = document.documentElement;
            var eyeX = (((doc.clientWidth-e.clientX)/doc.clientWidth)*100)/(5*1.1414);
            var eyeY = ((((doc.clientHeight/2) - e.clientY)/doc.clientWidth)*100)/(5*1.1414);
            var eyeBallLeft = (eyeX - eyeY)/1.414;
            var eyeBalltop = (eyeX + eyeY)/1.414;
            var rightEyeX = (10*1.1414)-eyeX;
            var rightEyeBallLeft = (rightEyeX - eyeY)/1.414;
            var rightEyeBallTop = (rightEyeX + eyeY)/1.414;

            mosquito.style.left= e.clientX   + "px";
            mosquito.style.top= e.clientY +1 + "px";
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
        
            show('dashboard');
            show('replay');
            show('mute');
            show('resume');
            
            hide('score-bar');
            hide('pause');

        }   
        
    }

    //unpause
    function unpause() {
        if(isStarted && isPause && !isEnd ){
            
            isPause=false;
            hide('dashboard');
            hide('replay');
            hide('mute');
            hide('resume');

            show('score-bar');
            show('pause');
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
        isMotionStoped=false;
        blood=0;


        document.getElementById('dashboard').style.visibility="hidden";
        console.log("play-sounds");
        scoreUpdate();
        lightOff();

        //buttons config
        hide('dashboard');
        hide('replay');
        hide('mute');
        hide('resume');
        hide('go');
        hide('failPic');
        hide('winPic');

        show('pause');
        show("mosquito1");
        show("score-bar");


        document.getElementById('content').innerHTML= Rules;
    



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
        console.log(result);
        document.getElementById('content').innerHTML= result;
        show('go');
    }
    
    // win
    function win(){
        if(isStarted && !isPause && !isLight && !isEnd){

            stopMonment();
            isEnd=true;


            hide('score-bar');
            hide('pause');
            hide("mosquito1");
            document.getElementById('content').innerHTML= " ";
            show('dashboard');
            show('winPic');
            setTimeout(()=>{
                end("MISSION PASSED");
            },2000);
        }
    }

    // kill
    function kill() {
        if(isStarted && !isPause && isLight && !isEnd){

            stopMonment();
            isEnd=true;
            
            hide('score-bar');
            hide('pause');
            hide("mosquito1");
            document.getElementById('content').innerHTML= " ";
            show('dashboard');
            show('failPic');
            setTimeout(()=>{
                end("MISSION FAILED");
            },2000);
        }
    }

    //mute
    function mute() {
        if(ismute){
            console.log("un-mute");
            ismute=false;
            
        }
        else {
            console.log("mute");
            ismute=true;
           
        }

    }

    //show element
    function show(element) {
        document.getElementById(element).style.visibility="visible";
        document.getElementById(element).classList.remove('disable')
    }

    //hide and disable the element
    function hide(element) {
        if(!document.getElementById(element).classList.contains('disable')){
            document.getElementById(element).classList.add('disable');
        }
        document.getElementById(element).style.visibility="hidden";
    }


//eventLisnteners

    //go button

    document.getElementById("go").addEventListener('click',start);

    //grid

    const allCells=document.getElementsByClassName("cell");
    const allCellsArray = Array.from(allCells)

    allCellsArray.forEach( function(currentCell, index ) {
        
        currentCell.addEventListener('mousedown', ()=>{
            bit(currentCell,index);
        });

        currentCell.addEventListener('mouseup', ()=>{
            bitStop();
        });
    });

    //eye
    document.getElementById("leftEye").addEventListener('mouseover', closeEye);
    document.getElementById("leftEye").addEventListener('mouseout',openEye);
    document.getElementById("rightEye").addEventListener('mouseover',closeEye);
    document.getElementById("rightEye").addEventListener('mouseout',openEye);

    //pause button

    document.getElementById("pause").addEventListener('click',pause);

    //unpause button

    document.getElementById("resume").addEventListener('click',unpause);

    //replay button

    document.getElementById("replay").addEventListener('click',replay);

    //mute bottons

    document.getElementById("mute").addEventListener('click',mute);
    //space button

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
          flyAway();
        }
      });
      
      document.addEventListener('keyup', function(event) {
        if (event.code === 'Space') {
          flyBack();
        }
      });

    //mouse position

    document.documentElement.addEventListener('mousemove', mosquitoMotion);



    //removing animation

        mosquito.addEventListener('animationend', function(event) {
        if (event.animationName === 'flyBack') {
            mosquito.classList.remove("flyBack");
        }
        });
