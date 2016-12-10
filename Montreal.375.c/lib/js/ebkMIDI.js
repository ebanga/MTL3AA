/**
 * Created by jean-jacquesebanga on 16-05-07.
 */

// midi From Internet :
function  midiIni(){
    var log = console.log.bind(console), keyData = document.getElementById('key_data'),
        deviceInfoInputs = document.getElementById('inputs'), deviceInfoOutputs = document.getElementById('outputs'),
        device = document.querySelector('.device-name'), midi;

    // request MIDI access
    if(navigator.requestMIDIAccess){
        navigator.requestMIDIAccess({sysex: false}).then(onMIDISuccess, onMIDIFailure);
    }
    else {
        alert("No MIDI support in your browser.");
    }

    // midi functions
    function onMIDISuccess(midiAccess){
        midi = midiAccess;
        var inputs = midi.inputs.values();
        // loop through all inputs
        for(var input = inputs.next(); input && !input.done; input = inputs.next()){
            // listen for midi messages
            input.value.onmidimessage = onMIDIMessage;
        }
        // listen for connect/disconnect message
        midi.onstatechange = onStateChange;
    }

    function onMIDIMessage(event){
        var data = event.data,
            cmd = data[0] >> 4,
            channel = data[0] & 0xf,
            type = data[0], // ignore [inconsistent between devices]
            note = data[1],
            velocity = data[2];

        if (velocity) {
            noteOn(note, velocity);
        }
        else{
            noteOff(note, velocity);
        }
        //log('data', data, 'cmd', cmd, 'channel', channel);
        logger(keyData, 'key data', data);
    }

    function onStateChange(event){
        var port = event.port, state = port.state, name = port.name, type = port.type;
        device.textContent = name.replace(/port.*/i, '');
        showMIDIPorts(midi);
        // if(type == "input")
        //log("name", name, "port", port, "state", state);

    }

    function listInputs(inputs){
        var input = inputs.value;
        device.textContent = input.name.replace(/port.*/i, '');
        log("Input port : [ type:'" + input.type + "' id: '" + input.id +
            "' manufacturer: '" + input.manufacturer + "' name: '" + input.name +
            "' version: '" + input.version + "']");
    }

    function noteOn(midiNote, velocity){

    }

    function noteOff(midiNote, velocity){

    }


    function onMIDIFailure(e){
        log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
    }


    // utility functions
    function logger(container, label, data){
        console.log(" [channel: " + (data[0]) + ", cmd: " + (data[0] >> 4) + ", type: " + (data[0] & 0xf0) + " , note: " + data[1] + " , velocity: " + data[2] + "]");

        var index = ebkObj.intRandom(0,cameraFixPositions_mx.length-1);

        CameraZoom_MIDI(data[0],data[1],data[2],0.001);

        CameraRotation_MIDI(data[0],data[1],data[2]);
        loadModel(data[0],data[1],data[2]);

        objsInScene.lastValue = data[1];

        // camera.position.x =cameraFixPositions_mx[index][0];
        // camera.position.y = cameraFixPositions_mx[index][1];
        //camera.position.z =cameraFixPositions_mx[index][2];

        objsInScene.force = 7;


    }
    ////////////   END From Internet

    //////From myselve/////////////////////////////////////
    function loadModel(channel,id,value) {

        if ((id == 0) && (channel == 192)) {
            ebkObj.trif_mx_CleanUpMemory();
            ebkObj_1.trif_mx_CleanUpMemory();
            iniEbkSession(true,{});
            ebkObj.trifShowHide();
            ebkObj_1.trifShowHide();
        }
    }

    //////From myselve/////////////////////////////////////
    function CameraZoom_MIDI(channel,id,value,factorUnit) {

        if ((id==11)&&(channel==176)) {
            objsInScene.webCamPathAngleX_Rad = value;
            objsInScene.webCamPathAngleY_Rad = value;
            objsInScene.webCamPathAngleZ_Rad = value;
        }
    }

    function CameraRotation_MIDI(channel,id,value) {


        if (channel==176) {

            if (id==8) {
                camera.position.x = objsInScene.webCamPathAngleX_Rad * Math.cos(objsInScene.webCamPathAngleX_mx[value]);
                // camera.updateMatrixWorld();
            }
            else if (id==9) {
                camera.position.y = objsInScene.webCamPathAngleY_Rad * Math.sin(objsInScene.webCamPathAngleY_mx[value]);
                // camera.updateMatrixWorld();
            }
            else if (id==10) {
                camera.position.z = objsInScene.webCamPathAngleZ_Rad * Math.cos(objsInScene.webCamPathAngleZ_mx[value]);

            }
            camera.updateMatrixWorld();
        }



    }


};