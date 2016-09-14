let left = 60;

$(function() {
    let start = new Date();
    let timer = setInterval(function() {
        decProgBar(start);
        if(left == 0)
            clearInterval(timer);
    }, 250);
});

function decProgBar(start: Date) {
    let progBar = $("#progBar");
    let t = (new Date().getTime() - start.getTime()) / 1000; // Add divide by 60 for an hour (at a min rn).
    left = Math.max(60 - t, 0);
    progBar.attr("aria-valuenow", left);
    progBar.css("width", (left / 60) * 100 + "%");
    progBar.text(Math.floor(left) + "min");
}