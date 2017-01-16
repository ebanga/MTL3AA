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

var clock = new THREE.Clock(); var cumulativeDate = 0

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

var step_count       = 100;
var counter          = 0;
var jsonExternalData = {westBlock:""};



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

function foutihEbomeNdeuk(ebome,ndeuk) {


}

function addlisteners() {
    if (window.addEventListener) {
        document.getElementById("btnExport").addEventListener("click",saveAsImage,false);
    }
    else if (window.attachEvent) {

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


    function loadJSON(fileName,valueContainer) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', fileName, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
               // callback(xobj.responseText);
                valueContainer = JSON.parse(xobj.responseText);
                //console.log(valueContainer);

            }
        };
        xobj.send(null);
    }

////////////////////////////////////
/******* Montréal 375 *******/
MTL375                                                               = function(params) {

    Ebk.BoxTransitions.call(this);


    if (params !==undefined) {
        this.mtlTCSQSizeFact                    =  ('mtlTCSQSizeFact' in params)  ? params.mtlTCSQSizeFact      :50;
        this.mtlTCSQScaleFact                   =  ('mtlTCSQScaleFact' in params) ? params.mtlTCSQScaleFact     :[0.08,0.08];
        this.mtlTCSQBoundariesScaleLayer_Count  =  ('mtlTCSQBoundariesScaleLayer_Count' in params)  ? params.mtlTCSQBoundariesScaleLayer_Count :12;
    }
    else {
        //définir les valeurs par défaut pour tests
        this.mtlTCSQSizeFact                    =  50;
        this.mtlTCSQScaleFact                   =  [0.08,0.08];
        this.mtlTCSQBoundariesScaleLayer_Count  =  12;
    };


    this.mtlTCSQNewOrigin = [0,0,0];

    this.mtlTCSQIsBuild = false;

};

MTL375.prototype                                                     = Object.create(Ebk.BoxTransitions.prototype);
MTL375.prototype.constructor                                         = MTL375;

//Permet d'assigner toutes les propriétés, individuellement ou collectivement
MTL375.prototype.mtlTCSQAssign                                       = function (params) {
    if (params !== undefined) {
        if ('mtlTCSQSizeFact' in params)                      { this.mtlTCSQSizeFact          = params.mtlTCSQSizeFact;};
        if ('mtlTCSQScaleFact' in params)                     { this.mtlTCSQScaleFact         = params.mtlTCSQScaleFact;};
        if ('mtlTCSQBoundariesScaleLayer_Count' in params)    { this.mtlTCSQBoundariesScaleLayer_Count  = params.mtlTCSQBoundariesScaleLayer_Count;};
    };
};

// Convertir les données JSon en format des fonctions EBK
MTL375.prototype.mtlTCSQParseToVertices                              = function (mxFromJSON) {
    var mtlTCSQVertices = [];
    var globalVerticesIndex = 0 ;
    while(globalVerticesIndex<mxFromJSON.length) {
        var mx_xyz = [], mxIndex= 0;
        while (mxIndex <3) {
            mx_xyz.push(mxFromJSON[globalVerticesIndex]);
            mxIndex++;
            globalVerticesIndex++;
        } ;
        mtlTCSQVertices.push(mx_xyz.slice());
        // mtlTCSQVertices.push([this.mtlTCSQSizeFact*( mx_xyz[0]),0,this.mtlTCSQSizeFact*( mx_xyz[1])]);
    };
    return  mtlTCSQVertices;
};

// Subdivise une matrice de block de limitation en 2, la première moitier allant de l'indice 0 à la moitier  -1
// et l'autre moitier de du dernier à la moitier
MTL375.prototype.mtlTCSQSplitBoundaryBlockMx                         = function (blockMx) {
    var mxOut = [[],[]];
    for(var vertexIndex=0;vertexIndex<(blockMx.length/2);vertexIndex++) {
        mxOut[0].push(blockMx[vertexIndex].slice());
        mxOut[1].push(blockMx[(blockMx.length-1)- vertexIndex].slice());
    };
    return  mxOut;
};

// Convertir les données JSon en format des fonctions EBK
MTL375.prototype.mtlTCSQDataToEBKFormat                             = function (vertices_in,origin,fact) {
    var coords_0,coords_1;
    var bounderies =[[],[]];

    //var fact   = this.mtlTCSQSizeFact;
    //var origin =  this.mtlTCSQNewOrigin;

    for (var verticesIndex = 0;verticesIndex<   vertices_in[0].length;verticesIndex++ ) {
        coords_0 =  vertices_in[0][verticesIndex];
        coords_1 =  vertices_in[1][verticesIndex];


        var x_coord_0 =  coords_0[0];
        var y_coord_0 =  0;
        var z_coord_0 =  -coords_0[1];


        this.dilVectBuild({dilVectStart_mx:[0,0,0],
            dilVectEnd_mx:[x_coord_0,y_coord_0, z_coord_0],
            dilVectFactor_mx:[fact,fact,fact]});

        var coord_0_scale = this.dilVectValue_mx.slice();

        var x_coord_1 =  coords_1[0];
        var y_coord_1 =  0
        var z_coord_1 =  -coords_1[1];

        this.dilVectBuild({dilVectStart_mx:[0,0,0],
            dilVectEnd_mx:[x_coord_1,y_coord_1, z_coord_1],
            dilVectFactor_mx:[fact,fact,fact]});

        var coord_1_scale = this.dilVectValue_mx.slice();

        bounderies[0].push([ origin[0] +coord_0_scale[0] ,
                             origin[1] +coord_0_scale[1],
                             origin[2] +coord_0_scale[2]]);


        bounderies[1].push([ origin[0] +coord_1_scale[0],
                             origin[1] +coord_1_scale[1],
                             origin[2] +coord_1_scale[2]]);



    } ;



    return bounderies;
};


// Subdivise une matrice de block de limitation en 2, la première moitier allant de l'indice 0 à la moitier  -1
// et l'autre moitier de du dernier à la moitier
MTL375.prototype.mtlTCSQBoundaryBlockMxParse                         = function (jsonMx,origin,fact) {
    var json        = this.mtlTCSQParseToVertices(jsonMx).slice();
    var ebkMx       = this.mtlTCSQSplitBoundaryBlockMx (json).slice();
    var mxOut       = this.mtlTCSQDataToEBKFormat(ebkMx,origin,fact).slice();
    return   mxOut;
};


//Initialise toutes les autres couches mises en échelles ne fonction de la structure de la couche initiale coucche initiale
MTL375.prototype.mtlTCSQAllIniNextScaleLayers                        = function (BlocksLayers) {
    var refBlocks  = BlocksLayers[0],currentBlock,blocks;

    for(var nextLayersIndex = 1;nextLayersIndex<=this.mtlTCSQBoundariesScaleLayer_Count ;nextLayersIndex++) {
        blocks = [];
        for (var blockIndex = 0; blockIndex < refBlocks.length; blockIndex++) {
            currentBlock = [[], []];
            for (var coupleVerticeIndex = 0; coupleVerticeIndex < refBlocks[blockIndex][0].length; coupleVerticeIndex++) {
                currentBlock[0].push([0, 0, 0]);
                currentBlock[1].push([0, 0, 0]);
            };
            blocks.push(currentBlock.slice());
        };
        BlocksLayers.push(blocks.slice());
    };
};

