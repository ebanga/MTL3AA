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
        this.mtlTCSQSizeFact                    =  ('mtlTCSQSizeFact' in params)  ? params.mtlTCSQSizeFact      :10;
        this.mtlTCSQScaleFact                   =  ('mtlTCSQScaleFact' in params) ? params.mtlTCSQScaleFact     :[0.15,0.15];
        this.mtlTCSQBoundariesScaleLayer_Count  =  ('mtlTCSQBoundariesScaleLayer_Count' in params)  ? params.mtlTCSQBoundariesScaleLayer_Count :3;
    }
    else {
        //définir les valeurs par défaut pour tests
        this.mtlTCSQSizeFact                    =  10;
        this.mtlTCSQScaleFact                   =  [0.15,0.15];
        this.mtlTCSQBoundariesScaleLayer_Count  =  3;
    };


    this.mtlTCSQFAR_WEST_SIDE_JsonVertices                 = [-3.70613,-2.64797,-1.00546,-3.98322,-2.64797,-1.00546,-4.19325,-2.90366,-1.00546,-4.31197,-2.98585,-1.00546,-4.37589,-3.35113,-1.00546,-4.25718,-3.49724,-1.00546,-3.98322,-3.77121,-1.00546,-3.81884,-3.7986,-1.00546,-3.55401,-3.78034,-1.00546,-3.28005,-3.5977,-1.00546];

    this.mtlTCSQWEST_SIDE_JsonVertices                     = [-2.37716,-1.6708,-1.00546,-2.55825,-1.82331,-1.00546,-2.70123,-2.05206,-1.00546,-3.03483,-2.28082,-1.00546,-3.29218,-2.35707,-1.00546,-2.6631,-3.44365,-1.00546,-2.45341,-3.29115,-1.00546,-2.18653,-3.12912,-1.00546,-1.98637,-3.24349,-1.00546,-1.80527,-3.23396,-1.00546];

    this.mtlTCSQFAR_N_WEST_EXT_0_5_SIDE_JsonVertices       = [-3.4356,-2.29874,-1.00546,-3.47516,-2.16424,-1.00546,-3.4989,-2.07721,-1.00546,-3.61757,-2.05348,-1.00546,-3.76789,-2.16424,-1.00546,-3.83118,-2.30665,-1.00546,-3.87865,-2.46488,-1.00546,-3.76789,-2.55191,-1.00546];

    this.mtlTCSQCENTER_SIDE_JsonVertices                   = [0.290246,-0.315335,-1.00546,-0.334766,-0.742558,-1.00546,-0.548378,-1.05902,-1.00546,-0.777813,-1.20143,-1.00546,-1.03098,-1.22516,-1.00546,-1.23668,-1.22516,-1.00546,-1.37118,-1.22516,-1.00546,-1.70218,-3.09052,-1.00546,-1.6247,-2.9998,-1.00546,-1.51766,-3.03923,-1.00546,-1.35428,-2.72374,-1.00546,-1.06857,-2.74064,-1.00546,-0.897552,-2.94647,-1.00546,0.122101,-2.95472,-1.00546]

    this.mtlTCSQCENTER_N_WEST_EXT_6_0_SIDE_JsonVertices    = [-1.39898,-1.09395,-1.03598,-1.68346,-1.07898,-1.03598,-1.83318,-1.07898,-1.03598,-2.01285,-1.03056,-1.03598,-2.1476,-1.03406,-1.03598,-2.37219,-1.24367,-1.03598,-2.41225,-1.42334,-1.03598,-2.32727,-1.4982,-1.03598];

    this.mtlTCSQEAST_SIDE_JsonVertices                     = [3.99003,3.40896,-1.03598,3.71433,3.30739,-1.03598,3.55471,3.33641,-1.03598,3.24999,3.20582,-1.03598,3.16293,2.98816,-1.03598,2.9888,2.68344,-1.03598,2.82919,2.63991,-1.03598,2.65506,2.4948,-1.03598,2.30681,2.36421,-1.03598,2.08915,2.074,-1.03598,1.63933,1.71123,-1.03598,1.4652,1.49358,-1.03598,1.1895,1.01473,-1.03598,1.00086,0.550393,-1.03598,0.89929,0.347245,-1.03598,0.62359,-0.204154,-1.03598,3.04685,-1.94541,-1.03598,2.88723,-1.26342,-1.03598,2.91625,-1.00223,-1.03598,3.06136,-0.421812,-1.03598,3.30803,-0.08807,-1.03598,3.33706,0.115077,-1.03598,3.61276,0.535882,-1.03598,3.45314,1.07277,-1.03598,3.56922,1.2469,-1.03598,3.74335,1.63868,-1.03598,3.90297,1.92889,-1.03598,3.8159,2.63991,-1.03598,3.8159,2.84305,-1.03598,3.87394,3.01718,-1.03598,3.97552,3.16228,-1.03598,4.07128,3.31124,-1.03598];

    this.mtlTCSQCENTER_N_EAST_EXT_13_16_SIDE_JsonVertices  = [0.571806,-3.20963,-1.03598,1.03102,-3.31167,-1.03598,1.18408,-3.4775,-1.03598,1.51574,-3.54128,-1.03598,1.73258,-3.49025,-1.03598,2.1025,-3.18411,-1.03598,2.54895,-2.66113,-1.03598,2.66376,-2.21467,-1.03598];

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
MTL375.prototype.mtlTCSQDataToEBKFormat                              = function (vertices_in) {
    var coords;
    var bounderies =[];
    for (var locIndex = 0;locIndex<   vertices_in.length;locIndex++ ) {
        coords =  vertices_in[locIndex];
        bounderies.push([this.mtlTCSQSizeFact*(coords[0])  ,0,
            this.mtlTCSQSizeFact*(coords[1])]);
    } ;
    return bounderies;
};


