var Totalrows= 30;
var Totalcolumn= 30;
var grid = document.getElementById("grid");


//adding grid
    for(let r = 1;r<=Totalrows;r++) {
        for(let c = 1;c<=Totalcolumn;c++) {
        
            grid.innerHTML +='<div id="id'+r+c+'" class="cell"></div>'; 
        }
    }

// mosquto biting
    const allCells=document.getElementsByClassName("cell");
    const allCellsArray = Array.from(allCells)

    allCellsArray.forEach( function(currentCell, index ) {
        
        currentCell.addEventListener('click',() =>{
            currentCell.classList.add('marked') ;
        });
    });


 //eyes closing
document.getElementById("leftEye").addEventListener('mouseover',() => {
    document.getElementById("leftEyeLid").classList.add('closed');
    document.getElementById("rightEyeLid").classList.add('closed');
}
);
document.getElementById("leftEye").addEventListener('mouseout',() => {
    setTimeout(() =>{
        document.getElementById("leftEyeLid").classList.remove('closed');
        document.getElementById("rightEyeLid").classList.remove('closed');
    }
    ,1000);
}
);
document.getElementById("rightEye").addEventListener('mouseover',() => {
    document.getElementById("leftEyeLid").classList.add('closed');
    document.getElementById("rightEyeLid").classList.add('closed');
}
);
document.getElementById("rightEye").addEventListener('mouseout',() => {
    setTimeout(()=>{
        document.getElementById("leftEyeLid").classList.remove('closed');
        document.getElementById("rightEyeLid").classList.remove('closed');
    },1000);
}
);

// eye following target