//assigner les données dans une lignes de composante de vertices de la matrice   this.mtlTCSQBoundariesBlocksLayers
MTL375.prototype.mtlTCSQSetMatrixLayersValue                         = function (mxBlocksLayers,layerIndex,blockIndex,startOrEndMxIndex,vertexIndex,xyzIndex, value) {

    mxBlocksLayers[layerIndex][blockIndex][startOrEndMxIndex][vertexIndex][xyzIndex] =  value;
};

//renvoyer les données dans une lignes de composante de vertices de la matrice   this.mtlTCSQBoundariesBlocksLayers
MTL375.prototype.mtlTCSQGetMatrixLayersValue                         = function (mxBlocksLayers,layerIndex,blockIndex,startOrEndMxIndex,vertexIndex) {

    return mxBlocksLayers[layerIndex][blockIndex][startOrEndMxIndex][vertexIndex];
};

//assigner les données dans une lignes de vertices de la matrice   this.mtlTCSQBoundariesBlocksLayers
MTL375.prototype.mtlTCSQSetMatrixLayers                              = function (mxBlocksLayers,layerIndex,blockIndex,vertexIndex, mxValues) {
    const VERTEX_START_INDEX = 0;
    const VERTEX_END_INDEX   = 1;

    this.mtlTCSQSetMatrixLayersValue(mxBlocksLayers,layerIndex,blockIndex,VERTEX_START_INDEX,vertexIndex,0, mxValues[VERTEX_START_INDEX][0]);
    this.mtlTCSQSetMatrixLayersValue(mxBlocksLayers,layerIndex,blockIndex,VERTEX_START_INDEX,vertexIndex,1, mxValues[VERTEX_START_INDEX][1]);
    this.mtlTCSQSetMatrixLayersValue(mxBlocksLayers,layerIndex,blockIndex,VERTEX_START_INDEX,vertexIndex,2, mxValues[VERTEX_START_INDEX][2]);


    this.mtlTCSQSetMatrixLayersValue(mxBlocksLayers,layerIndex,blockIndex,VERTEX_END_INDEX,vertexIndex,0, mxValues[VERTEX_END_INDEX][0]);
    this.mtlTCSQSetMatrixLayersValue(mxBlocksLayers,layerIndex,blockIndex,VERTEX_END_INDEX,vertexIndex,1, mxValues[VERTEX_END_INDEX][1]);
    this.mtlTCSQSetMatrixLayersValue(mxBlocksLayers,layerIndex,blockIndex,VERTEX_END_INDEX,vertexIndex,2, mxValues[VERTEX_END_INDEX][2]);
};

//Construire le coin de début
MTL375.prototype.mtlTCSQSetBlockStartCorner                          = function (mxBlocksLayers,layerIndex,blockIndex) {

    const VERTEX_START_INDEX = 0;
    const VERTEX_END_INDEX   = 1;



    var rowAStart     = this.mtlTCSQGetMatrixLayersValue (mxBlocksLayers,layerIndex,blockIndex,VERTEX_START_INDEX,0).slice();;
    var rowAEnd       = this.mtlTCSQGetMatrixLayersValue (mxBlocksLayers,layerIndex,blockIndex,VERTEX_START_INDEX,1).slice();;

    var rowBStart     = this.mtlTCSQGetMatrixLayersValue (mxBlocksLayers,layerIndex,blockIndex, VERTEX_END_INDEX,0).slice();;
    var rowBEnd       = this.mtlTCSQGetMatrixLayersValue (mxBlocksLayers,layerIndex,blockIndex, VERTEX_END_INDEX,1).slice();;

    var newRowAStart  = this.twoVerticesR3_Scale([rowAStart, rowAEnd ],this.mtlTCSQScaleFact).slice();
    var newRowBStart  = this.twoVerticesR3_Scale([rowBStart, rowBEnd ],this.mtlTCSQScaleFact).slice();
    this.mtlTCSQSetMatrixLayers(mxBlocksLayers,layerIndex,blockIndex,0, [newRowAStart[0],newRowBStart[0]]);

   // if  (this.mtlTCSQTestGoThrough==true) {console.log(layerIndex,blockIndex);}


};

//Construire le coin de début
MTL375.prototype.mtlTCSQSetBlockEndCorner                            = function (mxBlocksLayers,layerIndex,blockIndex) {

    const VERTEX_START_INDEX = 0;
    const VERTEX_END_INDEX   = 1;
    var lastIndex            = mxBlocksLayers[layerIndex][blockIndex][0].length-1;

    var previousOfLastIndex  = lastIndex -1;

    var rowAStart     = this.mtlTCSQGetMatrixLayersValue (mxBlocksLayers,layerIndex,blockIndex,VERTEX_START_INDEX,lastIndex);
    var rowAEnd       = this.mtlTCSQGetMatrixLayersValue (mxBlocksLayers,layerIndex,blockIndex,VERTEX_START_INDEX,previousOfLastIndex);

    var rowBStart     = this.mtlTCSQGetMatrixLayersValue (mxBlocksLayers,layerIndex,blockIndex, VERTEX_END_INDEX,lastIndex);
    var rowBEnd       = this.mtlTCSQGetMatrixLayersValue (mxBlocksLayers,layerIndex,blockIndex, VERTEX_END_INDEX,previousOfLastIndex);

    var newRowAStart  = this.twoVerticesR3_Scale([rowAStart, rowAEnd ],this.mtlTCSQScaleFact).slice();
    var newRowBStart  = this.twoVerticesR3_Scale([rowBStart, rowBEnd ],this.mtlTCSQScaleFact).slice();
    this.mtlTCSQSetMatrixLayers(mxBlocksLayers,layerIndex,blockIndex,lastIndex, [newRowAStart[0],newRowBStart[0]]);

};