// Convertir les données JSon en format des fonctions EBK
MTL375.prototype.mtlTCSQDataToEBKFormat1                             = function (vertices_in) {
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

// Divise les données recu en deux groupes
MTL375.prototype.mtlTCSQExtensionJsonVerticesSplit                               = function (vertices_in) {
    var rightLeftBounderies =[];
    var leftrightBounderies =[];
    //var leftrightIndex      = vertices_in.length-1;
    for (var rightLeftIndex= 0;rightLeftIndex<   vertices_in.length/2;rightLeftIndex++ ) {
        rightLeftBounderies.push(vertices_in[rightLeftIndex]);
        leftrightBounderies.push(vertices_in[ (vertices_in.length-1)-rightLeftIndex]);
    } ;
    return [rightLeftBounderies,leftrightBounderies];
};

// Convertir les données JSon en format des fonctions EBK
MTL375.prototype.mtlTCSQParseToVertices                              = function (mxFromJSON) {
    var coords;
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

// Subdivise une matrice de block de limitation en 2, la première moitier allant de l'indice 0 à la moitier  -1
// et l'autre moitier de du dernier à la moitier
MTL375.prototype.mtlTCSQBoundaryBlockMxParse                         = function (jsonMx) {
    var json        = this.mtlTCSQParseToVertices(jsonMx).slice();
    var ebkMx       = this.mtlTCSQBoundaryBlockMxSplit (json).slice();
    var mxOut       = this.mtlTCSQDataToEBKFormat1(ebkMx).slice();
    return   mxOut;
};

//regroupe tous les blocks limitrophes
MTL375.prototype.mtlTCSQBoundariesBlockGroup                         = function () {
    this.mtlTCSQBoundariesBlocksLayers  = [];
    //mtlTCSQBoundariesScaleLayer_Count
    this.mtlTCSQ_BLOCK_FARWEST          = 0;
    this.mtlTCSQ_BLOCK_WEST             = 1;
    this.mtlTCSQ_BLOCK_FAR_N_WEST       = 2;
    this.mtlTCSQ_BLOCK_CENTER           = 3;

    var blocksOfCurrentlayer            = [];

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQFAR_WEST_SIDE_JsonVertices));
    this.mtlTCSQHigherLength            = blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQWEST_SIDE_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQFAR_N_WEST_EXT_0_5_SIDE_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    blocksOfCurrentlayer.push(this.mtlTCSQBoundaryBlockMxParse(this.mtlTCSQCENTER_SIDE_JsonVertices));
    this.mtlTCSQHigherLength            = (blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length > this.mtlTCSQHigherLength)?
        blocksOfCurrentlayer[blocksOfCurrentlayer.length-1][0].length:this.mtlTCSQHigherLength;

    this.mtlTCSQBoundariesBlocksLayers.push( blocksOfCurrentlayer.slice());

    this.mtlTCSQAllNextScaleLayersIni();

};

//Initialise toutes les autres couches mises en échelles ne fonction de la structure de la couche initiale coucche initiale
MTL375.prototype.mtlTCSQAllNextScaleLayersIni                                  = function () {
    var refBlocks  = this.mtlTCSQBoundariesBlocksLayers[0],currentBlock,blocks;

    for(var nextLayersIndex = 1;nextLayersIndex<=this.mtlTCSQBoundariesScaleLayer_Count ;nextLayersIndex++) {
        blocks = [];
        for (var blockIndex = 0; blockIndex < refBlocks.length; blockIndex++) {
            currentBlock = [[], []];
            for (var coupleVerticeIndex = 0; coupleVerticeIndex < refBlocks[blockIndex][0].length; coupleVerticeIndex++) {
                currentBlock[0].push([this.floatRandom(-3.,50), 0, 0]);
                currentBlock[1].push([0, 0,this.floatRandom(100,200)]);
            };
            blocks.push(currentBlock.slice());
    };

       // console.log(refBlocks, blocks);
       this.mtlTCSQBoundariesBlocksLayers.push(blocks.slice());
    };

};

