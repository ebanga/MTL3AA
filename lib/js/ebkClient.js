/**
 * Created by jean-jacquesebanga on 2015-10-23/ 2016-07-06.
 */

var paramsEnv,intls , objsInScene ={}, ebkObj,  gui,

   objsInScene = {uvmReferencePlane_mx:[[-3,3],[0,2]]}


    objsInScene.ebkTriangulation = {thresholdRegMin:1,
                                    thresholdRegMax:1,
                                 steps_count :3,
                                    innerFactor: 1
    };


var canvasWidth = 320 / 2;
var canvasHeight = 240 / 2;

var ctx; //audio context
var buf; //audio buffer
var src;
var analyser; //
var samples = 128;
var setupSound = false


var camera, scene, renderer,ambientLight,
    bulbLight, bulbMat,
    object, loader, stats;
var ballMat,  floorMat,meshBox,meshMx;
var move;


var data, cmd, channel, type, note, velocity;

var step_count  = 100;
var counter     = 0;




function rePlay() {

    src.stop();
    ctx.close();
    webAudioInit();
}

function trigger() {

}


function  cleanUp() {

}

function RunIndexInterval() {

}


function runActions()  {


    iniEbkSession(true,{});

}


function exportImagel() {


};


function iniEbkSession(isSceneReady) {

    if (isSceneReady) {

    }

}





function saveAsImage() {
    var imgData, imgNode;

    try {
        var strMime = "image/png";
        imgData = renderer.domElement.toDataURL(strMime);

        saveFile(imgData.replace(strMime,  "image/octet-stream"), "test.png");

    } catch (e) {
        console.log(e);
        return;
    }

}

var saveFile = function (strData, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}