//Initialiser la mise en echelle d'un block pour un couple de vertice
MTL375.prototype.mtlTCSQIniEachLayerBlock                            = function (mxBlocksLayers,layerIndex,blockIndex,coupleVertexIndex,boundsParamsMx) {
    const VERTEX_START_INDEX = 0;
    const VERTEX_END_INDEX   = 1;

    if ((layerIndex-1)< mxBlocksLayers.length) {
        var verticesStar            = mxBlocksLayers[layerIndex-1][blockIndex][VERTEX_START_INDEX];
        var verticesEnd             = mxBlocksLayers[layerIndex-1][blockIndex][VERTEX_END_INDEX];
        if (coupleVertexIndex< verticesStar.length) {
            var vertexStart            = verticesStar[coupleVertexIndex];
            var vertexEnd              = verticesEnd[coupleVertexIndex];

            var mxOut = this.twoVerticesR3_Scale([vertexStart,vertexEnd ],this.mtlTCSQScaleFact).slice();

            var startBound = boundsParamsMx[0];
            var endBound   = boundsParamsMx[1];

            this.mtlTCSQSetMatrixLayers (mxBlocksLayers,layerIndex,blockIndex,coupleVertexIndex, mxOut);

            if (coupleVertexIndex == 1) {

                if (startBound) this.mtlTCSQSetBlockStartCorner(mxBlocksLayers,layerIndex,blockIndex);

            }
            if(coupleVertexIndex == verticesStar.length-1) {

                if (endBound) this.mtlTCSQSetBlockEndCorner(mxBlocksLayers,layerIndex,blockIndex);
            }

        }
    };
};


//regroupe tous les blocks limitrophes
MTL375.prototype.mtlTCSQBoundariesBlockGroup                         = function () {

    this.mtlTCSQWEST_SIDE_JsonVertices                      = [-3.74801,-2.647,-1.00546,-4.16133,-2.71993,-1.00546,-4.53818,-3.26698,-1.00546,-4.01545,-3.83833,-1.00546,-3.34684,-3.76539,-1.00546,-2.73902,-3.53442,-1.00546];

    this.mtlTCSQMIDDLE_SIDE_JsonVertices                    = [-2.30681,-1.55025,0.611929,-2.54057,-1.73726,0.61193,-2.68083,-1.91491,0.61193,-2.69953,-2.08322,0.61193,-3.31665,-2.35438,0.61193,-2.68083,-3.42032,0.611931,-1.99825,-3.25201,0.611931,-1.7832,-3.23331,0.611931,-1.44658,-3.0276,0.61193,-1.36243,-2.7845,0.61193];

    this.mtlWEST_N_MIDDLE_NORTH_SIDE_JsonVertices           = [-3.4019,-2.35067,0.61193,-3.4393,-2.21042,0.61193,-3.53281,-2.08887,0.61193,-3.71981,-2.08887,0.61193,-3.94422,-2.49093,0.61193,-3.75721,-2.54703,0.61193];

    this.mtlEAST_SIDE_JsonVertices                          = [4.04525,3.4569,0.611931,3.60858,3.46975,0.611931,3.27465,3.30278,0.611931,3.18475,3.02023,0.611931,3.04348,2.85327,0.611931,2.49122,2.53219,0.611931,1.97749,2.04415,0.611931,1.41239,1.53042,0.61193,1.14268,0.901099,0.61193,1.07846,0.695607,0.61193,0.975715,0.515802,0.61193,0.783067,0.130505,0.61193,0.680321,-0.177733,0.61193,0.397769,-0.216263,0.61193,-0.321452,-0.729992,0.61193,-0.578317,-1.07676,0.61193,-1.25901,-1.21803,0.61193,-1.25901,-2.70785,0.61193,-0.937928,-2.93903,0.61193,0.911498,-3.24727,0.61193,1.25827,-3.52982,0.61193,1.87474,-3.49129,0.61193,2.63249,-2.47667,0.61193,2.61965,-2.23265,0.61193,3.03063,-2.01432,0.61193,2.88936,-0.871268,0.61193,3.67279,0.554332,0.61193,3.54436,1.13228,0.61193,3.82691,1.78728,0.611931,3.92966,2.18542,0.611931,3.77554,2.91749,0.611931,3.91682,3.03308,0.611931,4.07094,3.25141,0.611931,4.14799,3.39269,0.611931];

    this.mtlTCSQMIDDLE_N_EAST_NORTH_SIDE_JsonVertices       = [-1.38359,-1.20061,0.61193,-1.39797,-1.08562,0.61193,-1.59201,-1.05688,0.61193,-1.88668,-1.00657,0.61193,-2.21727,-1.03532,0.61193,-2.3682,-1.25092,0.61193,-2.41132,-1.46653,0.61193,-2.35383,-1.47372,0.61193];



    this.mtlTCSQBoundariesBlocksLayers        = [];
    //mtlTCSQBoundariesScaleLayer_Count
    this.mtlTCSQ_EAST_INDEX                   = 0;
    this.mtlTCSQ_WEST_N_MIDDLE_NORTH_INDEX    = 1;
    this.mtlTCSQ_MIDDLE_INDEX                 = 2;
    this.mtlTCSQMIDDLE_N_EAST_NORTH_INDEX     = 3;
    this.mtlTCSQ_WEST_INDEX                   = 4;

    var blocksOfCurrentlayer                  = [];


    //var fact   = this.mtlTCSQSizeFact;
    //var origin =  this.mtlTCSQNewOrigin;


    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlEAST_SIDE_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQMIDDLE_N_EAST_NORTH_SIDE_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQMIDDLE_SIDE_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlWEST_N_MIDDLE_NORTH_SIDE_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQWEST_SIDE_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    this.mtlTCSQBoundariesBlocksLayers.push( blocksOfCurrentlayer.slice());

    this.mtlTCSQAllIniNextScaleLayers(this.mtlTCSQBoundariesBlocksLayers);

};

//Ibitialise les couches des blocks limites
MTL375.prototype.mtlTCSQIniBoundariesEachLayerBlock                  = function (mxBlocksLayers,layerIndex ,coupleVertexIndex) {
        this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQ_EAST_INDEX ,coupleVertexIndex,[true,true]);
        this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQ_WEST_N_MIDDLE_NORTH_INDEX ,coupleVertexIndex,[true,true]);
        this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQ_MIDDLE_INDEX ,coupleVertexIndex,[true,true]);
        this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQMIDDLE_N_EAST_NORTH_INDEX,coupleVertexIndex,[true,true]);
        this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQ_WEST_INDEX ,coupleVertexIndex,[true,true]);

};

// Initialiser la création des limites
MTL375.prototype.mtlTCSQIniBoundaries                                = function () {
    this.mtlTCSQBoundariesBlockGroup();
};