//assigner les données dans une lignes de composante de vertices de la matrice   this.mtlTCSQBoundariesBlocksLayers
MTL375.prototype.mtlTCSQBoundariesBlocksLayersValueSet               = function (layerIndex,blockIndex,startOrEndMxIndex,vertexIndex,xyzIndex, value) {

    this.mtlTCSQBoundariesBlocksLayers[layerIndex][blockIndex][startOrEndMxIndex][vertexIndex][xyzIndex] =  value;
};

//renvoyer les données dans une lignes de composante de vertices de la matrice   this.mtlTCSQBoundariesBlocksLayers
MTL375.prototype.mtlTCSQBoundariesBlocksLayersValueGet               = function (layerIndex,blockIndex,startOrEndMxIndex,vertexIndex) {

   return this.mtlTCSQBoundariesBlocksLayers[layerIndex][blockIndex][startOrEndMxIndex][vertexIndex];
};

//assigner les données dans une lignes de vertices de la matrice   this.mtlTCSQBoundariesBlocksLayers
MTL375.prototype.mtlTCSQBoundariesBlocksLayersSet                    = function (layerIndex,blockIndex,vertexIndex, mxValues) {
    const VERTEX_START_INDEX = 0;
    const VERTEX_END_INDEX   = 1;

    this.mtlTCSQBoundariesBlocksLayersValueSet(layerIndex,blockIndex,VERTEX_START_INDEX,vertexIndex,0, mxValues[VERTEX_START_INDEX][0]);
    this.mtlTCSQBoundariesBlocksLayersValueSet(layerIndex,blockIndex,VERTEX_START_INDEX,vertexIndex,1, mxValues[VERTEX_START_INDEX][1]);
    this.mtlTCSQBoundariesBlocksLayersValueSet(layerIndex,blockIndex,VERTEX_START_INDEX,vertexIndex,2, mxValues[VERTEX_START_INDEX][2]);


    this.mtlTCSQBoundariesBlocksLayersValueSet(layerIndex,blockIndex,VERTEX_END_INDEX,vertexIndex,0, mxValues[VERTEX_END_INDEX][0]);
    this.mtlTCSQBoundariesBlocksLayersValueSet(layerIndex,blockIndex,VERTEX_END_INDEX,vertexIndex,1, mxValues[VERTEX_END_INDEX][1]);
    this.mtlTCSQBoundariesBlocksLayersValueSet(layerIndex,blockIndex,VERTEX_END_INDEX,vertexIndex,2, mxValues[VERTEX_END_INDEX][2]);
};

//Construire le coin de début
MTL375.prototype.mtlTCSQBlockStartCornerSet                          = function (layerIndex,blockIndex) {

    const VERTEX_START_INDEX = 0;
    const VERTEX_END_INDEX   = 1;
    var rowAStart     = this.mtlTCSQBoundariesBlocksLayersValueGet(layerIndex,blockIndex,VERTEX_START_INDEX,0);
    var rowAEnd       = this.mtlTCSQBoundariesBlocksLayersValueGet(layerIndex,blockIndex,VERTEX_START_INDEX,1);

    var rowBStart     = this.mtlTCSQBoundariesBlocksLayersValueGet(layerIndex,blockIndex, VERTEX_END_INDEX,0);
    var rowBEnd       = this.mtlTCSQBoundariesBlocksLayersValueGet(layerIndex,blockIndex, VERTEX_END_INDEX,1);

    var newRowAStart  = this.twoVerticesR3_Scale([rowAStart, rowAEnd ],this.mtlTCSQScaleFact).slice();
    var newRowBStart  = this.twoVerticesR3_Scale([rowBStart, rowBEnd ],this.mtlTCSQScaleFact).slice();
    this.mtlTCSQBoundariesBlocksLayersSet(layerIndex,blockIndex,0, [newRowAStart[0],newRowBStart[0]]);
    //console.log(rowAStart,rowAEnd,rowBStart,rowBStart,newRowAStart[0],newRowBStart[0]);
};