////////////////////////////////////
/******* Montréal 375 *******/
MTL375                                                               = function(params) {

    Ebk.BoxTransitions.call(this);

    if (params !==undefined) {
        this.mtlTCSQSizeFact                    =  ('mtlTCSQSizeFact' in params)  ? params.mtlTCSQSizeFact      :10000;
    }
    else {
        //définir les valeurs par défaut pour tests
        this.mtlTCSQSizeFact                    =  10000;
    };

    // 1- créer les marques sur la carte google
    // 2- exporter la carte sur KML
    // 3- Convertir le KML en JSON
    var  mtlBoundaries          ={"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},
        "features":[{"type":"Feature", "properties":{"Name":"Point 1","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9534372,45.4039967,0]}},{"type":"Feature","properties":{"Name":"Point 2","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9738656,45.4265279,0]}},{"type":"Feature","properties":{"Name":"Point 3","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9719772,45.4367676,0]}},{"type":"Feature","properties":{"Name":"Point 4","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9369583,45.4517017,0]}},{"type":"Feature","properties":{"Name":"Point 5","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9477728,45.4584451,0]}},{"type":"Feature","properties":{"Name":"Point 6","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9439964,45.4651874,0]}},{"type":"Feature","properties":{"Name":"Point 7","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9373016,45.4720494,0]}},{"type":"Feature","properties":{"Name":"Point 8","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.926487,45.4730124,0]}},{"type":"Feature","properties":{"Name":"Point 9","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9216804,45.465669,0]}},{"type":"Feature","properties":{"Name":"Point 10","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9076042,45.4594083,0]}},{"type":"Feature","properties":{"Name":"Point 11","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8765335,45.4731329,0]}},{"type":"Feature","properties":{"Name":"Point 12","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8652038,45.4854099,0]}},{"type":"Feature","properties":{"Name":"Point 13","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8525009,45.4933525,0]}},{"type":"Feature","properties":{"Name":"Point 14","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8581657,45.4984063,0]}},{"type":"Feature","properties":{"Name":"Point 15","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8447761,45.5145271,0]}},{"type":"Feature","properties":{"Name":"Point 16","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8006592,45.5121213,0]}},{"type":"Feature","properties":{"Name":"Point 17","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7984276,45.5079109,0]}},{"type":"Feature","properties":{"Name":"Point 18","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.771305,45.5063475,0]}},{"type":"Feature","properties":{"Name":"Point 19","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7467575,45.5150084,0]}},{"type":"Feature","properties":{"Name":"Point 20","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7182617,45.5344914,0]}},{"type":"Feature","properties":{"Name":"Point 21","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7012672,45.5433888,0]}},{"type":"Feature","properties":{"Name":"Point 22","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6784363,45.5484381,0]}},{"type":"Feature","properties":{"Name":"Point 23","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6665917,45.5602181,0]}},{"type":"Feature","properties":{"Name":"Point 24","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6477089,45.591579,0]}},{"type":"Feature","properties":{"Name":"Point 25","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6284828,45.6206412,0]}},{"type":"Feature","properties":{"Name":"Point 26","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5721778,45.6577278,0]}},{"type":"Feature","properties":{"Name":"Point 27","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5507202,45.6694847,0]}},{"type":"Feature","properties":{"Name":"Point 28","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5332107,45.6781209,0]}},{"type":"Feature","properties":{"Name":"Point 29","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5213661,45.6913126,0]}},{"type":"Feature","properties":{"Name":"Point 30","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.50317,45.6975475,0]}},{"type":"Feature","properties":{"Name":"Point 31","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4966469,45.6946698,0]}},{"type":"Feature","properties":{"Name":"Point 32","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4767341,45.7012641,0]}},{"type":"Feature","properties":{"Name":"Point 33","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4887505,45.6845971,0]}},{"type":"Feature","properties":{"Name":"Point 34","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4911537,45.6633666,0]}},{"type":"Feature","properties":{"Name":"Point 35","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4870338,45.6487284,0]}},{"type":"Feature","properties":{"Name":"Point 36","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4873771,45.6379274,0]}},{"type":"Feature","properties":{"Name":"Point 37","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.504715,45.6127166,0]}},{"type":"Feature","properties":{"Name":"Point 38","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5096931,45.5989059,0]}},{"type":"Feature","properties":{"Name":"Point 39","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.504715,45.58353,0]}},{"type":"Feature","properties":{"Name":"Point 40","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5165596,45.5671886,0]}},{"type":"Feature","properties":{"Name":"Point 41","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5381889,45.5365355,0]}},{"type":"Feature","properties":{"Name":"Point 42","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5471153,45.5091139,0]}},{"type":"Feature","properties":{"Name":"Point 43","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5411072,45.4887796,0]}},{"type":"Feature","properties":{"Name":"Point 44","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5388756,45.4772254,0]}},{"type":"Feature","properties":{"Name":"Point 45","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5582733,45.4681971,0]}},{"type":"Feature","properties":{"Name":"Point 46","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5634232,45.454953,0]}},{"type":"Feature","properties":{"Name":"Point 47","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6058235,45.4167685,0]}},{"type":"Feature","properties":{"Name":"Point 48","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6341476,45.412551,0]}},{"type":"Feature","properties":{"Name":"Point 49","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6535455,45.4195402,0]}},{"type":"Feature","properties":{"Name":"Point 50","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6691665,45.4283351,0]}},{"type":"Feature","properties":{"Name":"Point 51","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6942291,45.4307445,0]}},{"type":"Feature","properties":{"Name":"Point 52","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7721634,45.4388151,0]}},{"type":"Feature","properties":{"Name":"Point 53","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7949943,45.4450782,0]}},{"type":"Feature","properties":{"Name":"Point 54","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8040924,45.4345992,0]}},{"type":"Feature","properties":{"Name":"Point 55","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8353348,45.4247207,0]}},{"type":"Feature","properties":{"Name":"Point 56","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8466644,45.4284555,0]}},{"type":"Feature","properties":{"Name":"Point 57","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8804817,45.414238,0]}},{"type":"Feature","properties":{"Name":"Point 58","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9211655,45.4020661,0]}}]}
    this.mtlTCSQBoundariesInMx  =  mtlBoundaries.features;


     var data1 =   {"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[{"type":"Feature","properties":{"Name":"Lay101","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.956871,45.4030303,0]}},{"type":"Feature","properties":{"Name":"Lay102","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9764404,45.4268893,0]}},{"type":"Feature","properties":{"Name":"Lay103","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9383315,45.4473666,0]}},{"type":"Feature","properties":{"Name":"Lay104","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.944683,45.4612143,0]}},{"type":"Feature","properties":{"Name":"Lay105","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9276885,45.4702439,0]}},{"type":"Feature","properties":{"Name":"Lay106","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9081191,45.4584451,0]}},{"type":"Feature","properties":{"Name":"Lay107","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8538742,45.4917885,0]}},{"type":"Feature","properties":{"Name":"Lay108","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8576508,45.4999704,0]}},{"type":"Feature","properties":{"Name":"Lay109","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8444328,45.5144069,0]}},{"type":"Feature","properties":{"Name":"Lay110","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8191986,45.5113996,0]}},{"type":"Feature","properties":{"Name":"Lay111","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8001442,45.5121213,0]}},{"type":"Feature","properties":{"Name":"Lay112","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7958526,45.5077906,0]}},{"type":"Feature","properties":{"Name":"Lay113","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7510491,45.5116401,0]}},{"type":"Feature","properties":{"Name":"Lay114","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6976622,45.5426678,0]}},{"type":"Feature","properties":{"Name":"Lay115","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6753464,45.5467555,0]}},{"type":"Feature","properties":{"Name":"Lay116","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6169814,45.6277247,0]}},{"type":"Feature","properties":{"Name":"Lay117","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5466003,45.6685253,0]}},{"type":"Feature","properties":{"Name":"Lay118","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5205076,45.6905937,0]}},{"type":"Feature","properties":{"Name":"Lay119","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4968185,45.6934714,0]}},{"type":"Feature","properties":{"Name":"Lay120","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.47725,45.6980255,0]}},{"type":"Feature","properties":{"Name":"Lay121","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4909829,45.6766792,0]}},{"type":"Feature","properties":{"Name":"Lay122","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4920132,45.6598835,0]}},{"type":"Feature","properties":{"Name":"Lay123","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4861767,45.6447638,0]}},{"type":"Feature","properties":{"Name":"Lay124","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4978485,45.6226824,0]}},{"type":"Feature","properties":{"Name":"Lay125","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5081482,45.6080334,0]}},{"type":"Feature","properties":{"Name":"Lay126","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5095215,45.5948225,0]}},{"type":"Feature","properties":{"Name":"Lay127","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5047149,45.5818483,0]}},{"type":"Feature","properties":{"Name":"Lay128","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5280609,45.5467551,0]}},{"type":"Feature","properties":{"Name":"Lay129","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5476303,45.5130836,0]}},{"type":"Feature","properties":{"Name":"Lay130","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5411071,45.4832437,0]}},{"type":"Feature","properties":{"Name":"Lay131","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5400772,45.4731332,0]}},{"type":"Feature","properties":{"Name":"Lay132","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5593033,45.4663915,0]}},{"type":"Feature","properties":{"Name":"Lay133","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5668564,45.4473667,0]}},{"type":"Feature","properties":{"Name":"Lay134","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5853957,45.4300217,0]}},{"type":"Feature","properties":{"Name":"Lay135","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6059952,45.4165275,0]}},{"type":"Feature","properties":{"Name":"Lay136","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6214446,45.4102618,0]}},{"type":"Feature","properties":{"Name":"Lay137","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6427306,45.4136357,0]}},{"type":"Feature","properties":{"Name":"Lay138","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7227249,45.4360448,0]}},{"type":"Feature","properties":{"Name":"Lay139","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7725067,45.4394174,0]}},{"type":"Feature","properties":{"Name":"Lay140","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.794136,45.4456804,0]}},{"type":"Feature","properties":{"Name":"Lay141","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8044357,45.4345993,0]}},{"type":"Feature","properties":{"Name":"Lay142","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8257218,45.4249617,0]}},{"type":"Feature","properties":{"Name":"Lay143","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8476944,45.424721,0]}},{"type":"Feature","properties":{"Name":"Lay144","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9208221,45.4030302,0]}}]}


     var data2 =   {"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[{"type":"Feature","properties":{"Name":"Lay201","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9846785,45.3712123,0]}},{"type":"Feature","properties":{"Name":"Lay202","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-74.0159225,45.432913,0]}},{"type":"Feature","properties":{"Name":"Lay203","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9901731,45.4548331,0]}},{"type":"Feature","properties":{"Name":"Lay204","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.972663,45.478912,0]}},{"type":"Feature","properties":{"Name":"Lay205","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9448547,45.4928714,0]}},{"type":"Feature","properties":{"Name":"Lay206","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9108658,45.4897424,0]}},{"type":"Feature","properties":{"Name":"Lay207","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8840866,45.5017751,0]}},{"type":"Feature","properties":{"Name":"Lay208","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8669204,45.5241496,0]}},{"type":"Feature","properties":{"Name":"Lay209","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8470076,45.5318462,0]}},{"type":"Feature","properties":{"Name":"Lay210","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8212585,45.5318461,0]}},{"type":"Feature","properties":{"Name":"Lay211","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7955093,45.5287198,0]}},{"type":"Feature","properties":{"Name":"Lay212","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7828064,45.5229469,0]}},{"type":"Feature","properties":{"Name":"Lay213","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7601471,45.5306434,0]}},{"type":"Feature","properties":{"Name":"Lay214","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7045288,45.5570929,0]}},{"type":"Feature","properties":{"Name":"Lay215","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6794662,45.576081,0]}},{"type":"Feature","properties":{"Name":"Lay216","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6269379,45.6433281,0]}},{"type":"Feature","properties":{"Name":"Lay217","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5534668,45.6925115,0]}},{"type":"Feature","properties":{"Name":"Lay218","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5215377,45.7090564,0]}},{"type":"Feature","properties":{"Name":"Lay219","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4902953,45.7172072,0]}},{"type":"Feature","properties":{"Name":"Lay220","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4490966,45.7104949,0]}},{"type":"Feature","properties":{"Name":"Lay221","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4573364,45.6798001,0]}},{"type":"Feature","properties":{"Name":"Lay222","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4597396,45.6610874,0]}},{"type":"Feature","properties":{"Name":"Lay223","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4556198,45.6471686,0]}},{"type":"Feature","properties":{"Name":"Lay224","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4672927,45.619801,0]}},{"type":"Feature","properties":{"Name":"Lay225","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4755324,45.6061122,0]}},{"type":"Feature","properties":{"Name":"Lay226","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4806823,45.59218,0]}},{"type":"Feature","properties":{"Name":"Lay227","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4799957,45.5813675,0]}},{"type":"Feature","properties":{"Name":"Lay228","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.4985352,45.5453128,0]}},{"type":"Feature","properties":{"Name":"Lay229","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5150147,45.5104378,0]}},{"type":"Feature","properties":{"Name":"Lay230","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5139846,45.4849287,0]}},{"type":"Feature","properties":{"Name":"Lay231","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5122682,45.4704849,0]}},{"type":"Feature","properties":{"Name":"Lay232","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5332107,45.4577225,0]}},{"type":"Feature","properties":{"Name":"Lay233","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5380172,45.4420676,0]}},{"type":"Feature","properties":{"Name":"Lay234","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.561362,45.4193007,0]}},{"type":"Feature","properties":{"Name":"Lay235","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.5888289,45.4023079,0]}},{"type":"Feature","properties":{"Name":"Lay236","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6190412,45.3909774,0]}},{"type":"Feature","properties":{"Name":"Lay237","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.6568071,45.3965215,0]}},{"type":"Feature","properties":{"Name":"Lay238","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7364578,45.4129125,0]}},{"type":"Feature","properties":{"Name":"Lay239","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7735366,45.4232751,0]}},{"type":"Feature","properties":{"Name":"Lay240","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.7879562,45.4297813,0]}},{"type":"Feature","properties":{"Name":"Lay241","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8006593,45.4191787,0]}},{"type":"Feature","properties":{"Name":"Lay242","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8219452,45.4097796,0]}},{"type":"Feature","properties":{"Name":"Lay243","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.8446045,45.4052004,0]}},{"type":"Feature","properties":{"Name":"Lay244","description":null,"timestamp":null,"begin":null,"end":null,"altitudeMode":null,"tessellate":-1,"extrude":-1,"visibility":-1,"drawOrder":null,"icon":null},"geometry":{"type":"Point","coordinates":[-73.9142991,45.3822963,0]}}]}

    this.mtlTCSQBoundariesInBigMx = [data1.features,data2.features];


    //this.mtlTCSQVerticesFromJSon = [-4.73083,0.145128,0,-0.282543,-2.21097,0,-4.73426,0.824223,-0,0.141154,0.856859,-0,4.54279,1.94181,0,4.48543,2.16192,0,1.60119,-1.66646,0,1.29201,1.31348,-0,2.52875,-0.364454,0,2.44286,1.88747,-0,-2.379,-0.444613,0,-2.0555,1.42656,-0,-3.82516,-0.121115,0,-3.98405,1.23189,-0,-4.06371,0.928429,-0,-4.31922,-0.073878,0,-3.10208,-0.231333,0,-2.7793,0.813917,-0,-3.51909,0.799603,-0,-3.46362,-0.176224,0,-3.61416,1.20469,-0,-3.64439,-0.148669,0,-1.59702,-0.844263,0,-1.06024,0.663619,-0,-1.40328,0.924851,-0,-2.17695,-0.261393,0,-0.776598,-1.46664,0,-0.335867,0.807762,-0,0.510458,0.778847,-0,0.659324,-2.04092,0,1.70425,-0.974235,0,0.901233,1.01754,-0,2.1165,-0.58346,0,1.86743,1.69352,-0,3.73686,0.859401,0,3.62234,2.02584,0,3.01829,2.0163,0,3.19006,0.247473,0,3.32747,0.553437,0,3.32031,2.02704,0,0.834672,0.926819,-0,1.21614,-1.647,0,0.059564,-2.29686,0,0.325806,0.774911,-0,4.28365,1.77192,0,4.18346,2.32167,0,4.03888,1.12958,0,3.9029,2.17376,0,4.39244,2.26203,0,4.46401,1.92759,0,4.63578,1.98485,0,4.79324,2.1332,0];
    //

    this.mtlTCSQVerticesFromJSon =  [-3.66733,1.2882,-0,-3.6782,-0.203266,-0,-3.6118,-0.221375,-0,-3.57075,0.85359,-0,-2.93574,-0.366244,-0,-2.82226,0.781155,-0,-3.83031,1.27009,-0,-3.84117,-0.161013,-0,-4.11401,0.974314,-0,-4.13091,-0.100651,-0,-4.69348,0.811336,-0,-4.72246,-0.02218,-0,-2.78484,-0.396425,-0,-2.62911,0.926024,-0,-2.42267,-0.414533,-0,-2.43595,1.06486,-0,-2.23555,-0.275701,-0,-2.38766,1.20369,-0,-2.07257,-0.32399,0,-2.06774,1.41496,-0,-1.74058,-0.758596,0,-1.89269,1.30631,-0,-1.36633,-0.98097,0,-1.69953,1.17954,-0,-0.705732,-1.53727,-0,-1.12585,0.692786,-0,-0.403246,-2.08487,-0,-0.760782,0.666709,-0,0.055699,-2.27262,0,-0.34356,0.823167,-0,0.975615,-1.91769,0,0.062073,0.852141,-0,1.20016,-1.6859,-0,0.460462,0.772463,-0,1.67098,-1.60622,-0,0.663278,0.859385,-0,1.72893,-0.968801,0,0.974746,1.09842,-0,2.19976,-0.519708,0,1.30794,1.30848,-0,3.13537,0.10202,0,1.93571,1.80948,-0,3.39492,0.657351,0,2.91961,2.01032,-0,3.98043,1.00745,0,3.40251,2.02075,-0,4.06736,1.18999,0,3.70673,2.03813,-0,4.26727,1.68544,0,3.88926,2.15287,-0,4.39766,1.78974,0,4.13264,2.2989,-0,4.50196,1.90274,0,4.29523,2.30759,-0,4.59208,1.99286,0,4.45745,2.14537,-0,4.76713,2.09365,-0,4.71498,2.15273,-0];




};