//regroupe tous les blocks limitrophes
MTL375.prototype.mtlTCSQGroupIslandBlocks                            = function () {

    this.mtlTCSQILE_BIZ_JsonVertices                = [-2.48356,-0.966612,0.61193,-2.83728,-0.94303,0.61193,-3.12027,-1.0295,0.61193,-3.26176,-1.21815,0.61193,-3.30892,-1.27317,0.61193,-3.45827,-1.40681,0.61193,-3.53688,-1.55616,0.61193,-3.68623,-1.61118,0.61193,-3.78056,-1.72123,0.61193,-3.83558,-2.03566,0.61193,-3.67837,-1.99635,0.61193,-3.52116,-2.02779,0.61193,-3.3325,-2.22431,0.61193,-3.12027,-2.22431,0.61193,-2.91589,-2.12998,0.61193,-2.49928,-1.57188,0.61193,-2.42853,-1.2889,0.61193,-2.3342,-1.16313,0.61193];
    this.mtlTCSQILE_DORVAL_JsonVertices             = [-0.344757,-3.14099,-1.00543,-0.434331,-3.11498,-1.00543,-0.526795,-3.1381,-1.00543,-0.541243,-3.21322,-1.00543,-0.457447,-3.22767,-1.00543,-0.347646,-3.19589,-1.00543];
    this.mtlTCSQILE_NEXTLASALLE_JsonVertices        = [2.47359,-3.2017,-1.00543,2.33778,-3.17583,-1.00543,2.2052,-3.27607,-1.00543,2.18903,-3.39248,-1.00543,2.33778,-3.36338,-1.00543,2.51563,-3.30517,-1.00543];
    this.mtlTCSQILE_VERDUN_JsonVertices             = [2.9919,-2.07786,-1.00543,2.7041,-2.27835,-1.00543,2.7041,-2.45943,-1.00543,2.60709,-2.69872,-1.00543,2.68793,-2.8022,-1.00543,2.84962,-2.65668,-1.00543,2.97249,-2.4368,-1.00543,3.11478,-2.22661,-1.00543];
    this.mtlTCSQILE_NEXTVM_FAREAST_JsonVertices     = [3.1712,-0.87159,-1.00543,3.14815,-0.937854,-1.00543,3.15679,-1.0214,-1.00543,3.16255,-1.20579,-1.00543,3.13951,-1.29798,-1.00543,3.14239,-1.47085,-1.00543,3.24898,-1.5688,-1.00543,3.3383,-1.56592,-1.00543,3.33542,-1.47085,-1.00543,3.30084,-1.33256,-1.00543,3.25763,-1.18274,-1.00543,3.23458,-1.01276,-1.00543,3.20577,-0.920568,-1.00543,3.21729,-0.87159,-1.00543];
    this.mtlTCSQILE_NEXTVM_NEAREASTJsonVertices     = [3.04938,-0.690751,-1.00543,3.03414,-0.749553,-1.00543,3.00365,-0.814889,-1.00543,2.9492,-0.854091,-1.00543,2.98187,-1.02179,-1.00543,2.98405,-1.16553,-1.00543,3.0472,-1.30709,-1.00543,3.07552,-1.30273,-1.00543,3.12779,-1.1677,-1.00543,3.12125,-1.00654,-1.00543,3.10601,-0.860625,-1.00543,3.06463,-0.817067,-1.00543,3.11472,-0.756087,-1.00543,3.10165,-0.684217,-1.00543];


    this.mtlTCSQIslandsBlocksLayers                 = [];
    this.mtlTCSQILE_BIZ_INDEX                       = 0;
    this.mtlTCSQILE_DORVAL_INDEX                    = 1;
    this.mtlTCSQILE_NEXTLASALLE_INDEX               = 2;
    this.mtlTCSQILE_VERDUN_INDEX                    = 3;
    this.mtlTCSQILE_NEXTVM_FAREAST_INDEX            = 4;
    this.mtlTCSQILE_NEXTVM_NEAREAST_INDEX           = 5;

    var blocksOfCurrentlayer                        = [];

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQILE_BIZ_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse( this.mtlTCSQILE_DORVAL_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQILE_NEXTLASALLE_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQILE_VERDUN_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(  this.mtlTCSQILE_NEXTVM_FAREAST_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;


    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse( this.mtlTCSQILE_NEXTVM_NEAREASTJsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;


    this.mtlTCSQIslandsBlocksLayers.push( blocksOfCurrentlayer.slice());
    this.mtlTCSQAllIniNextScaleLayers (this.mtlTCSQIslandsBlocksLayers);
};

//Initialise les couches des blocks limites
MTL375.prototype.mtlTCSQIniIslandsEachLayerBlock                     = function (mxBlocksLayers,layerIndex ,coupleVertexIndex) {
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_BIZ_INDEX ,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_DORVAL_INDEX ,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_NEXTLASALLE_INDEX,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_VERDUN_INDEX,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_NEXTVM_FAREAST_INDEX,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_NEXTVM_NEAREAST_INDEX,coupleVertexIndex,[true,true]);
};

// Initialiser la création des limites
MTL375.prototype.mtlTCSQIniIslands                                   = function () {
    this.mtlTCSQGroupIslandBlocks();
};


//regroupe tous les blocks limitrophes
MTL375.prototype.mtlTCSQGroupArrondsBlocks                            = function () {

    this.mtlTCSQARR_RIVPR_JsonVertices              = [3.98458,3.36664,-1.00543,3.64921,3.28437,-1.00543,3.5796,3.32234,-1.00543,3.29485,3.21477,-1.00543,3.18727,2.95533,-1.00543,3.06072,2.7908,-1.00543,2.95947,2.67057,-1.00543,2.82026,2.62628,-1.00543,2.75065,2.57565,-1.00543,2.61777,2.45543,-1.00543,2.4216,2.37316,-1.00543,1.6939,1.68343,-1.00543,1.63062,1.6771,-1.00543,1.89639,1.34805,-1.00543,2.01662,1.36071,-1.00543,2.75698,2.05044,-1.00543,2.87088,2.177,-1.00543,3.2379,1.93021,-1.00543,3.77576,1.78467,-1.00543,3.8517,1.88592,-1.00543,3.8517,2.18333,-1.00543,3.80108,2.2909,-1.00543,3.78209,2.6769,-1.00543,3.79475,2.8351,-1.00543,3.78842,2.95533,-1.00543,3.97193,3.29703,-1.00543];

    this.mtlTCSQArrondsBlocksLayers                 = [];
    this.mtlTCSQARR_RIVPR_INDEX                     = 0;

    var blocksOfCurrentlayer                        = [];

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQARR_RIVPR_JsonVertices,this.mtlTCSQNewOrigin,this.mtlTCSQSizeFact));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;



    this.mtlTCSQArrondsBlocksLayers.push( blocksOfCurrentlayer.slice());
    this.mtlTCSQAllIniNextScaleLayers (this.mtlTCSQArrondsBlocksLayers);
};

//Initialise les couches des blocks limites
MTL375.prototype.mtlTCSQIniArrondsEachLayerBlock                     = function (mxBlocksLayers,layerIndex ,coupleVertexIndex) {
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex, this.mtlTCSQARR_RIVPR_INDEX ,coupleVertexIndex,[true,true]);
 };

// Initialiser la création des limites
MTL375.prototype.mtlTCSQIniArronds                                   = function () {
    this.mtlTCSQGroupArrondsBlocks();
};