//Construire le coin de début
MTL375.prototype.mtlTCSQBlockEndCornerSet                            = function (layerIndex,blockIndex) {

    const VERTEX_START_INDEX = 0;
    const VERTEX_END_INDEX   = 1;
    var lastIndex            = this.mtlTCSQBoundariesBlocksLayers[layerIndex][blockIndex][0].length-1;

    var previousOfLastIndex  = lastIndex -1;

    var rowAStart     = this.mtlTCSQBoundariesBlocksLayersValueGet(layerIndex,blockIndex,VERTEX_START_INDEX,lastIndex);
    var rowAEnd       = this.mtlTCSQBoundariesBlocksLayersValueGet(layerIndex,blockIndex,VERTEX_START_INDEX,previousOfLastIndex);

    var rowBStart     = this.mtlTCSQBoundariesBlocksLayersValueGet(layerIndex,blockIndex, VERTEX_END_INDEX,lastIndex);
    var rowBEnd       = this.mtlTCSQBoundariesBlocksLayersValueGet(layerIndex,blockIndex, VERTEX_END_INDEX,previousOfLastIndex);

    var newRowAStart  = this.twoVerticesR3_Scale([rowAStart, rowAEnd ],this.mtlTCSQScaleFact).slice();
    var newRowBStart  = this.twoVerticesR3_Scale([rowBStart, rowBEnd ],this.mtlTCSQScaleFact).slice();
    this.mtlTCSQBoundariesBlocksLayersSet(layerIndex,blockIndex,lastIndex, [newRowAStart[0],newRowBStart[0]]);
   // console.log(lastIndex);
};


//Initialiser la mise en echelle d'un block pour un couple de vertice
MTL375.prototype.mtlTCSQBoundariesEachLayerBlockIni                  = function (layerIndex,blockIndex,coupleVertexIndex,boundsParamsMx) {
    const VERTEX_START_INDEX = 0;
    const VERTEX_END_INDEX   = 1;
    const BOUND_OPEN         = 0;
    const BOUND_CLOSE        = 1;
    const COORD_X            = 0;
    const COORD_Y            = 1;
    const COORD_Z            = 2;

    if ((layerIndex-1)< this.mtlTCSQBoundariesBlocksLayers.length) {
        var verticesStar            = this.mtlTCSQBoundariesBlocksLayers[layerIndex-1][blockIndex][VERTEX_START_INDEX];
        var verticesEnd             = this.mtlTCSQBoundariesBlocksLayers[layerIndex-1][blockIndex][VERTEX_END_INDEX];
        if (coupleVertexIndex< verticesStar.length) {
            var vertexStart            = verticesStar[coupleVertexIndex];
            var vertexEnd              = verticesEnd[coupleVertexIndex];

            var mxOut = this.twoVerticesR3_Scale([vertexStart,vertexEnd ],this.mtlTCSQScaleFact).slice();
            var coco  = mxOut[0][0];
            var startBound = boundsParamsMx[0];
            var endBound   = boundsParamsMx[1];
           // console.log(vertexStart,vertexEnd,this.mtlTCSQScaleFact, mxOut   );
            this.mtlTCSQBoundariesBlocksLayersSet (layerIndex,blockIndex,coupleVertexIndex, mxOut);

            if (coupleVertexIndex == 1) {
                if (startBound) this.mtlTCSQBlockStartCornerSet(layerIndex,blockIndex);

            }
            if(coupleVertexIndex == verticesStar.length-1) {

               if (endBound) this.mtlTCSQBlockEndCornerSet(layerIndex,blockIndex);
            }

           }
    };
};

//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQBoundariesLayersBlockIni                     = function () {

    for(var layerIndex = 1; layerIndex<this.mtlTCSQBoundariesScaleLayer_Count+1;layerIndex++ ) {
         for(var coupleVertexIndex = 0; coupleVertexIndex< this.mtlTCSQHigherLength;coupleVertexIndex++ ) {
            this.mtlTCSQBoundariesEachLayerBlockIni(layerIndex,this.mtlTCSQ_BLOCK_FARWEST,coupleVertexIndex,[false,true]);
            this.mtlTCSQBoundariesEachLayerBlockIni(layerIndex,this.mtlTCSQ_BLOCK_WEST,coupleVertexIndex,[false,false]);
            this.mtlTCSQBoundariesEachLayerBlockIni(layerIndex,this.mtlTCSQ_BLOCK_FAR_N_WEST,coupleVertexIndex,[false,true]);
            this.mtlTCSQBoundariesEachLayerBlockIni(layerIndex,this.mtlTCSQ_BLOCK_CENTER,coupleVertexIndex,[true,false]);
        };
    };
    //console.log(this.mtlTCSQBoundariesBlocksLayers);
 };

//Initialiser toutes les structures de données des blocks
MTL375.prototype.mtlTCSQBoundariesBlockIni                           = function () {
    this.mtlTCSQBoundariesBlockGroup();
    this.mtlTCSQBoundariesLayersBlockIni();
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
           // this.mtlTCSQVectorBordersIni_Build(locIndex);

        }
    } ;
    // this.mtlTCSQBordersLayers.push(this.mtlTCSQBorders.slice());
};


