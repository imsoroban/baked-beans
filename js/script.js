document.addEventListener("DOMContentLoaded", function() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playVintageClick() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
    }

    var buttons = document.querySelectorAll("button");
    buttons.forEach(function(btn) {
        btn.addEventListener("click", playVintageClick);
    });
});

function scaleBeans(portions) {
    var cans = document.getElementById('can-count');
    var slices = document.getElementById('slice-count');
    var butter = document.getElementById('butter-count');

    if(cans && slices && butter) {
        cans.innerText = portions;
        slices.innerText = portions * 2;
        butter.innerText = portions;
    }
}

var beanFacts = [
    "baked beans are technically legumes simmered in sauce, then cooked further inside sealed tin cans.",
    "the average person in the United Kingdom consumes over 16 cans of baked beans per year.",
    "native americans originally slow-cooked navy beans with maple syrup and bear fat in earthenware pots.",
    "in 1901, heinz baked beans were first sold in the UK as an imported luxury item at Fortnum & Mason.",
    "a single standard tin of beans contains approximately 400-500 individual navy beans."
];

function getNewFact() {
    var display = document.getElementById('fact-display');
    if (display) {
        var randomIndex = Math.floor(Math.random() * beanFacts.length);
        display.innerHTML = '"' + beanFacts[randomIndex] + '"';
    }
}

function addReview() {
    var brandSelect = document.getElementById('brand-select');
    var starSelect = document.getElementById('star-select');
    var nameInput = document.getElementById('reviewer-name');
    var textInput = document.getElementById('review-text');
    var wall = document.getElementById('review-wall');

    if (!textInput || !textInput.value) {
        alert('please write a brief verdict first!');
        return;
    }

    var brand = brandSelect.value;
    var stars = starSelect.value;
    var name = nameInput.value || 'anon bean enthusiast';
    var text = textInput.value;

    var newEntry = document.createElement('div');
    newEntry.style.border = '1px dashed #a38f78';
    newEntry.style.padding = '10px';
    newEntry.style.marginTop = '10px';
    newEntry.style.backgroundColor = '#f5eedc';

    newEntry.innerHTML = '<b>' + brand.toUpperCase() + '</b> - ' + stars + '<br>' +
                        '<i>"' + text + '"</i><br>' +
                        '<small>- ' + name + '</small>';

    wall.prepend(newEntry);

    textInput.value = '';
    nameInput.value = '';
}
