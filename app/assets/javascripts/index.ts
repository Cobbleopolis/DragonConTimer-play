/// <reference path="models/console.ts" />
let con: Station;

$(function() {
    if(window.location.hash) {
        var hash = window.location.hash;
        $(hash).modal('toggle');
    }
    con = new Station('A', 0);
});

function startTimer(id: string) {
    con.startTimer();
}

function stopTimer(id: string) {
    con.stopTimer();
}