//regroupe tous les blocks limitrophes
MTL375.prototype.mtlTCSQGroupViveMTLBlocks                           = function () {

    this.mtlTCSQViveMTL_V1_JsonVertices              = [-3.5275,0.432377,-1.52635,-3.56611,0.398595,-1.52635,-3.58219,0.36964,-1.52635,-3.59023,0.348727,-1.52635,-3.58541,0.297251,-1.52635,-3.50659,0.088127,-1.52635,-3.33929,-0.322077,-1.52635,-3.27558,-0.378058,-1.52635,-3.21381,-0.397361,-1.52635,-3.16555,-0.401222,-1.52635,-3.12695,-0.38964,-1.52635,-3.0729,-0.351032,-1.52635,-3.02657,-0.266096,-1.52635,-2.90109,0.060137,-1.52635,-2.8123,0.278269,-1.52635,-2.80264,0.322667,-1.52635,-2.80843,0.370927,-1.52635,-2.82002,0.394091,-1.52635,-2.83932,0.417256,-1.52635,-2.89337,0.44235,-1.52635,-2.9204,0.44235,-1.52635,-2.959,0.436559,-1.52635,-3.00533,0.405673,-1.52635,-3.0285,0.363205,-1.52635,-3.08834,0.206845,-1.52635,-3.14239,0.073649,-1.52635,-3.16748,-0.001635,-1.52635,-3.18486,-0.036382,-1.52635,-3.19451,-0.063407,-1.52635,-3.20802,-0.047964,-1.52635,-3.2196,-0.011287,-1.52635,-3.24663,0.052415,-1.52635,-3.29103,0.177889,-1.52635,-3.35859,0.355484,-1.52635,-3.38369,0.399882,-1.52635,-3.40106,0.421116,-1.52635,-3.43774,0.436559,-1.52635,-3.48599,0.444281,-1.52635];
    this.mtlTCSQVIVEMTL_I_JsonVertices               = [-2.60831,0.443178,-1.4178,-2.6623,0.421179,-1.4178,-2.7003,0.369182,-1.4178,-2.7003,0.301186,-1.4178,-2.7023,-0.288782,-1.4178,-2.69563,-0.323781,-1.4178,-2.67064,-0.367112,-1.4178,-2.61397,-0.393777,-1.4178,-2.55564,-0.393777,-1.4178,-2.50398,-0.368778,-1.4178,-2.47065,-0.32878,-1.4178,-2.46231,-0.293782,-1.4178,-2.46471,0.294186,-1.4178,-2.46471,0.366182,-1.4178,-2.51031,0.418979,-1.4178,-2.56311,0.440578,-1.4178];
    this.mtlTCSQVIVEMTL_I_DOT_JsonVertices           = [-2.60502,0.799821,-1.52635,-2.66506,0.776471,-1.52635,-2.71177,0.726467,-1.52635,-2.7229,0.656417,-1.52635,-2.70175,0.599711,-1.52635,-2.67173,0.553011,-1.52635,-2.60837,0.530794,-1.52635,-2.55832,0.528529,-1.52635,-2.49936,0.553011,-1.52635,-2.46492,0.596375,-1.52635,-2.4449,0.653082,-1.52635,-2.45378,0.723131,-1.52635,-2.49494,0.776502,-1.52635,-2.56165,0.799852,-1.52635]
    this.mtlTCSQViveMTL_V2_JsonVertices              = [-2.29595,0.428233,-1.52635,-2.33134,0.39606,-1.52635,-2.34743,0.368713,-1.52635,-2.35386,0.346192,-1.52635,-2.35065,0.289889,-1.52635,-2.27182,0.085591,-1.52635,-2.10581,-0.327509,-1.52635,-2.04211,-0.381559,-1.52635,-1.98227,-0.402793,-1.52635,-1.93208,-0.402793,-1.52635,-1.89274,-0.391348,-1.52635,-1.83942,-0.356464,-1.52635,-1.79309,-0.265737,-1.52635,-1.66376,0.054705,-1.52635,-1.57689,0.268977,-1.52635,-1.5711,0.315306,-1.52635,-1.57496,0.361635,-1.52635,-1.58461,0.384799,-1.52635,-1.60198,0.409894,-1.52635,-1.65796,0.436919,-1.52635,-1.68885,0.434989,-1.52635,-1.72746,0.429198,-1.52635,-1.76993,0.398312,-1.52635,-1.79695,0.357774,-1.52635,-1.85293,0.199483,-1.52635,-1.90891,0.070148,-1.52635,-1.93208,-0.003206,-1.52635,-1.94945,-0.039883,-1.52635,-1.9634,-0.066908,-1.52635,-1.97379,-0.051465,-1.52635,-1.9842,-0.018649,-1.52635,-2.01122,0.046984,-1.52635,-2.06141,0.172458,-1.52635,-2.12512,0.346192,-1.52635,-2.15021,0.394451,-1.52635,-2.16951,0.417615,-1.52635,-2.20619,0.433058,-1.52635,-2.25059,0.436919,-1.52635];
    this.mtlTCSQViveMTL_E_BOT_JsonVertices           = [-1.53338,0.129445,-0.526352,-1.54411,0.000753,-0.526352,-1.5374,-0.051528,-0.526352,-1.51729,-0.149387,-0.526352,-1.47976,-0.221776,-0.526352,-1.41809,-0.294165,-0.526352,-1.33364,-0.35583,-0.526352,-1.21567,-0.396046,-0.526352,-1.14731,-0.40543,-0.526352,-1.01797,-0.401569,-0.526352,-0.91759,-0.370683,-0.526352,-0.851958,-0.334006,-0.526352,-0.803698,-0.297329,-0.526352,-0.774743,-0.235557,-0.526352,-0.782464,-0.191158,-0.526352,-0.795977,-0.158342,-0.526352,-0.815281,-0.133247,-0.526352,-0.844236,-0.121665,-0.526352,-0.900217,-0.106222,-0.526352,-0.952337,-0.127456,-0.526352,-1.00253,-0.158342,-0.526352,-1.06044,-0.181506,-0.526352,-1.1087,-0.185367,-0.526352,-1.17626,-0.177646,-0.526352,-1.21873,-0.162203,-0.526352,-1.24961,-0.137108,-0.526352,-1.27754,-0.102663,-0.526352,-1.28592,-0.086837,-0.526352,-1.29151,-0.073804,-0.526352,-1.29895,-0.060771,-0.526352,-1.30361,-0.050531,-0.526352,-1.30361,-0.038429,-0.526352];
    this.mtlTCSQVIVEMTL_E_TOP_JsonVertices           = [-1.29292,-0.031225,-1.4178,-0.839277,-0.033156,-1.4178,-0.806461,-0.023504,-1.4178,-0.779435,-0.008061,-1.4178,-0.75048,0.028616,-1.4178,-0.746619,0.071085,-1.4178,-0.748549,0.134787,-1.4178,-0.762062,0.20235,-1.4178,-0.787157,0.258331,-1.4178,-0.819973,0.3008,-1.4178,-0.864372,0.358711,-1.4178,-0.927109,0.402145,-1.4178,-1.02363,0.442361,-1.4178,-1.14267,0.458447,-1.4178,-1.23436,0.445578,-1.4178,-1.32927,0.413405,-1.4178,-1.41614,0.352277,-1.4178,-1.47244,0.27667,-1.4178,-1.51588,0.184977,-1.4178,-1.29066,0.130283,-1.4178,-1.28584,0.146369,-1.4178,-1.27136,0.167282,-1.4178,-1.25849,0.194629,-1.4178,-1.21988,0.221976,-1.4178,-1.19736,0.233236,-1.4178,-1.15554,0.244497,-1.4178,-1.1022,0.245681,-1.4178,-1.06384,0.226802,-1.4178,-1.03811,0.213933,-1.4178,-1.0188,0.19302,-1.4178,-1.00754,0.172108,-1.4178,-0.999498,0.156021,-1.4178,-1.00111,0.139935,-1.4178,-1.00103,0.128749,-1.4178,-1.00593,0.120631,-1.4178,-1.02363,0.120631,-1.4178,-1.04937,0.120631,-1.4178,-1.28262,0.119022,-1.4178];
    this.mtlTCSQVIVEMTL_CROSS_RIGHT_JsonVertices     = [0.957778,0.064005,-1.4178,0.561664,0.071931,-1.4178,0.505361,0.105444,-1.4178,0.471847,0.147001,-1.4178,0.479891,-0.096978,-1.4178,0.510723,-0.062123,-1.4178,0.564345,-0.032632,-1.4178,0.961145,-0.032632,-1.4178];
    this.mtlTCSQVIVEMTL_CROSS_TOP_JsonVertices       = [0.463837,0.165063,-1.4178,0.459011,0.219757,-1.4178,0.457402,0.745785,-1.4178,0.465446,0.771524,-1.4178,0.344797,0.771524,-1.4178,0.357666,0.747394,-1.4178,0.359275,0.222974,-1.4178,0.351231,0.165063,-1.4178],
    this.mtlTCSQVIVEMTL_CROSS_LEFT_JsonVertices      = [0.335744,0.137138,-1.4178,0.309825,0.10258,-1.4178,0.252228,0.068022,-1.4178,-0.303582,0.070902,-1.4178,-0.300702,-0.032773,-1.4178,0.252228,-0.035653,-1.4178,0.309825,-0.067331,-1.4178,0.344384,-0.110529,-1.4178],


    this.mtlTCSQViveMTLBlocksLayers                   = [];
    this.mtlTCSQViveMTL_V1_INDEX                      = 0;
    this.mtlTCSQVIVEMTL_I_INDEX                       = 1;
    this.mtlTCSQVIVEMTL_I_DOT_INDEX                   = 2;
    this.mtlTCSQViveMTL_V2_INDEX                      = 3;
    this.mtlTCSQViveMTL_E_BOT_INDEX                   = 4;
    this.mtlTCSQVIVEMTL_E_TOP_INDEX                   = 5;
    this.mtlTCSQVIVEMTL_CROSS_RIGHT_INDEX             = 6;
    this.mtlTCSQVIVEMTL_CROSS_TOP_INDEX               = 7;
    this.mtlTCSQVIVEMTL_CROSS_LEFT_INDEX              = 8;

    this.mtlTCSQViveMTL_ScaleFact                     = 105;

    this.mtlTCSQViveMTL_Origin                        = [300,50,70];

    var blocksOfCurrentlayer                         = [];

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQViveMTL_V1_JsonVertices,this.mtlTCSQViveMTL_Origin,this.mtlTCSQViveMTL_ScaleFact ));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQVIVEMTL_I_JsonVertices,this.mtlTCSQViveMTL_Origin,this.mtlTCSQViveMTL_ScaleFact ));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQVIVEMTL_I_DOT_JsonVertices ,this.mtlTCSQViveMTL_Origin,this.mtlTCSQViveMTL_ScaleFact ));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQViveMTL_V2_JsonVertices,this.mtlTCSQViveMTL_Origin,this.mtlTCSQViveMTL_ScaleFact ));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQViveMTL_E_BOT_JsonVertices,this.mtlTCSQViveMTL_Origin,this.mtlTCSQViveMTL_ScaleFact ));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQVIVEMTL_E_TOP_JsonVertices,this.mtlTCSQViveMTL_Origin,this.mtlTCSQViveMTL_ScaleFact ));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse( this.mtlTCSQVIVEMTL_CROSS_RIGHT_JsonVertices,this.mtlTCSQViveMTL_Origin,this.mtlTCSQViveMTL_ScaleFact ));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;


    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse( this.mtlTCSQVIVEMTL_CROSS_TOP_JsonVertices,this.mtlTCSQViveMTL_Origin,this.mtlTCSQViveMTL_ScaleFact ));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;


    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQVIVEMTL_CROSS_LEFT_JsonVertices,this.mtlTCSQViveMTL_Origin,this.mtlTCSQViveMTL_ScaleFact ));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;




    this.mtlTCSQViveMTLBlocksLayers.push( blocksOfCurrentlayer.slice());
    this.mtlTCSQAllIniNextScaleLayers (this.mtlTCSQViveMTLBlocksLayers);
};



