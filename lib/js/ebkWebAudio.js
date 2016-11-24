/**
 * Created by jean-jacquesebanga on 16-05-07.
 */

// AUDIO API




//init the sound system
function webAudioInit() {
    console.log("......");
    try {
        ctx = new AudioContext(); //is there a better API for this?
        loadFile();
    } catch(e) {
        alert('you need webaudio support');
    }
}

function loadFile() {
    var req = new XMLHttpRequest();
    req.open("GET","http://localhost:3000/test.mp3",true);
    req.responseType = "arraybuffer";
    req.onload = function() {
        //decode the loaded data
        ctx.decodeAudioData(req.response, function(buffer) {
            buf = buffer;
            play();
        });
    };
    req.send();
}


//play the loaded file
function play() {
    //create a source node from the buffer
    src = ctx.createBufferSource();
    src.buffer = buf;


    analyser = ctx.createAnalyser();
    analyser.fftSize = samples;

    //connect them up into a chain
    src.connect(analyser);
    //fft.connect(ctx.destination);

    //connect to the final output node (the speakers)
    analyser.connect(ctx.destination);
    //play immediately
    src.start(0);
    setupSound =true;
}


function soundUpdate() {

    if (!setupSound) return;

    var data = new Uint8Array(samples);
    analyser.getByteFrequencyData(data);

    var data1 = new Uint8Array(samples);
    analyser.getByteTimeDomainData(data1);

    for(var i=0; i<data.length; i++) {


    }

};
