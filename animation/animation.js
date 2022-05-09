var canvas = document.getElementById("canv");
var context = canvas.getContext("2d");
var cx = 1500;
var cy = 1500;
var n = 2000;
var mosquitoDays = 10;
var runs = 0;
var days = 0;
var mx = 1500;
var my = 1500;
var hx = 1500;
var hy = 1250;
var pmx = mx;
var pmy = my;
var kills = 0;
var deaths = 0;

var killLocs = [];
var deathLocs = [];

var intervalID;
function init() {
    initDraw();
    intervalID = setInterval(draw, 100);
    //intervalID = setInterval(draw, 0);
}

function initDraw() {
    found = false;
    days = 0;
    mx = 1500;
    my = 1500;
    pmx = mx;
    pmy = my;
    context.clearRect(0,0,3000,3000);
    // Draw a frame
    context.fillStyle = "black";
    context.lineWidth = 15;
    context.strokeRect(0,0,3000,3000);

    // Draw 1000m circle
    context.beginPath();
    context.fillStyle = "#f1c2f0";
    context.arc(cx, cy, 1000, 0, Math.PI*2);
    context.closePath();
    context.fill();

    // Draw human circle
    context.beginPath();
    context.fillStyle = "#cf860e";
    context.arc(hx, hy, 50, 0, Math.PI*2);
    context.closePath();
    context.fill();

    // Draw mosquito
    context.beginPath();
    context.fillStyle = "rgb(200,0,200)";
    context.arc(mx, my, 10, 0, Math.PI*2);
    context.closePath();
    context.fill();
}

var found = false;
function draw() {
    if (found || days >= mosquitoDays) {
        if (runs > n) {
            console.log("kills: ", kills);
            console.log("deaths: ", deaths);
            console.log("probablity of kill: ", kills / n);
            console.log("probablity of death: ", deaths / n);
            //console.log(killLocs);
            for (let i = 0; i < killLocs.length; i++) {
                context.beginPath();
                context.fillStyle = "rgb(200,0,200)";
                context.arc(killLocs[i][0], killLocs[i][1], 6, 0, Math.PI*2);
                context.closePath();
                context.fill();
            }
            for (let i = 0; i < deathLocs.length; i++) {
                context.beginPath();
                context.fillStyle = "rgb(200,0,200)";
                context.arc(deathLocs[i][0], deathLocs[i][1], 6, 0, Math.PI*2);
                context.closePath();
                context.fill();
            }
            clearInterval(intervalID);
        }
        else {
            if (!found) {
                // Check if the mosquito died outside of the area
                if (Math.pow(mx-cx, 2) + Math.pow(my-cy, 2) > Math.pow(1000, 2)) {
                    deaths += 1;
                    //console.log("death outside!");
                    deathLocs.push([mx, my]);
                }
            }
            initDraw();
            runs += 1;
        }
    }
    else {
        // Get new angle
        let angle = Math.floor(Math.random() * 360.0);
        mx += 250*Math.cos(angle * Math.PI / 180.0);
        my += 250*Math.sin(angle * Math.PI / 180.0);

        // Draw mosquito
        context.beginPath();
        context.fillStyle = "rgb(200,0,200)";
        context.arc(mx, my, 10, 0, Math.PI*2);
        context.closePath();
        context.fill();

        // Draw path that mosquito takes
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(pmx, pmy);
        context.lineTo(mx, my);
        context.stroke();

        // Check if the mosquito found the human
        if (Math.pow((mx - hx),2) + Math.pow((my - hy),2) <= Math.pow(50,2)) {
            //console.log("kill!");
            //console.log(mx, my);
            kills += 1;
            killLocs.push([mx, my]);
            found = true;
        }
        else {
            pmx = mx;
            pmy = my;
        }
        days += 1;
    }
}
