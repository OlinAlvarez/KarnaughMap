
var grid = new Array(4);

for(var i = 0; i < 4; i++){
    grid[i] = new Array(4);
    for(var j = 0; j < 4; j++){
        if(Math.floor(Math.random() * 10) % 2 === 1){
            grid[i][j] = 1;
        }
        else{
            grid[i][j] = 0;
        } 
    } 
}

function displayGrid(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    for(i = 0; i < 4; i++){
        for(j = 0; j < 4; j++){
            
        } 
    } 
} 
