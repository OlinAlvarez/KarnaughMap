var isAlpha = function(ch){
    return /^[a-zA-Z]$/i.test(ch);
}
Array.prototype.unique = function(){
    temp = []
    this.forEach(function(sym){
        sym.split('').forEach(function(ch){
            if(!temp.includes(ch) && isAlpha(ch)){
                temp.push(ch);
        }});
    });
    console.log(temp);
    return temp.sort();
}
document.getElementById("submit").onclick = function(){
    str = document.getElementById("fxnText").value.split("+");
    uniques = str.unique();
    createMap(str,uniques);
}
getBinString = function(num,len){
    str = Array(len/2).join("0");
    return(str + num.toString(2)).substr(-len/2);
}
createMap = function(terms,uniques){
    var grid = new Array(uniques.length);
    for(i = 0; i < uniques.length; i++){
        grid[i] = new Array(uniques.length);
    }
    console.log(grid);
    minterms = findMinterms(terms,uniques);
    noRows = Math.pow(2,Math.floor(uniques.length/ 2));
    noCols = Math.pow(2,Math.floor(uniques.length - noRows/2));
    console.log("rows " + noRows + ", cols" + noCols);
    rowshift=0;
    colshift=0;
    for( i = 0; i < noRows; i++){
        if(i < noRows/2){
            rowshift=0;
            left = getBinString(i,noRows);
        }
        else{
            left = getBinString(((noRows -1) - rowshift++),noRows);
        }
        for( j = 0; j < noCols; j++){
            if(j < (noCols/2)){
                colshift = 0;
                right = getBinString(j,noCols);
            }
            else{
                right = getBinString(((noCols -1) - colshift++),noCols);
            }
            if(minterms.includes(parseInt((left+right),2)))
                grid[i][j] = 1;
            else
                grid[i][j] = 0;

        }
    }
    displayGrid(grid);
}
displayGrid = function(grid){
    canvas = document.getElementById('mapgrid');
    context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width,canvas.height);
    context.font = "20pt arial";
    for(i = 0; i < grid.length; i++){
        y = (50 * (i+1));
        for(j = 0; j < grid[i].length; j++){
          x = (50 * (j + 1));
          context.rect(x,y,50,50);
          context.fillText(grid[i][j].toString(), x+25,y+25);
        }
    }
}
getGroups = function(grid){
    groups = []
    group = []; // temporary group
    //m x n matrix
    m = grid.length;
    n = grid[0].length;
    gw = gl = gd = 0;//group width, length, diagonal
    for(var i = 0; i < m; i++){
        for(var j = 0; j < n; j++){
            if(grid[i][j] == 1){
                gw = i;
                gl = j;
                //vertical line search
                while(grid[(gl+1) % m][j] == 1 && gl < m){
                    gl++;
                }
                //horizontal line search
                while(grid[i][(gw+1) % n] == 1 && gw < n){
                    gw++;
                }
                for(var k = (i + 1); k < gw; k++){
                    for(var l = (j + 1); l < gl; l++){
                        if(grid[k % m][l % n] == 1){

                        }
                    }
                }

            }
        }
    }
    return groups;
}

findMinterms = function(terms,uniques){
    bins = [];
    terms.forEach(function(term){
        temp = []
        currentTerm = term.split('');
        uniques.forEach(function(un){
            found = false;
            for( i = 0; i < currentTerm.length; i++){
                if(currentTerm[i] == un){
                    found = true;
                    if(i<currentTerm.length-1 && currentTerm[i+1] == "'")
                        temp.push('0');
                    else
                        temp.push('1');
                }
            }
            if(!found)temp.push('x');
        });
        console.log(temp);
        bins.push(temp);
    });

    getBinCominbations = function(tempBins){
        queue = [];
        binaries = [];
        for(i = 0; i < tempBins.length;i++){

            curr = tempBins[i];
            queue.push(curr);
            j = 0;
            while(j < curr.length){
                if(queue[0][j] == 'x'){
                    temp1 = queue.shift();
                    temp2 = temp1.slice(0);
                    temp1[j] = '0';
                    temp2[j] = '1';
                    queue.push(temp1);
                    queue.push(temp2);
                }
                else{
                    j++;
                }
            }
            while(queue.length != 0){
                binaries.push(parseInt(queue.shift().join(''),2));
            }
        }
        console.log(binaries);
        mins = [];
        binaries.forEach(function(bin){
            if(!mins.includes(bin)){
                mins.push(bin);
            }
        });
        return mins.sort(function(a, b){return a - b;});
    }
    return getBinCominbations(bins);
}

