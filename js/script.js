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

    var searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterBeanTable);
    }
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

    var brand = brandSelect ? brandSelect.value : 'generic';
    var stars = starSelect ? starSelect.value : '★★★☆☆';
    var name = nameInput && nameInput.value ? nameInput.value : 'anon bean enthusiast';
    var text = textInput.value;

    var newEntry = document.createElement('div');
    newEntry.style.border = '1px dashed #a38f78';
    newEntry.style.padding = '10px';
    newEntry.style.marginTop = '10px';
    newEntry.style.backgroundColor = '#f5eedc';

    newEntry.innerHTML = '<b>' + brand.toUpperCase() + '</b> - ' + stars + '<br>' +
                        '<i>"' + text + '"</i><br>' +
                        '<small>- ' + name + '</small>';

    if (wall) {
        wall.prepend(newEntry);
    }

    textInput.value = '';
    if (nameInput) nameInput.value = '';
}

var openedCansSession = 0;
function openCan() {
    openedCansSession++;
    var counterEl = document.getElementById('can-counter');
    if (counterEl) {
        counterEl.innerText = openedCansSession;
    }

    if (openedCansSession === 10) {
        alert("Achievement Unlocked: Session Can Cracker!");
    } else if (openedCansSession === 50) {
        alert("Achievement Unlocked: Vault Overseer!");
    }
}

function calculateToastRatio() {
    var breadInput = document.getElementById('bread-input');
    var ratioDisplay = document.getElementById('ratio-result');
    if (!breadInput || !ratioDisplay) return;

    var slices = parseInt(breadInput.value) || 0;
    if (slices <= 0) {
        ratioDisplay.innerText = "feed the vault some toast slices first!";
        return;
    }

    var cansNeeded = (slices / 2).toFixed(1);
    var butterGrams = slices * 10;
    
    ratioDisplay.innerText = 'for ' + slices + ' slices, open ' + cansNeeded + 
                            ' tins of beans & apply ~' + butterGrams + 'g of butter.';
}

function filterBeanTable() {
    var input = document.getElementById('search-input');
    if (!input) return;
    
    var filter = input.value.toLowerCase();
    var rows = document.querySelectorAll('table tbody tr');

    rows.forEach(function(row) {
        var text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
}

function setVaultTheme(theme) {
    if (theme === 'sauce') {
        document.body.style.backgroundColor = '#8c2d19';
        document.body.style.color = '#fbeee6';
    } else if (theme === 'can') {
        document.body.style.backgroundColor = '#4b5863';
        document.body.style.color = '#e1e8ed';
    } else {
        document.body.style.backgroundColor = '#fbf6ec';
        document.body.style.color = '#2a241e';
    }
}

function generateTinArt() {
    var container = document.getElementById('ascii-tin');
    if (!container) return;

    var tins = [
        "   .---.\n  |  |  |\n  |  |  |\n  |==|==|\n  |BEANS|\n  |_____|",
        "  (======)\n  | BAKED|\n  | BEANS|\n  (======)",
        "   /----\\\n  | TIN   |\n  | VAULT |\n   \\----/"
    ];

    var randomTin = tins[Math.floor(Math.random() * tins.length)];
    container.innerText = randomTin;
}

var konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.backgroundColor = '#ffb347';
            document.body.style.color = '#4a2500';
            alert("SECRET BEAN VAULT UNLOCKED!");
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