// initialiser les données intermediares
MTL375.prototype.mtlTCSQIniOperationalData                           = function () {
    this.mtlTCSQBoundariesLocations_Conversions  = [];
    this.mtlTCSQLocationsModelFromCenter         = [];
    this.mtlTCSQBorders                          = [];
    this.mtlTCSQBordersLayers                    = [];
    this.mtlTCSQVerticesCouple                   = [];
    this.mtlTCSQBasicGeometry                    = new THREE.Geometry();


   // var mxExt    =  this.mtlTCSQExtensionJsonVerticesSplit(  this.mtlTCSQFAR_N_WEST_EXT_0_5_SIDE_JsonVertices).slice();

   // this.mtlTCSQWEST_5_SIDE_JsonVertices     =  mxExt[0];
   // this.mtlTCSQFAR_WEST_0_SIDE_JsonVertices =  mxExt[1];

    this.mtlTCSQFAR_WEST_SIDE_Vertices                   = this.mtlTCSQParseToVertices( this.mtlTCSQFAR_WEST_SIDE_JsonVertices).slice();

    ///testEvalation                                        = this.mtlTCSQBoundaryBlockMxSplit( this.mtlTCSQFAR_WEST_SIDE_Vertices);


    this.mtlTCSQWEST_SIDE_Vertices                       = this.mtlTCSQParseToVertices( this.mtlTCSQWEST_SIDE_JsonVertices).slice();
    this.mtlTCSQFAR_N_WEST_EXT_0_5_SIDE_Vertices         = this.mtlTCSQParseToVertices( this.mtlTCSQFAR_N_WEST_EXT_0_5_SIDE_JsonVertices).slice();
    var mxExt                                            = this.mtlTCSQExtensionJsonVerticesSplit( this.mtlTCSQFAR_N_WEST_EXT_0_5_SIDE_Vertices).slice();
    this.mtlTCSQWEST_5_SIDE_Vertices                     = mxExt[0];
    this.mtlTCSQFAR_WEST_0_SIDE_Vertices                 = mxExt[1];
    this.mtlTCSQCENTER_SIDE_Vertices                     = this.mtlTCSQParseToVertices(this.mtlTCSQCENTER_SIDE_JsonVertices).slice();


    this.mtlTCSQCENTER_N_WEST_EXT_6_0_SIDE_Vertices      = this.mtlTCSQParseToVertices(this.mtlTCSQCENTER_N_WEST_EXT_6_0_SIDE_JsonVertices).slice();
    var mxExt1                                           = this.mtlTCSQExtensionJsonVerticesSplit(this.mtlTCSQCENTER_N_WEST_EXT_6_0_SIDE_Vertices).slice();
    this.mtlTCSQCENTER_6_SIDE_Vertices                   = mxExt1[0];
    this.mtlTCSQWEST_0_SIDE_Vertices                     = mxExt1[1];

    this.mtlTCSQEAST_SIDE_Vertices                       = this.mtlTCSQParseToVertices( this.mtlTCSQEAST_SIDE_JsonVertices).slice();

    this.mtlTCSQCENTER_N_EAST_EXT_13_16_SIDE_Vertices    = this.mtlTCSQParseToVertices(this.mtlTCSQCENTER_N_EAST_EXT_13_16_SIDE_JsonVertices).slice();
    var mxExt2                                           = this.mtlTCSQExtensionJsonVerticesSplit(this.mtlTCSQCENTER_N_EAST_EXT_13_16_SIDE_Vertices).slice();
    this.mtlTCSQCENTER_13_SIDE_Vertices                  = mxExt2[0];
    this.mtlTCSQEAST_16_SIDE_Vertices                    = mxExt2[1];



    this.mtlTCSQFAR_WEST_SIDE_Bounderies     = this.mtlTCSQDataToEBKFormat(this.mtlTCSQFAR_WEST_SIDE_Vertices).slice();

    this.mtlTCSQWEST_SIDE_Bounderies         = this.mtlTCSQDataToEBKFormat(this.mtlTCSQWEST_SIDE_Vertices).slice();

    this.mtlTCSQWEST_5_SIDE_Bounderies       = this.mtlTCSQDataToEBKFormat(this.mtlTCSQWEST_5_SIDE_Vertices).slice();
    this.mtlTCSQFAR_WEST_0_SIDE_Bounderies   = this.mtlTCSQDataToEBKFormat(this.mtlTCSQFAR_WEST_0_SIDE_Vertices).slice();

    this.mtlTCSQCENTER_SIDE_Bounderies       = this.mtlTCSQDataToEBKFormat(this.mtlTCSQCENTER_SIDE_Vertices).slice();

    this.mtlTCSQCENTER_6_SIDE_Bounderies     = this.mtlTCSQDataToEBKFormat(this.mtlTCSQCENTER_6_SIDE_Vertices).slice();
    this.mtlTCSQWEST_0_SIDE_Bounderies       = this.mtlTCSQDataToEBKFormat(this.mtlTCSQWEST_0_SIDE_Vertices ).slice();

    this.mtlTCSQEAST_SIDE_Bounderies         = this.mtlTCSQDataToEBKFormat(this.mtlTCSQEAST_SIDE_Vertices).slice();


    this.mtlTCSQCENTER_13_SIDE_Bounderies     = this.mtlTCSQDataToEBKFormat(this.mtlTCSQCENTER_13_SIDE_Vertices).slice();
    this.mtlTCSQEAST_16_SIDE_Bounderies       = this.mtlTCSQDataToEBKFormat(this.mtlTCSQEAST_16_SIDE_Vertices).slice();


    this.mtlTCSQBoundariesBlockIni();


    // this.mtlTCSQBoundariesCenter = this.centerArr(this.mtlTCSQBoundariesLocations_Conversions);
    //this.mtlTCSQBoundariesCenter = [0,0,0];
   // this.mtlTCSQLocationsModelFromCenterMake();

};

