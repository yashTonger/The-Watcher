var Totalrows= 30;
var Totalcolumn= 30;
var grid = document.getElementById("grid");

for(let r = 1;r<=Totalrows;r++) {
    for(let c = 1;c<=Totalcolumn;c++) {
     
        grid.innerHTML +='<div id="'+r+c+'" class="cell">'+r+c+'</div>'; 
    }
}

        const allCells=document.getElementsByClassName("cell");
        console.log(allCells);
        const allCellsArray = Array.from(allCells)

        allCellsArray.forEach( function(currentCell) {
            
            currentCell.addEventListener('click',() =>{
                currentCell.style.background='red';
            });
        });

