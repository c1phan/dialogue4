const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

var container = document.querySelector('.text');

//screen size
canvas.width = 523;
canvas.height = 703;

ctx.fillStyle = 'white';

const parkerImg = new Image();
parkerImg.src = './img/parker.png'; //referencing image of the parker

//background
const bgImg = new Image();
bgImg.src = './img/background.jpg'; //referencing background image
bgImg.onload = () => {
    ctx.drawImage(bgImg, 0,0); //position of image
    ctx.drawImage(parkerImg, 324, 215);
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.rect(-1,514,525,200);
    ctx.fillStyle='white';
    ctx.fillRect(-1,514,525,200);
    ctx.stroke();
};


var speeds = {
    pause: 500,
    veryslow: 350,
    slow: 170,
    normal: 100,
    fast: 1
};

var textLines = [
        { string: "I’m weak!!! ", speed: speeds.pause},
        { string: "The Parker Solar Probe has survived the treacherous journey of making it to the sun because of you! ", speed: speeds.normal},
        { string: "The probe is currently living rent free in space. It continues to orbit the sun and collect data for us. ", speed: speeds.normal},
        { string: "We are high key learning what goes beyond our earth. ", speed: speeds.normal},
        { string: "Like… what if there is more out there? ", speed: speeds.slow},
        { string: "Ugh, that’s cap.", speed: speeds.veryslow}
];

var characters = [];

textLines.forEach((line, index) => {
    line.string.split("").forEach((character) => {
        var span = document.createElement("span");
        span.textContent = character;
            container.appendChild(span);
            characters.push({
                span: span,
                isSpace: character === " " && !line.pause,
                delayAfter: line.speed,
                classes: line.classes || []
            });
    });
});

function revealOneCharacter(list) {
    var next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
        next.span.classList.add(c);
    });

    var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

    if(list.length > 0){
        setTimeout(function() {
            revealOneCharacter(list);
        }, delay)
    }
}

setTimeout(() => {
    revealOneCharacter(characters);
}, 600)

if(!(Array.isArray(textLines) && textLines.length)){
    console.log("I'm here!!!");
}