MTL375.prototype                                                     = Object.create(Ebk.BoxTransitions.prototype);
MTL375.prototype.constructor                                         = MTL375;

//Permet d'assigner toutes les propriétés, individuellement ou collectivement
MTL375.prototype.mtlTCSQAssign                                       = function (params) {
    if (params !== undefined) {
        if ('mtlTCSQSizeFact' in params)   { this.mtlTCSQSizeFact    = params.mtlTCSQSizeFact;};
    };
}

// Convertir les données JSon en format des fonctions EBK
MTL375.prototype.mtlTCSQDataToEBKFormat                              = function (eastWestCst,southNorthCst) {
    var coords;

    for (var locIndex = 0;locIndex<  this.mtlTCSQBoundariesInBigMx[0].length;locIndex++ ) {
    coords = this.mtlTCSQBoundariesInBigMx[0][locIndex].geometry.coordinates;
    this.mtlTCSQBoundariesLocations_Conversions.push([this.mtlTCSQSizeFact*(coords[0]+eastWestCst)  ,0,
                                                      this.mtlTCSQSizeFact*(coords[1]-southNorthCst)  ]);
    } ;
};

// Convertir les données JSon en format des fonctions EBK
MTL375.prototype.mtlTCSQDataToEBKFormat1                              = function (eastWestCst,southNorthCst) {
    var coords;

    for (var locIndex = 0;locIndex<   this.mtlTCSQVertices.length;locIndex++ ) {
        coords =  this.mtlTCSQVertices[locIndex];
        this.mtlTCSQBoundariesLocations_Conversions.push([this.mtlTCSQSizeFact*(coords[0]+eastWestCst)  ,0,
            this.mtlTCSQSizeFact*(coords[1]-southNorthCst)  ]);
    } ;
};