//Initialise les couches des blocks limites
MTL375.prototype.mtlTCSQIniViveMTLEachLayerBlock                     = function (mxBlocksLayers,layerIndex ,coupleVertexIndex) {
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,   this.mtlTCSQViveMTL_V1_INDEX ,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,   this.mtlTCSQVIVEMTL_I_INDEX  ,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,   this.mtlTCSQVIVEMTL_I_DOT_INDEX  ,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,   this.mtlTCSQViveMTL_V2_INDEX ,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,   this.mtlTCSQViveMTL_E_BOT_INDEX ,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,   this.mtlTCSQVIVEMTL_E_TOP_INDEX,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,   this.mtlTCSQVIVEMTL_CROSS_RIGHT_INDEX,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,   this.mtlTCSQVIVEMTL_CROSS_TOP_INDEX,coupleVertexIndex,[true,true]);
    this.mtlTCSQIniEachLayerBlock(mxBlocksLayers,layerIndex,   this.mtlTCSQVIVEMTL_CROSS_LEFT_INDEX,coupleVertexIndex,[true,true]);


};


// Initialiser la création des limites
MTL375.prototype.mtlTCSQIniViveMTL                                   = function () {
    this.mtlTCSQGroupViveMTLBlocks();
};



//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQIniLayers                     = function () {

    for(var layerIndex = 1; layerIndex<this.mtlTCSQBoundariesScaleLayer_Count+1;layerIndex++ ) {
        for(var coupleVertexIndex = 0; coupleVertexIndex< this.mtlTCSQHigherLength;coupleVertexIndex++ ) {
            this.mtlTCSQIniBoundariesEachLayerBlock(this.mtlTCSQBoundariesBlocksLayers,layerIndex,coupleVertexIndex);
            this.mtlTCSQIniIslandsEachLayerBlock(this.mtlTCSQIslandsBlocksLayers,layerIndex ,coupleVertexIndex);
            this.mtlTCSQIniArrondsEachLayerBlock(this.mtlTCSQArrondsBlocksLayers,layerIndex ,coupleVertexIndex);
            this.mtlTCSQIniViveMTLEachLayerBlock(this.mtlTCSQViveMTLBlocksLayers,layerIndex ,coupleVertexIndex)
        };
    };
};