//construire  les couples de vertex
MTL375.prototype.mtlTCSQVerticesCoupleGen                            = function(){

    for (var locIndex = 0;locIndex< this.mtlTCSQLocationsModelFromCenter.length/2;locIndex++ ) {
        var    coords = this.mtlTCSQLocationsModelFromCenter[locIndex];
        var    coords1 = this.mtlTCSQLocationsModelFromCenter[locIndex+this.mtlTCSQLocationsModelFromCenter.length/2];

        this.mtlTCSQVerticesCouple.push([[coords[0],coords[1],-coords[2]],[coords1[0],coords1[1],-coords1[2]]]);

        var    coordsA = this.mtlTCSQLocationsModelFromCenter[locIndex];
        var    coordsB = this.mtlTCSQLocationsModelFromCenter[ (this.mtlTCSQLocationsModelFromCenter.length-1)-locIndex];
        this.mtlTCSQBasicGeometry.vertices[locIndex] =  new THREE.Vector3(coordsA[0], coordsA[1], -coordsA[2]);
        this.mtlTCSQBasicGeometry.vertices[ (this.mtlTCSQLocationsModelFromCenter.length-1)-locIndex] =  new THREE.Vector3(coordsB[0], coordsB[1], -coordsB[2]);

    } ;


    this.mtlTCSQBasicGeometry.faces.push( new THREE.Face3(this.mtlTCSQBasicGeometry.vertices.length-1,this.mtlTCSQBasicGeometry.vertices.length-2,1) );

    this.mtlTCSQBasicGeometry.computeFaceNormals();
    this.mtlTCSQBasicGeometry.computeVertexNormals();





   // console.log(this.mtlTCSQBasicGeometry.vertices,this.mtlTCSQBasicGeometry.vertices.length);
};

//construire
MTL375.prototype.mtlTCSQVerticesCoupleScale                            = function(mxVerticesCouples,mxScalefact){

    var mxOut = [];
    for (var locIndex = 0;locIndex< mxVerticesCouples.length;locIndex++ ) {

        var points =   this.twoVerticesR3_Scale(mxVerticesCouples[locIndex],mxScalefact);
        mxOut.push(points.slice());

    } ;
    var lastIndex    = mxVerticesCouples.length -1;
    var points_A     =  this.twoVerticesR3_Scale([mxOut[0][0],mxOut[1][0]],mxScalefact).slice();
    var points_B     =  this.twoVerticesR3_Scale([mxOut[0][1],mxOut[1][1]],mxScalefact).slice();

    var points_C     =  this.twoVerticesR3_Scale([mxOut[lastIndex][0],mxOut[lastIndex-1][0]],mxScalefact).slice();
    var points_D     =  this.twoVerticesR3_Scale([mxOut[lastIndex][1],mxOut[lastIndex-1][1]],mxScalefact).slice();
    mxOut[0]         = [points_A[0],points_B[0]];
    mxOut[lastIndex] = [points_C[0],points_D[0]];

    return  mxOut;
};

//construire
MTL375.prototype.mtlTCSQVerticesCoupleScaleIter                      = function(mxVerticesCouples,mxScalefact,timesCount){

    var mxOut = [];

    if ((timesCount == 1)||(timesCount == 0) ) {
        mxOut.push( this.mtlTCSQVerticesCoupleScale(mxVerticesCouples,mxScalefact).slice());
    } else  {

        mxVerticesCouplesITerIn   =  mxVerticesCouples.slice();
        for (var timeIndex = 0;timeIndex< timesCount;timeIndex++ ) {

            //var randVal = this.floatRandom(0.04,0.3);
            mxOut.push( this.mtlTCSQVerticesCoupleScale(mxVerticesCouplesITerIn ,mxScalefact).slice());
            mxVerticesCouplesITerIn = mxOut[mxOut.length-1].slice();
        };


    };


  //  mxOut.unshift( mxVerticesCouples.slice());
    //console.log( mxOut);
    return  mxOut;
};