// Convertir les données JSon en format des fonctions EBK
MTL375.prototype.mtlTCSQParseToVertices                              = function () {
    var coords;
    this.mtlTCSQVertices = [];
    var globalVerticesIndex = 0 ;
    while(globalVerticesIndex<this.mtlTCSQVerticesFromJSon.length) {
        var mx_xyz = [], mxIndex= 0;
        while (mxIndex <3) {

            mx_xyz.push(this.mtlTCSQVerticesFromJSon[globalVerticesIndex]);
           console.log(globalVerticesIndex,mxIndex,this.mtlTCSQVerticesFromJSon[globalVerticesIndex]);
            mxIndex++;
            globalVerticesIndex++;
        } ;
        this.mtlTCSQVertices.push(mx_xyz.slice());
        //globalVerticesIndex++;
    };
    console.log(this.mtlTCSQVertices,this.mtlTCSQVertices.length);

 };


//Construit les contour initiaux
MTL375.prototype.mtlTCSQVectorBordersIni_Build                       = function (locIndex) {

   var vertex1                   =  this.mtlTCSQLocationsModelFromCenter[locIndex-2];
   var vertex2                   =  this.mtlTCSQLocationsModelFromCenter[locIndex-1];
   var vertex3                   =  this.mtlTCSQLocationsModelFromCenter[locIndex];


   var vertex1_                  =  [vertex1[0],vertex1[2]];
   var vertex2_                  =  [vertex2[0],vertex2[2]];
   var vertex3_                  =  [vertex3[0],vertex3[2]];



    var resAngle                 =  this.orientation3Vertex (vertex2_,vertex1_,vertex3_);


    var vect2_1                   =  this.vect(vertex2,vertex1 );
    var vect2_3                   =  this.vect(vertex2,vertex3 );
    var kVect2_1                  =  this.vectThreeDScaProd (0.2,vect2_1 );
    var kVect2_3                  =  this.vectThreeDScaProd (0.2,vect2_3 );
    var kVtx2_1                   =  this.vectThreeDSum (vertex2,kVect2_1 );
    var kVtx2_3                   =  this.vectThreeDSum (vertex2,kVect2_3 );
    var pointIn                   =  this.centerArr([kVtx2_1,kVtx2_3]);
    var vectPointIn               =  this.vect(vertex2,pointIn );
    var symetryVectPointIn        =  this.vectThreeDScaProd (-1,vectPointIn);
    var symetryVtxPointIn         =  this.vectThreeDSum (vertex2,symetryVectPointIn );



    if (resAngle.antiClockwise==true) {
          this.mtlTCSQBorders.push([pointIn ,symetryVtxPointIn]);
    } else  if (resAngle.antiClockwise==false) {
         this.mtlTCSQBorders.push([symetryVtxPointIn,pointIn ]);
    }
  // console.log(kVertex1,kVertex2,kVertexCenter);
   // if (this.mtlTCSQBorders.length < 7 )  console.log( resAngle)
};


