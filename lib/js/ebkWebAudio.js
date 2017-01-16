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








window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null;

var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;




function updateAnalysers(time) {
    if (!analyserContext) {
       }

    // analyzer draw code here
    //{
    var SPACING = 3;
    var BAR_WIDTH = 1;
    var numBars = Math.round(canvasWidth / SPACING);
    var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

    analyserNode.getByteFrequencyData(freqByteData);

    //var multiplier = analyserNode.frequencyBinCount / numBars;

    // Draw rectangle for each frequency bin.
    for (var i = 0; i < 257; ++i) {
        mtl.mtlTCSQShowBounces (i,freqByteData[i ]);
         // console.log(i,freqByteData[i ],freqByteData.length,numBars);
       }
    // }

    rafID = window.requestAnimationFrame( updateAnalysers );
}


function gotStream(stream) {
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

//    audioInput = convertToMono( input );

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
    updateAnalysers();
}

function initAudio() {
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

window.addEventListener('load', initAudio );