MTL375.prototype.mtlTCSQGenerateMx                                   = function(){
   // this.mtlTCSQVerticesCoupleGen();
   // this.mtlTCSQVerticesCoupleLayers  =  this.mtlTCSQVerticesCoupleScaleIter(this.mtlTCSQVerticesCouple,[0.1,0.1],this.mtlTCSQScaleTimesCount).slice();
  //  this.mtlTCSQVerticesCoupleLayers.unshift(this.mtlTCSQVerticesCouple.slice());
};

//construire
MTL375.prototype.mtlTCSQBuild                                          = function(params){
    this.mtlTCSQAssign(params);
    this.mtlTCSQIniOperationalData();
    this.mtlTCSQGenerateMx();
};

//construire
MTL375.prototype.mtlTCSQGraphicsBuild                                          = function(){
    var coords,coords1,dilCoord,sizeBox = 300, wr = false;
    //this.mtlTCSQLocationsModelFromCenter.length


   var  matoss= new THREE.PointsMaterial( { size: 1300,color: "blue" , opacity: 0.8, transparent: true } );
   var particles = new THREE.Points(  this.mtlTCSQBasicGeometry,  matoss );
    scene.add(particles);

    var maccc = new THREE.MeshStandardMaterial( { color: 0x00ff00,side:THREE.DoubleSide } );
    var tri = new THREE.Mesh( this.mtlTCSQBasicGeometry, maccc  );
    scene.add( tri);

      var material = new THREE.LineBasicMaterial({
        color: "white" ,linewidth :2
    });

    var geometry = new THREE.Geometry();


    var material1 = new THREE.LineBasicMaterial({
        color: "white" ,linewidth :2
    });

    var geometry1 = new THREE.Geometry();

    var material2= new THREE.LineBasicMaterial({
        color: "white" ,linewidth :2
    });

    var geometry2 = new THREE.Geometry();


    for (var locIndex = 0;locIndex< this.mtlTCSQVerticesCouple.length;locIndex++ ) {
        coords  = this.mtlTCSQVerticesCouple[locIndex][0];
        coords1 = this.mtlTCSQVerticesCouple[locIndex][1];

        var    box1     = new THREE.BoxGeometry(sizeBox,sizeBox,sizeBox);
        var    mat1     = new THREE.MeshBasicMaterial( {color:"yellow",wireframe:true});
        var    meshBox1 = new THREE.Mesh(box1,mat1)  ;
        scene.add(meshBox1);
        meshBox1.position.set(coords[0],coords[1],coords[2]);


            var    box2     = new THREE.BoxGeometry(sizeBox,sizeBox,sizeBox);
        var    mat2     = new THREE.MeshBasicMaterial( {color:"yellow",wireframe:true});
        var    meshBox2 = new THREE.Mesh(box2,mat2)  ;
        scene.add(meshBox2);
        meshBox2.position.set(coords1[0],coords1[1],coords1[2]);

        geometry1.vertices.push(
            new THREE.Vector3( coords[0],coords[1],coords[2]  )

        );

        geometry2.vertices.push(
            new THREE.Vector3( coords1[0],coords1[1],coords1[2]  )

        );

        geometry.vertices.push(
            new THREE.Vector3( coords[0],coords[1],coords[2] ),
            new THREE.Vector3( coords1[0],coords1[1],coords1[2] )

        );


    } ;

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    var line1 = new THREE.Line( geometry1, material1 );
    scene.add( line1 );
    var line2 = new THREE.Line( geometry2, material2 );
    scene.add( line2 );

};


