
// Drumkit Class Definition

class Drumkit {
    constructor() {
        // Pad elements
        this.pads = document.querySelectorAll('.pad');

        // Controls
        this.playBtn = document.querySelector('.play');
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');

        // Audio elements
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');

        // Audio sources
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-808.wav';
        this.currentHihat = './sounds/hihat-808.wav';

        // State
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
    }

    // Toggle active state on a pad
    activePad() {
        this.classList.toggle("active");
    }

    // Trigger sounds on active pads
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);

        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });

        this.index++;
    }

    // Start or stop the drum loop
    start() {
        const interval = (60 / this.bpm) * 1000;

        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    // Toggle play button appearance
    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }

    // Change selected sound
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;

        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    // Mute/unmute a track
    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");

        const volume = e.target.classList.contains('active') ? 0 : 1;

        switch (muteIndex) {
            case "0":
                this.kickAudio.volume = volume;
                break;
            case "1":
                this.snareAudio.volume = volume;
                break;
            case "2":
                this.hihatAudio.volume = volume;
                break;
        }
    }

    // Change tempo value in real-time
    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }

    // Update the interval timing when tempo is changed
    updateTempo() {
        clearInterval(this.isPlaying);
        this.isPlaying = null;

        if (this.playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

// ============================
// Initialization & Event Binding
// ============================

const drumKit = new Drumkit();

// Toggle active pad class on click
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

// Play/Stop on button click
drumKit.playBtn.addEventListener('click', () => {
    drumKit.updateBtn();
    drumKit.start();
});

// Change sound from dropdown
drumKit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    });
});

// Mute track
drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        drumKit.mute(e);
    });
});

// Tempo slider controls
drumKit.tempoSlider.addEventListener('input', function (e) {
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function () {
    drumKit.updateTempo();
});