//Construit les contour initiaux
MTL375.prototype.mtlTCSQVectorBordersNextLayers_Build                = function (locIndex,borders) {

    var vertex1                   =  borders[locIndex-2][0];
    var vertex2                   =  borders[locIndex-1][0];
    var vertex3                   =  borders[locIndex][0];


    var vertex1_                  =  [vertex1[0],vertex1[2]];
    var vertex2_                  =  [vertex2[0],vertex2[2]];
    var vertex3_                  =  [vertex3[0],vertex3[2]];



    var resAngle                 =  this.orientation3Vertex (vertex2_,vertex1_,vertex3_);


    var vect2_1                   =  this.vect(vertex2,vertex1 );
    var vect2_3                   =  this.vect(vertex2,vertex3 );
    var kVect2_1                  =  this.vectThreeDScaProd (0.2,vect2_1 );
    var kVect2_3                  =  this.vectThreeDScaProd (0.2,vect2_3 );
    var kVtx2_1                   =  this.vectThreeDSum (vertex2,kVect2_1 );
    var kVtx2_3                   =  this.vectThreeDSum (vertex2,kVect2_3 );
    var pointIn                   =  this.centerArr([kVtx2_1,kVtx2_3]);
    var vectPointIn               =  this.vect(vertex2,pointIn );
    var symetryVectPointIn        =  this.vectThreeDScaProd (-1,vectPointIn);
    var symetryVtxPointIn         =  this.vectThreeDSum (vertex2,symetryVectPointIn );



    if (resAngle.antiClockwise==true) {
        this.mtlTCSQBordersNextLayers.push([pointIn ,symetryVtxPointIn]);
    } else  if (resAngle.antiClockwise==false) {
        this.mtlTCSQBordersNextLayers.push([symetryVtxPointIn,pointIn ]);
    }
    // console.log(kVertex1,kVertex2,kVertexCenter);
    // if (this.mtlTCSQBorders.length < 7 )  console.log( resAngle)
}