//construire
MTL375.prototype.mtlTCSQGraphicsScaleIterBuild                       = function(){
    var coords,coords1,dilCoord,sizeBox = 200, wr = false;

    for (var timeIndex = 0;timeIndex< this.mtlTCSQVerticesCoupleLayers.length;timeIndex++ ) {

        for (var locIndex = 0;locIndex< this.mtlTCSQVerticesCoupleLayers[timeIndex].length;locIndex++ ) {
            coords  = this.mtlTCSQVerticesCoupleLayers[timeIndex][locIndex][0];
            coords1 = this.mtlTCSQVerticesCoupleLayers[timeIndex][locIndex][1];

            var    box1     = new THREE.BoxGeometry(sizeBox,sizeBox,sizeBox);
            var    mat1     = new THREE.MeshBasicMaterial( {color:"red",wireframe:false});
            var    meshBox1 = new THREE.Mesh(box1,mat1)  ;
            scene.add(meshBox1);
            meshBox1.position.set(coords [0],coords [1],coords [2]);


            var    box2     = new THREE.BoxGeometry(sizeBox,sizeBox,sizeBox);
            var    mat2     = new THREE.MeshBasicMaterial( {color:"red",wireframe:false});
            var    meshBox2 = new THREE.Mesh(box2,mat2)  ;
            scene.add(meshBox2);
            meshBox2.position.set(coords1[0],coords1[1],coords1[2]);

        } ;

    };

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
        geo.vertices[locIndex] =  new THREE.Vector3(coords[0],  coords [1], - coords [2]);
        geometry1.vertices[locIndex] = new THREE.Vector3(coords[0],  coords [1], - coords [2]);
    }
    var  matoss= new THREE.PointsMaterial( { size: 0.2,color: "blue" , opacity: 0.8, transparent: true } );
    var particles = new THREE.Points( geo,  matoss );
    scene.add(particles);
    var line = new THREE.Line( geometry1, material1 );
    scene.add( line );
};

//construire  les couples de vertex
MTL375.prototype.mtlTCSShowbounderies                           = function() {

    this.mtlTCSShowBlockbounderies(this.mtlTCSQFAR_WEST_SIDE_Bounderies);
    this.mtlTCSShowBlockbounderies(this.mtlTCSQWEST_SIDE_Bounderies);
    this.mtlTCSShowBlockbounderies(this.mtlTCSQWEST_5_SIDE_Bounderies);
    this.mtlTCSShowBlockbounderies(this.mtlTCSQFAR_WEST_0_SIDE_Bounderies);
    this.mtlTCSShowBlockbounderies(this.mtlTCSQCENTER_SIDE_Bounderies);
    this.mtlTCSShowBlockbounderies(this.mtlTCSQCENTER_6_SIDE_Bounderies);
    this.mtlTCSShowBlockbounderies(this.mtlTCSQWEST_0_SIDE_Bounderies);
    this.mtlTCSShowBlockbounderies(this.mtlTCSQEAST_SIDE_Bounderies);
    this.mtlTCSShowBlockbounderies(this.mtlTCSQCENTER_13_SIDE_Bounderies);
    this.mtlTCSShowBlockbounderies(this.mtlTCSQEAST_16_SIDE_Bounderies);


};


//Affiche une couche
MTL375.prototype.mtlTCSQBlockShow                                    = function (layerIndex,blockIndex,coupleVertexIndex) {

    var block_0  = this.mtlTCSQBoundariesBlocksLayers[layerIndex][blockIndex][0];
    var block_1  = this.mtlTCSQBoundariesBlocksLayers[layerIndex][blockIndex][1];
    if (coupleVertexIndex < block_0.length) {
        var coords1 = block_0[coupleVertexIndex].slice();
        var coords2 = block_1[coupleVertexIndex].slice();

        this.mtlTCSQvertices.push(new THREE.Vector3(coords1[0],coords1[1],coords1[2]));
        this.mtlTCSQvertices.push(new THREE.Vector3(coords2[0],coords2[1],coords2[2]));
    }


}


//Initialiser plusieure couches de mise en echelle de chaque block
MTL375.prototype.mtlTCSQBoundariesLayersBlockShow                     = function () {
    this.mtlTCSQvertices = [];
    var geo = new THREE.Geometry();
    for(var layerIndex = 0; layerIndex<this.mtlTCSQBoundariesBlocksLayers.length;layerIndex++ ) {
        for(var coupleVertexIndex = 0; coupleVertexIndex< this.mtlTCSQHigherLength;coupleVertexIndex++ ) {

            this.mtlTCSQBlockShow(layerIndex,this.mtlTCSQ_BLOCK_FARWEST,coupleVertexIndex);
            this.mtlTCSQBlockShow(layerIndex,this.mtlTCSQ_BLOCK_WEST,coupleVertexIndex);
            this.mtlTCSQBlockShow(layerIndex,this.mtlTCSQ_BLOCK_FAR_N_WEST,coupleVertexIndex);
            this.mtlTCSQBlockShow(layerIndex, this.mtlTCSQ_BLOCK_CENTER,coupleVertexIndex);
        };
    };


     geo.vertices =  this.mtlTCSQvertices;
    var  matoss   = new THREE.PointsMaterial( { size: 0.3,color: "red" , opacity: 1, transparent: true } );

    var particles = new THREE.Points( geo,  matoss );
    scene.add(particles);


};





var mtl = new MTL375();
 //console.log(mtl.orientation3Vertex ([0,0],[-2,2],[2,2]));

//console.log(mtl.angleBetween3Vertex([0,0],[0,-1],[1,0]));

mtl.mtlTCSQBuild();



