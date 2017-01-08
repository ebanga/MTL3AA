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
        this.mtlTCSQSizeFact                    =  ('mtlTCSQSizeFact' in params)  ? params.mtlTCSQSizeFact      :10;
        this.mtlTCSQScaleFact                   =  ('mtlTCSQScaleFact' in params) ? params.mtlTCSQScaleFact     :[0.15,0.15];
        this.mtlTCSQBoundariesScaleLayer_Count  =  ('mtlTCSQBoundariesScaleLayer_Count' in params)  ? params.mtlTCSQBoundariesScaleLayer_Count :6;
    }
    else {
        //définir les valeurs par défaut pour tests
        this.mtlTCSQSizeFact                    =  10;
        this.mtlTCSQScaleFact                   =  [0.15,0.15];
        this.mtlTCSQBoundariesScaleLayer_Count  =  6;
    };


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
MTL375.prototype.mtlTCSQBoundaryBlockMxSplit                         = function (blockMx) {
    var mxOut = [[],[]];
    for(var vertexIndex=0;vertexIndex<(blockMx.length/2);vertexIndex++) {
        mxOut[0].push(blockMx[vertexIndex].slice());
        mxOut[1].push(blockMx[(blockMx.length-1)- vertexIndex].slice());
    };
    return  mxOut;
};

// Convertir les données JSon en format des fonctions EBK
MTL375.prototype.mtlTCSQDataToEBKFormat                             = function (vertices_in) {
    var coords_0,coords_1;
    var bounderies =[[],[]];
    for (var verticesIndex = 0;verticesIndex<   vertices_in[0].length;verticesIndex++ ) {
        coords_0 =  vertices_in[0][verticesIndex];
        coords_1 =  vertices_in[1][verticesIndex];
        bounderies[0].push([this.mtlTCSQSizeFact*(coords_0[0])  ,0,
            this.mtlTCSQSizeFact*(-coords_0[1])]);
        bounderies[1].push([this.mtlTCSQSizeFact*(coords_1[0])  ,0,
            this.mtlTCSQSizeFact*(-coords_1[1])]);
    } ;
    return bounderies;
};

// Subdivise une matrice de block de limitation en 2, la première moitier allant de l'indice 0 à la moitier  -1
// et l'autre moitier de du dernier à la moitier
MTL375.prototype.mtlTCSQBoundaryBlockMxParse                         = function (jsonMx) {
    var json        = this.mtlTCSQParseToVertices(jsonMx).slice();
    var ebkMx       = this.mtlTCSQBoundaryBlockMxSplit (json).slice();
    var mxOut       = this.mtlTCSQDataToEBKFormat(ebkMx).slice();
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


    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlEAST_SIDE_JsonVertices));
    this.mtlTCSQHigherLength            = blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQMIDDLE_N_EAST_NORTH_SIDE_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQMIDDLE_SIDE_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlWEST_N_MIDDLE_NORTH_SIDE_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQWEST_SIDE_JsonVertices));
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

        }
    } ;
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

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQILE_BIZ_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse( this.mtlTCSQILE_DORVAL_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQILE_NEXTLASALLE_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQILE_VERDUN_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(  this.mtlTCSQILE_NEXTVM_FAREAST_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;


    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse( this.mtlTCSQILE_NEXTVM_NEAREASTJsonVertices));
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

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQARR_RIVPR_JsonVertices));
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

//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQIniLayers                     = function () {

    for(var layerIndex = 1; layerIndex<this.mtlTCSQBoundariesScaleLayer_Count+1;layerIndex++ ) {
        for(var coupleVertexIndex = 0; coupleVertexIndex< this.mtlTCSQHigherLength;coupleVertexIndex++ ) {
            this.mtlTCSQIniBoundariesEachLayerBlock(this.mtlTCSQBoundariesBlocksLayers,layerIndex,coupleVertexIndex);
            this.mtlTCSQIniIslandsEachLayerBlock(this.mtlTCSQIslandsBlocksLayers,layerIndex ,coupleVertexIndex);
            this.mtlTCSQIniArrondsEachLayerBlock(this.mtlTCSQArrondsBlocksLayers,layerIndex ,coupleVertexIndex);
        };
    };
};

// initialiser les données intermediares
MTL375.prototype.mtlTCSQIniOperationalData                           = function () {
    this.mtlTCSQRegions  = [];
    this.mtlTCSQIniBoundaries();
    this.mtlTCSQIniIslands();
    this.mtlTCSQIniArronds();
    this.mtlTCSQIniLayers();
    this.mtlTCSQRegions.push(this.mtlTCSQBoundariesBlocksLayers.slice());
    this.mtlTCSQRegions.push(this.mtlTCSQIslandsBlocksLayers.slice());
    this.mtlTCSQRegions.push(this.mtlTCSQArrondsBlocksLayers.slice());
};

MTL375.prototype.mtlTCSQGenerateMx                                   = function(){

};

//construire
MTL375.prototype.mtlTCSQBuild                                        = function(params){
    this.mtlTCSQAssign(params);
    this.mtlTCSQIniOperationalData();
    this.mtlTCSQGenerateMx();
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

//Affiche une couche
MTL375.prototype.mtlTCSQBlockShow                                    = function (layerIndex,blockIndex,coupleVertexIndex) {
    var block_1  = this.mtlTCSQBoundariesBlocksLayers[layerIndex][blockIndex][1];
    var block_0  = this.mtlTCSQBoundariesBlocksLayers[layerIndex][blockIndex][0];
    if (coupleVertexIndex < block_0.length) {
        var coords1 = block_0[coupleVertexIndex].slice();
        var coords2 = block_1[coupleVertexIndex].slice();

        this.mtlTCSQvertices.push(new THREE.Vector3(coords1[0],coords1[1],coords1[2]));
        this.mtlTCSQvertices.push(new THREE.Vector3(coords2[0],coords2[1],coords2[2]));
    }
}

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
MTL375.prototype.mtlTCSQShowLayers                     = function () {
    this.mtlTCSQvertices = [];
    var geo = new THREE.Geometry();
    for(var layerIndex = 0; layerIndex<this.mtlTCSQBoundariesBlocksLayers.length;layerIndex++ ) {
        for(var coupleVertexIndex = 0; coupleVertexIndex< this.mtlTCSQHigherLength;coupleVertexIndex++ ) {
            //this.mtlTCSQShowBoundariesLayersBlock(this.mtlTCSQBoundariesBlocksLayers,layerIndex,coupleVertexIndex);
            this.mtlTCSQShowIslandLayersBlock(this.mtlTCSQIslandsBlocksLayers,layerIndex,coupleVertexIndex);
            this.mtlTCSQShowArrondsLayersBlock(this.mtlTCSQArrondsBlocksLayers,layerIndex,coupleVertexIndex);
        };
    };

    geo.vertices =  this.mtlTCSQvertices;
    var  matoss   = new THREE.PointsMaterial( { size: 0.2,color: "red" , opacity: 1, transparent: true } );

    var particles = new THREE.Points( geo,  matoss );
    scene.add(particles);
};

//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQShow                     = function () {
     this.mtlTCSQShowLayers();
     this.mtlTCSShowbounderies();
     this.mtlTCSShowIslands();
     this.mtlTCSShowArronds();
}

var mtl = new MTL375();

mtl.mtlTCSQBuild();