// Batir le modèle à partir du centre de gravité
MTL375.prototype.mtlTCSQLocationsModelFromCenterMake                = function () {
    var coords,newCoords, minX = 0, maxX = 0,minY=0,maxY= 0, minZ=0,maxZ= 0, x_, y_,z_;
    for (var locIndex = 0;locIndex< this.mtlTCSQBoundariesLocations_Conversions.length;locIndex++ ) {
        coords = this.mtlTCSQBoundariesLocations_Conversions[locIndex];

        x_ = coords[0] - this.mtlTCSQBoundariesCenter[0];
        y_ = coords[1] - this.mtlTCSQBoundariesCenter[1];
        z_ = coords[2] - this.mtlTCSQBoundariesCenter[2];

        minX = (x_<= minX )?  x_ : minX;
        maxX = (x_ >= maxX)?  x_ : maxX;
        minZ = (z_<= minZ )?  z_ : minZ;
        maxZ = (z_ >= maxZ)?  z_ : maxZ;

        this.mtlTCSQLocationsModelFromCenter.push([x_,y_, z_]);

        if (locIndex >=2) {
            this.mtlTCSQVectorBordersIni_Build(locIndex);

        }
    } ;
    this.mtlTCSQBordersLayers.push(this.mtlTCSQBorders.slice());
   // console.log(this.mtlTCSQBordersLayers);

};

