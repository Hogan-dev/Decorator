//============================
/*
var counter = 3;
function incCounter() {
    counter++;
}

module.exports = {
    counter: counter,
    incCounter: incCounter
}
*/
//============================

var counter = 3;
function incCounter() {
    counter++;
}

module.exports = {
    get counter() {
        return counter;
    },
    incCounter: incCounter
};