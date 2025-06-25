// Define the Drumkit class
class Drumkit {
    constructor() {
        // Select all pad elements
        this.pads = document.querySelectorAll('.pad');
        
        // Select the play button
        this.playBtn = document.querySelector('.play');

        // Select audio elements for each sound type
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');

        // Current step/index in the loop (0–7 for 8 beats)
        this.index = 0;

        // Beats per minute (tempo)
        this.bpm = 150;
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

        // Increment step for next iteration
        this.index++;
    }

    // Start the beat sequence based on BPM
    start() {
        // Calculate interval in milliseconds between beats
        const interval = (60 / this.bpm) * 1000;

        // Run the repeat function on each interval
        setInterval(() => {
            this.repeat();
        }, interval);
    }
}

// Instantiate a new Drumkit object
const drumKit = new Drumkit();

// Add click event listeners to all pads to toggle their active state
drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
});

// Add event listener to the play button to start the loop
drumKit.playBtn.addEventListener('click', () => {
    drumKit.start();
});
