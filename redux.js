hamWeight = function(num){
    return num.toString('2').count("1");
}

genGroups = function(minterms){
    groups = new Array(uniques.length);

    for( var i = 0; i < uniques.length; i++){
        groups[i] =  new Array();
    }
    minterms.forEach(function(m){
        groups[hamWeight(m)].append(m);
    });
    /*
     *first step is separate into groups by hamming weight next is to check how many differentiate by groups one bit.
     *
     * */
    matchFound = true;
    primeImplicants = [];
    //Second set of groups should be map
    groups.forEach(function(elem){


}