// Batir les contours successif
MTL375.prototype.mtlTCSQBoundariesIter                               = function () {
    var i = 0;
    while (i<4) {
        this.mtlTCSQBordersNextLayers   = [];
        var lastMx = this.mtlTCSQBordersLayers[this.mtlTCSQBordersLayers.length-1];

        for (var locIndex = 0;locIndex< lastMx.length;locIndex++ ) {
            if (locIndex >=2) {
               // console.log(lastMx[locIndex][0]);
                this.mtlTCSQVectorBordersNextLayers_Build(locIndex,lastMx);
            }
        }
       // console.log(this.mtlTCSQBordersNextLayers.slice());
        this.mtlTCSQBordersLayers.push(this.mtlTCSQBordersNextLayers.slice());
        i++;
    }

   // console.log( this.mtlTCSQBordersLayers);
};

// initialiser les données intermediares
MTL375.prototype.mtlTCSQIniOperationalData                           = function () {
    this.mtlTCSQBoundariesLocations_Conversions  = [];

    this.mtlTCSQLocationsModelFromCenter         = [];
    this.mtlTCSQBorders                          = [];
    this.mtlTCSQBordersNextLayers                = [];
    this.mtlTCSQBordersLayers                    = [];

    this.mtlTCSQBoundariesLocations_Conversions_ = [];
    this.mtlTCSQLocationsModelFromCenter_        = [];
    this.mtlTCSQParseToVertices();
    this.mtlTCSQDataToEBKFormat1(0.1,0.1);
    this.mtlTCSQBoundariesCenter = this.centerArr(this.mtlTCSQBoundariesLocations_Conversions);
    this.mtlTCSQLocationsModelFromCenterMake();
    this.mtlTCSQBoundariesIter();
};