// initialiser les données intermediares
MTL375.prototype.mtlTCSQIniOperationalData                           = function () {
    this.mtlTCSQRegions  = [];
   // this.mtlTCSQGetMainOrigin();
    this.mtlTCSQIniBoundaries();
    this.mtlTCSQIniIslands();
    this.mtlTCSQIniArronds();
    this.mtlTCSQIniViveMTL();
    this.mtlTCSQIniLayers();
    this.mtlTCSQRegions.push(this.mtlTCSQBoundariesBlocksLayers.slice());
    this.mtlTCSQRegions.push(this.mtlTCSQIslandsBlocksLayers.slice());
    this.mtlTCSQRegions.push(this.mtlTCSQArrondsBlocksLayers.slice());
    this.mtlTCSQRegions.push(this.mtlTCSQViveMTLBlocksLayers.slice());
};

MTL375.prototype.mtlTCSQGenerateMx                                   = function(){

};

//construire
MTL375.prototype.mtlTCSQBuild                                        = function(params){
    this.mtlTCSQAssign(params);
    this.mtlTCSQIniOperationalData();
    this.mtlTCSQGenerateMx();
    this.mtlTCSQIsBuild = true;
};

//construire  les couples de vertex
MTL375.prototype.mtlTCSShowBlockbounderies                           = function(mxBoundaries) {
    var geo = new THREE.Geometry(), coords;

    var geometry1 = new THREE.Geometry();

    var material1= new THREE.LineBasicMaterial({
        color: "white" ,linewidth :1
    });
    //this.mtlTCSQFAR_WEST_SIDE_Bounderies.length
    for (var locIndex = 0; locIndex < mxBoundaries.length ; locIndex++) {
        coords  =   mxBoundaries [locIndex];
        geo.vertices[locIndex] =  new THREE.Vector3(coords[0],  coords [1],  coords [2]);
        geometry1.vertices[locIndex] = new THREE.Vector3(coords[0],  coords [1], coords [2]);
    }
    var  matoss= new THREE.PointsMaterial( { size: 0.1,color: "blue" , opacity: 0.8, transparent: true } );
    var particles = new THREE.Points( geo,  matoss );
    scene.add(particles);
    var line = new THREE.Line( geometry1, material1 );
    scene.add( line );
};

//construire  les couples de vertex
MTL375.prototype.mtlTCSShowbounderies                                = function() {

    this.mtlTCSShowBlockbounderies( this.mtlTCSQBoundariesBlocksLayers[0 ][this.mtlTCSQ_EAST_INDEX][0].concat( this.mtlTCSQBoundariesBlocksLayers[0 ][ this.mtlTCSQ_EAST_INDEX ][1].reverse()));
    this.mtlTCSShowBlockbounderies( this.mtlTCSQBoundariesBlocksLayers[0 ][this.mtlTCSQMIDDLE_N_EAST_NORTH_INDEX][0].concat( this.mtlTCSQBoundariesBlocksLayers[0 ][ this.mtlTCSQMIDDLE_N_EAST_NORTH_INDEX ][1].reverse()));
    this.mtlTCSShowBlockbounderies( this.mtlTCSQBoundariesBlocksLayers[0 ][this.mtlTCSQ_MIDDLE_INDEX ][0].concat( this.mtlTCSQBoundariesBlocksLayers[0 ][this.mtlTCSQ_MIDDLE_INDEX ][1].reverse()));
    this.mtlTCSShowBlockbounderies( this.mtlTCSQBoundariesBlocksLayers[0 ][this.mtlTCSQ_WEST_N_MIDDLE_NORTH_INDEX ][0].concat( this.mtlTCSQBoundariesBlocksLayers[0 ][this.mtlTCSQ_WEST_N_MIDDLE_NORTH_INDEX ][1].reverse()));
    this.mtlTCSShowBlockbounderies( this.mtlTCSQBoundariesBlocksLayers[0 ][this.mtlTCSQ_WEST_INDEX][0].concat( this.mtlTCSQBoundariesBlocksLayers[0][this.mtlTCSQ_WEST_INDEX][1].reverse()));

};

