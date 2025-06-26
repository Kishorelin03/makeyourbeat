// Define the Drumkit class
class Drumkit {
    constructor() {
        // Select all pad elements
        this.pads = document.querySelectorAll('.pad');
        
        // Select the play button
        this.playBtn = document.querySelector('.play');

        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-808.wav';
        this.currentHihat = './sounds/hihat-808.wav';
        // Select audio elements for each sound type
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');

        // Current step/index in the loop (0–7 for 8 beats)
        this.index = 0;

        // Beats per minute (tempo)
        this.bpm = 150;

        this.isPlaying = null;
    }

    // Toggle the 'active' class on a pad when clicked
    activePad() {
        this.classList.toggle("active");
    }

    // Play the active pads for the current step
    repeat() {
        let step = this.index % 8; // Determine the current step (0–7)

        // Select all pads that belong to this step across all tracks
        const activeBars = document.querySelectorAll(`.b${step}`);

        activeBars.forEach( bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains("active")){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        // Increment step for next iteration
        this.index++;
    }

    // Start the beat sequence based on BPM
    start() {
        // Calculate interval in milliseconds between beats
        const interval = (60 / this.bpm) * 1000;

        // Run the repeat function on each interval
        if(!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    updateBtn() {
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active")
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }
}

// Instantiate a new Drumkit object
const drumKit = new Drumkit();

// Add click event listeners to all pads to toggle their active state
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation = "";
    })
});

// Add event listener to the play button to start the loop
drumKit.playBtn.addEventListener('click', () => {
    drumKit.updateBtn()
    drumKit.start();
});