MTL375.prototype.mtlTCSQGenerateMx                                   = function(){
   this.dilVectsBuild({dilVectsPivot_mx:[[0,0,1000]],dilVectsEnd_mx:this.mtlTCSQLocationsModelFromCenter,dilVectsFactor_mx:[[0.1,0.1,0.2]]});
   this.mtlTCSQDil = this.dilVectsValue_mx.slice();
   // console.log( this.mtlTCSQLocationsModelFromCenter);
};

//construire
MTL375.prototype.mtlTCSQBuild                                          = function(params){
    this.mtlTCSQAssign(params);
    this.mtlTCSQIniOperationalData();
    this.mtlTCSQGenerateMx();
};

//construire
MTL375.prototype.mtlTCSQGraphicsBuild                                          = function(){
    var coords,dilCoord,sizeBox = 2800, wr = false;
    //this.mtlTCSQLocationsModelFromCenter.length
    for (var locIndex = 0;locIndex< this.mtlTCSQLocationsModelFromCenter.length;locIndex++ ) {
        coords = this.mtlTCSQLocationsModelFromCenter[locIndex]
        var    box1     = new THREE.BoxGeometry(sizeBox,sizeBox,sizeBox);
        var    mat1     = new THREE.MeshBasicMaterial( {color:"yellow",wireframe:wr});
        var    meshBox1 = new THREE.Mesh(box1,mat1)  ;
        scene.add(meshBox1);
        meshBox1.position.set(coords[0],coords[1],-coords[2]);

        //dilCoord = this.mtlTCSQDil[locIndex];
        //
        //var    box2     = new THREE.BoxGeometry(120,120,120);
        //var    mat2     = new THREE.MeshBasicMaterial( {color:"red",wireframe:false});
        //var    meshBox2 = new THREE.Mesh(box2,mat2)  ;
        //scene.add(meshBox2);
        //meshBox2.position.set(10*coords[0],5*coords[1],-10*coords[2]);
    } ;


    //for (var locBoundsIndex = 0;locBoundsIndex< this.mtlTCSQBorders.length;locBoundsIndex++ ) {
    //    coords = this.mtlTCSQBorders[locBoundsIndex];
    //    var    box3     = new THREE.BoxGeometry(sizeBox,sizeBox,sizeBox);
    //    var    mat3     = new THREE.MeshBasicMaterial( {color:"green",wireframe:true});
    //    var    meshBox3 = new THREE.Mesh(box3,mat3)  ;
    //    scene.add(meshBox3);
    //    meshBox3.position.set(coords[0][0],coords[0][1],-coords[0][2]);
    //
    //
    //    var    box4     = new THREE.BoxGeometry(sizeBox,sizeBox,sizeBox);
    //    var    mat4     = new THREE.MeshBasicMaterial( {color:"white",wireframe:true});
    //    var    meshBox4 = new THREE.Mesh(box4,mat4)  ;
    //    scene.add(meshBox4);
    //    meshBox4.position.set(coords[1][0],coords[1][1],-coords[1][2]);
    //
    //
    //} ;


    //for (var layerIndex = 0;layerIndex<  this.mtlTCSQBordersLayers.length;layerIndex++ ) {
    //
    //    for (var locBoundsIndex = 0; locBoundsIndex < this.mtlTCSQBordersLayers[layerIndex].length; locBoundsIndex++) {
    //
    //        var loc    =  this.mtlTCSQBordersLayers[layerIndex];
    //        var   coords =  loc[locBoundsIndex][0];
    //        var    box5     = new THREE.BoxGeometry(sizeBox,sizeBox,sizeBox);
    //        var    mat5     = new THREE.MeshBasicMaterial( {color:"green",wireframe:wr});
    //        var    meshBox5 = new THREE.Mesh(box5,mat5)  ;
    //        scene.add(meshBox5);
    //        meshBox5.position.set(coords[0],coords[1],-coords[2]);
    //
    //
    //    }
    //    ;
    //
    //}



};





var mtl = new MTL375();
 //console.log(mtl.orientation3Vertex ([0,0],[-2,2],[2,2]));

//console.log(mtl.angleBetween3Vertex([0,0],[0,-1],[1,0]));

mtl.mtlTCSQBuild();