//construire  les couples de vertex
MTL375.prototype.mtlTCSShowIslands                                   = function() {

    this.mtlTCSShowBlockbounderies( this.mtlTCSQIslandsBlocksLayers[0 ][ this.mtlTCSQILE_BIZ_INDEX][0].concat(
                                   this.mtlTCSQIslandsBlocksLayers[0 ] [  this.mtlTCSQILE_BIZ_INDEX ][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQIslandsBlocksLayers[0 ][ this.mtlTCSQILE_DORVAL_INDEX][0].concat(
        this.mtlTCSQIslandsBlocksLayers[0 ] [this.mtlTCSQILE_DORVAL_INDEX][1].reverse()));


    this.mtlTCSShowBlockbounderies( this.mtlTCSQIslandsBlocksLayers[0 ][this.mtlTCSQILE_NEXTLASALLE_INDEX][0].concat(
        this.mtlTCSQIslandsBlocksLayers[0 ] [this.mtlTCSQILE_NEXTLASALLE_INDEX][1].reverse()));


    this.mtlTCSShowBlockbounderies( this.mtlTCSQIslandsBlocksLayers[0 ][this.mtlTCSQILE_VERDUN_INDEX][0].concat(
        this.mtlTCSQIslandsBlocksLayers[0 ] [ this.mtlTCSQILE_VERDUN_INDEX][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQIslandsBlocksLayers[0 ][this.mtlTCSQILE_NEXTVM_FAREAST_INDEX][0].concat(
        this.mtlTCSQIslandsBlocksLayers[0 ] [this.mtlTCSQILE_NEXTVM_FAREAST_INDEX][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQIslandsBlocksLayers[0 ][ this.mtlTCSQILE_NEXTVM_NEAREAST_INDEX][0].concat(
        this.mtlTCSQIslandsBlocksLayers[0 ] [ this.mtlTCSQILE_NEXTVM_NEAREAST_INDEX][1].reverse()));


};

//construire  les couples de vertex
MTL375.prototype.mtlTCSShowArronds                                   = function() {

    this.mtlTCSShowBlockbounderies( this.mtlTCSQArrondsBlocksLayers[0][this.mtlTCSQARR_RIVPR_INDEX][0].concat(
        this.mtlTCSQArrondsBlocksLayers[0 ] [this.mtlTCSQARR_RIVPR_INDEX ][1].reverse()));
};


//construire  les couples de vertex
MTL375.prototype.mtlTCSShowViveMTL                                  = function() {

    this.mtlTCSShowBlockbounderies( this.mtlTCSQViveMTLBlocksLayers[0][ this.mtlTCSQViveMTL_V1_INDEX][0].concat(
        this.mtlTCSQViveMTLBlocksLayers[0 ] [ this.mtlTCSQViveMTL_V1_INDEX][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQViveMTLBlocksLayers[0][ this.mtlTCSQVIVEMTL_I_INDEX][0].concat(
        this.mtlTCSQViveMTLBlocksLayers[0 ] [ this.mtlTCSQVIVEMTL_I_INDEX][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQViveMTLBlocksLayers[0][ this.mtlTCSQVIVEMTL_I_DOT_INDEX][0].concat(
        this.mtlTCSQViveMTLBlocksLayers[0 ] [ this.mtlTCSQVIVEMTL_I_DOT_INDEX][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQViveMTLBlocksLayers[0][ this.mtlTCSQViveMTL_V2_INDEX][0].concat(
        this.mtlTCSQViveMTLBlocksLayers[0 ] [ this.mtlTCSQViveMTL_V2_INDEX][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQViveMTLBlocksLayers[0][ this.mtlTCSQViveMTL_E_BOT_INDEX][0].concat(
        this.mtlTCSQViveMTLBlocksLayers[0 ] [ this.mtlTCSQViveMTL_E_BOT_INDEX][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQViveMTLBlocksLayers[0][ this.mtlTCSQVIVEMTL_E_TOP_INDEX][0].concat(
        this.mtlTCSQViveMTLBlocksLayers[0 ] [ this.mtlTCSQVIVEMTL_E_TOP_INDEX][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQViveMTLBlocksLayers[0][ this.mtlTCSQVIVEMTL_CROSS_RIGHT_INDEX][0].concat(
        this.mtlTCSQViveMTLBlocksLayers[0 ] [this.mtlTCSQVIVEMTL_CROSS_RIGHT_INDEX][1].reverse()));

    this.mtlTCSShowBlockbounderies( this.mtlTCSQViveMTLBlocksLayers[0][ this.mtlTCSQVIVEMTL_CROSS_TOP_INDEX][0].concat(
        this.mtlTCSQViveMTLBlocksLayers[0 ] [ this.mtlTCSQVIVEMTL_CROSS_TOP_INDEX][1].reverse()));


    this.mtlTCSShowBlockbounderies( this.mtlTCSQViveMTLBlocksLayers[0][  this.mtlTCSQVIVEMTL_CROSS_LEFT_INDEX][0].concat(
        this.mtlTCSQViveMTLBlocksLayers[0 ] [  this.mtlTCSQVIVEMTL_CROSS_LEFT_INDEX][1].reverse()));


};


//Affiche une couche
MTL375.prototype.mtlTCSQShowBlock                                    = function (mxBlocksLayers,layerIndex,blockIndex,coupleVertexIndex) {
    var block_1  = mxBlocksLayers[layerIndex][blockIndex][1];
    var block_0  = mxBlocksLayers[layerIndex][blockIndex][0];
    if (coupleVertexIndex < block_0.length) {
        var coords1 = block_0[coupleVertexIndex].slice();
        var coords2 = block_1[coupleVertexIndex].slice();

        this.mtlTCSQvertices.push(new THREE.Vector3(coords1[0],coords1[1],coords1[2]));
        this.mtlTCSQvertices.push(new THREE.Vector3(coords2[0],coords2[1],coords2[2]));
    }

}

//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQShowBoundariesLayersBlock                    = function (mxBlocksLayers,layerIndex,coupleVertexIndex) {
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQ_EAST_INDEX ,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQMIDDLE_N_EAST_NORTH_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQ_MIDDLE_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQ_WEST_N_MIDDLE_NORTH_INDEX ,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQ_WEST_INDEX ,coupleVertexIndex);
 };

//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQShowIslandLayersBlock                        = function (mxBlocksLayers,layerIndex,coupleVertexIndex) {

    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_BIZ_INDEX ,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_DORVAL_INDEX ,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_NEXTLASALLE_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_VERDUN_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_NEXTVM_FAREAST_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQILE_NEXTVM_NEAREAST_INDEX,coupleVertexIndex);
 };


//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQShowArrondsLayersBlock                       = function (mxBlocksLayers,layerIndex,coupleVertexIndex) {

    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQARR_RIVPR_INDEX ,coupleVertexIndex);
};

//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQShoViveMTLLayersBlock                       = function (mxBlocksLayers,layerIndex,coupleVertexIndex) {

    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQViveMTL_V1_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQVIVEMTL_I_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQVIVEMTL_I_DOT_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQViveMTL_V2_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQViveMTL_E_BOT_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQVIVEMTL_E_TOP_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQVIVEMTL_CROSS_RIGHT_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQVIVEMTL_CROSS_TOP_INDEX,coupleVertexIndex);
    this.mtlTCSQShowBlock(mxBlocksLayers,layerIndex,  this.mtlTCSQVIVEMTL_CROSS_LEFT_INDEX,coupleVertexIndex);

};


//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQShowLayers                     = function () {
    this.mtlTCSQvertices = [];
    var geo = new THREE.Geometry();
    for(var layerIndex = 0; layerIndex<this.mtlTCSQBoundariesBlocksLayers.length;layerIndex++ ) {
        for(var coupleVertexIndex = 0; coupleVertexIndex< this.mtlTCSQHigherLength;coupleVertexIndex++ ) {
            this.mtlTCSQShowBoundariesLayersBlock(this.mtlTCSQBoundariesBlocksLayers,layerIndex,coupleVertexIndex);
            this.mtlTCSQShowIslandLayersBlock(this.mtlTCSQIslandsBlocksLayers,layerIndex,coupleVertexIndex);
            this.mtlTCSQShowArrondsLayersBlock(this.mtlTCSQArrondsBlocksLayers,layerIndex,coupleVertexIndex);
            this.mtlTCSQShoViveMTLLayersBlock( this.mtlTCSQViveMTLBlocksLayers,layerIndex,coupleVertexIndex);
        };
    };

    geo.vertices =  this.mtlTCSQvertices;
    var  matoss   = new THREE.PointsMaterial( { size: 1,color: "red" , opacity: 1, transparent: true } );

    var particles = new THREE.Points( geo,  matoss );
    this.mtlTCSQParticules = particles;
    scene.add(particles);
};

//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQShowBounces                     = function (vertexIndex,value) {
  if  (this.mtlTCSQIsBuild) {

      if( vertexIndex< this.mtlTCSQvertices.length){
          this.mtlTCSQvertices[vertexIndex].y = this.mtlTCSQNewOrigin[1] +value;
          this.mtlTCSQParticules.geometry.verticesNeedUpdate = true;
      }
  }

};

//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQShow                     = function () {
     this.mtlTCSQShowLayers();
     this.mtlTCSShowbounderies();
     this.mtlTCSShowIslands();
     this.mtlTCSShowArronds();
     this.mtlTCSShowViveMTL();
}

var mtl = new MTL375();

mtl.mtlTCSQBuild();



