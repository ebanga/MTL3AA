/**
 * Created by jean-jacquesebanga on 2015-08-03, .
 */


var renderingExec = function () {



    function webCamInit() {

        video = document.createElement('video');
        //make it cross browser
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        //get webcam
        navigator.getUserMedia({
            video: true
        }, function (stream) {
            //on webcam enabled
            video.src = window.URL.createObjectURL(stream);

        }, function (error) {

        });

        videoTexture = new THREE.Texture(video);
    }


        function renderInit() {


        //déclaratif
        renderer = new THREE.WebGLRenderer();


           // renderer.setClearColor(new THREE.Color("rgb(255, 0, 0)"), 1);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.shadowMap.type = THREE.BasicShadowMap;



        renderer.setSize(objsInScene.widthScreen, objsInScene.canvasHeight);
        renderer.autoClear = false;



    }


    function cameraInit() {

        objsInScene.widthScreen = 1024;
        objsInScene.canvasHeight = 640;
        objsInScene.canvasRatio  = objsInScene.widthScreen/ objsInScene.canvasHeight;
        objsInScene.widthScreen  = window.innerWidth;
        objsInScene.heightScreen = objsInScene.canvasHeight;
        objsInScene.count =0;


        camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 0.1, 120000 );

        camera.position.set( 0, 0, 140 );
        controls = new THREE.OrbitControls( camera, renderer.domElement );

        
    }




    function sceneIni() {
        // SCENE


        scene = new THREE.Scene();
       // scene.fog = new THREE.Fog( 0xffffff, 1, 1600 );
       // scene.fog.color.setHSL( 0.6, 0, 1 );
    }


    function lightIni() {

        // ref for lumens: http://www.power-sure.com/lumens.htm
        objsInScene.bulbLuminousPowers = {
            "110000 lm (1000W)": 110000,
            "3500 lm (300W)": 3500,
            "1700 lm (100W)": 1700,
            "800 lm (60W)": 800,
            "400 lm (40W)": 400,
            "180 lm (25W)": 180,
            "20 lm (4W)": 20,
            "Off": 0
        };
        // ref for solar irradiances: https://en.wikipedia.org/wiki/Lux
        objsInScene.hemiLuminousIrradiances = {
            "0.0001 lx (Moonless Night)": 0.0001,
            "0.002 lx (Night Airglow)": 0.002,
            "0.5 lx (Full Moon)": 0.5,
            "3.4 lx (City Twilight)": 3.4,
            "4.4 lx ": 4.4,
            "50 lx (Living Room)": 50,
            "100 lx (Very Overcast)": 100,
            "350 lx (Office Room)": 350,
            "400 lx (Sunrise/Sunset)": 400,
            "1000 lx (Overcast)": 1000,
            "18000 lx (Daylight)": 18000,
            "50000 lx (Direct Sun)": 50000,
        };
        objsInScene.lightParams = {
            shadows: true,
            exposure: 1, //[0..1]
            bulbPower: Object.keys(  objsInScene.bulbLuminousPowers )[4],
            hemiIrradiance: Object.keys(  objsInScene.hemiLuminousIrradiances )[4]
        };



        var bulbGeometry = new THREE.SphereGeometry( 0.02, 16, 8 );
        bulbLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );
        bulbLight.castShadow = true;
        bulbLight.shadow.mapSize.width = 1024; // default is 512
        bulbLight.shadow.mapSize.height = 1024; // default is 512

        bulbLight.shadow.camera.near = 1;
        bulbLight.shadow.camera.far = 30;
        // pointLight.shadowCameraVisible = true;
        bulbLight.shadow.bias = 0.01;


        bulbMat   = new THREE.MeshStandardMaterial( {
            emissive: 0xffffee,
            emissiveIntensity: 1,
            color: 0x000000
        });
        bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
        bulbLight.position.set( 2, 4, -3 );
      //  bulbLight.castShadow = true;



        scene.add( bulbLight );

        hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );



        scene.add( hemiLight );



    }


    function helperIni() {


        var size = 1000, unit = 30,
            helperXYCenterColor ="blue",helperXYGridColor ="red",
            helperXZCenterColor ="blue",helperXZGridColor ="white",
            helperYZCenterColor ="blue",helperYZGridColor ="green",
            opacity = 0.5;

        var helperXY= new THREE.GridHelper( size,  unit );
        helperXY.setColors( helperXYCenterColor, helperXYGridColor );
        helperXY.position.y = 0;
        helperXY.rotation.x= Math.PI/2;
        helperXY.material.transparent = true;
        helperXY.material.opacity     =  opacity;


        var helperXZ = new THREE.GridHelper( size,  unit );
        helperXZ.setColors(  helperXZCenterColor , helperXZGridColor);
        helperXZ.position.y = 0;
        helperXZ.material.transparent = true;
        helperXZ.material.opacity     =  opacity;


        var helperYZ = new THREE.GridHelper( size,  unit );
        helperYZ.setColors( helperYZCenterColor , helperYZGridColor);
        helperYZ.position.y = 0;
        helperYZ.rotation.z= Math.PI/2;
        helperYZ.material.transparent = true;
        helperYZ.material.opacity     =  opacity;


       // scene.add( helperXZ );
       // scene.add( helperXY );
       // scene.add( helperYZ );

        var axisHelper = new THREE.AxisHelper( 300 );
        scene.add( axisHelper );

    }

    function paramsIni() {



    };


    function groundIni() {

        var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
        var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
        groundMat.color.setHSL( 0.095, 1, 0.75 );
        var ground = new THREE.Mesh( groundGeo, groundMat );
        ground.rotation.x = -Math.PI/2;
        ground.position.y = -33;
        scene.add( ground );
        ground.receiveShadow = true;

    };

    function skydomeIni() {



            // prepare ShaderMaterial without textures
            var vertexShader = document.getElementById('sky-vertex').textContent, fragmentShader = document.getElementById('sky-fragment').textContent;
            var uniforms = {
                topColor: {type: "c", value: new THREE.Color(0x0055ff)}, bottomColor: {type: "c", value: new THREE.Color(0xffffff)},
                offset: {type: "f", value: 50}, exponent: {type: "f", value: 0.6}
            }
            var skyMaterial = new THREE.ShaderMaterial({vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide, fog: false});

            // create Mesh with sphere geometry and add to the scene
            var skyBox = new THREE.Mesh( new THREE.SphereGeometry(6060, 60, 40), skyMaterial);

            this.scene.add(skyBox);


    };



    function objectsIni() {

        mtl.mtlTCSQGraphicsBuild();
        mtl.mtlTCSQGraphicsScaleIterBuild();

        //var box = new THREE.BoxGeometry(5,5,5);
        //var mat = new THREE.MeshBasicMaterial( {color:"blue"});
        //meshBox = new THREE.Mesh(box,mat)  ;
        //meshBox1 = new THREE.Mesh(box,mat)  ;
        //scene.add(meshBox)
        //
        //scene.add(meshBox1);
        //
        //
        //var box1 = new THREE.BoxGeometry(boxParams.width*2,boxParams.height*2,boxParams.depth*2);
        //var mat1 = new THREE.MeshBasicMaterial( {color:"blue",wireframe:true});
        //meshBox2 = new THREE.Mesh(box1,mat1)  ;
        //scene.add(meshBox2);
        //
        //meshBox2.position.set(boxParams.x,boxParams.y,boxParams.z) ;
        //
        //
        //structure.stcrShow();

        //
        //var box = new THREE.BoxGeometry(15,15,15);
        //
        //// translucent blue sphere with additive blending for "glow" effect
        //var darkMaterial = new THREE.MeshBasicMaterial( { color:"white", side: THREE.DoubleSide,  transparent: true, opacity: 1, blending: THREE.MultiplyBlending} );
        //var sphere = new THREE.Mesh(box, darkMaterial );
        //sphere.position.set(0,0, 0);
        //scene.add( sphere );
        //
        //var box1 = new THREE.BoxGeometry(20,10,10);
        //// translucent blue sphere with additive blending for "glow" effect
        //var darkMaterial1 = new THREE.MeshBasicMaterial( { color:"red",  transparent: true, opacity: 1} );
        //var sphere1 = new THREE.Mesh(box1, darkMaterial1 );
        //sphere.position.set(0,0, 20);
        //scene.add( sphere1 );
        //



        //for (var routeIndex = 0;routeIndex<structure.gridPAllRoutes.length;routeIndex++) {
        //
        //    var box = new THREE.BoxGeometry(1000,1000,1000);
        //    var mat = new THREE.MeshBasicMaterial( {color:"blue",wireframe:false});
        //    meshMx.push( new THREE.Mesh(box,mat) ) ;
        //    scene.add( meshMx[ meshMx.length-1]);
        //
        //}

        //structure1.gridPBuildArchitecture();
        //structure1.gridPAllRoutesGraphicsMake();



        //   structure1.gridPBuildArchitecture();
     //   structure2.gridPBuildArchitecture();




    };



    function structureIni() {
        videoTexture.minFilter = THREE.LinearFilter;

       // var sphereGeom = new THREE.SphereGeometry(23, 64, 64);
       //
       // var moonMaterial = new THREE.MeshBasicMaterial( { color:'red' } );
       // var moon = new THREE.Mesh(sphereGeom, moonMaterial);
       // moon.position.set(0,35,0);
       //scene.add(moon);
       //
       // // create custom material from the shader code above
       // //   that is within specially labeled script tags
       // var customMaterial = new THREE.ShaderMaterial(
       //     {
       //         uniforms:
       //         {
       //             "c":   { type: "f", value: 1.7 },
       //             "p":   { type: "f", value: 1.4 },
       //             glowColor: { type: "c", value: new THREE.Color('blue') },
       //             viewVector: { type: "v3", value: camera.position }
       //         },
       //         vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
       //         fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
       //         side: THREE.FrontSide,
       //         blending: THREE.AdditiveBlending,
       //         transparent: true
       //     }   );


        //this.moonGlow = new THREE.Mesh( new THREE.BoxGeometry(60,60,60), customMaterial.clone()  );
        //this.moonGlow.position.set(0,35,0);
        //this.moonGlow.scale.multiplyScalar(1.1);
        //
        //
        //this.moonGlow1 = new THREE.Mesh( new THREE.BoxGeometry(60,60,60), customMaterial.clone()  );
        //this.moonGlow1.position.set(0,35,0);
        //this.moonGlow1.scale.multiplyScalar(1.102);
        //
        //this.moonGlow.castShadow = true;
        //scene.add(  this.moonGlow );
        //scene.add(  this.moonGlow1 );

    }



    function renderEnd() {

        renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true,
            alpha: true,
            premultipliedAlpha: true});

        renderer.setClearColor(new THREE.Color("rgb(0, 0, 0)"), 1);
        renderer.physicallyCorrectLights = true;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.setSize(objsInScene.widthScreen, objsInScene.canvasHeight);
        container.appendChild( renderer.domElement );

        var controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.target.set( 0, 0, 0 );
        controls.update();

    }


    function init() {
        webCamInit();
        renderInit();
        cameraInit();
        sceneIni();
        lightIni();
        helperIni();
        paramsIni();

        objectsIni();
        structureIni();
        //groundIni();
       // skydomeIni();

        renderEnd();

    }

   var once = true;
    var objectsUpdate = function () {

        soundUpdate();


        //obj.bxtGetTransition(10,0,0,0,0,height,depth,tType,step_index, step_count,tFact_Mx,
        //    randomIntervalSize_factor,randomMin,randomMax,isTriggerOnce,isRepeat)
        //

      //  if (counter >2) once = false;


      //  if (counter <13) {

      //      var data =  obj.bxtGetTransition(8,boxParams.x,boxParams.y,boxParams.z,boxParams.width,boxParams.height,boxParams.depth,0,counter, 500,
        //        [0,-0.05,-.0008,-0.03,-0.015,-0.05,-0.03,-0.015,-0.05,-0.015,-0.05] ,once,true);


        //    console.log(data);
            //    meshBox.setPosition(data[0],data[1],data[2]);
      //      meshBox.position.set(data[0],data[1],data[2]);

      //  camera.lookAt(new THREE.Vector3(data[0],data[1],data[2]));

      //  }


     //   var data1 =  obj.bxtGetTransition(8,boxParams.x,boxParams.y,boxParams.z,boxParams.width,boxParams.height,boxParams.depth,2,counter,200000,
      //      [-0.01,-0.05,-.0008,-0.03,-0.015,-0.05,-0.03,-0.015,-0.05,-0.015,-0.05],once,true);

     //   meshBox1.position.set(data1[0],data1[1],data1[2]);

      //  camera.position.set( data1[0],data1[1], data1[2] );



          //  var res = trans.trscGetItemsStep(1,counter,200, structure.gridPAllRoutes[0].locations,true,false);

           // move = trans.trscGetItemsStep(0,counter,10,structure.gridPAllRoutes[0].locations,[0.02],true,true);

          //  meshBox .position.set( move[0], move[1],  move[2]);


            //for (var routeIndex = 0;routeIndex<structure.gridPAllRoutes.length;routeIndex++) {
            //
            //    var loc =   trans.trscGetItemsStep(0,counter,16,structure.gridPAllRoutes[routeIndex].locations,[-0.01],false,true);
            //    meshMx[ routeIndex].position.set( loc[0], loc[1],  loc[2]);
            //
            //
            //}
            //




        counter++;
        Ebk.frame_count++;

    };


    function addToDOM() {


        var container = document.getElementById('container');
        var canvas = container.getElementsByTagName('canvas');
        if (canvas.length > 0) {
            container.removeChild(canvas[0]);
        }
        container.appendChild(renderer.domElement);
    }

    var previousShadowMap = false;

    function render() {

        objectsUpdate();

        if( objsInScene.lightParams.shadows !== previousShadowMap ) {

            previousShadowMap = objsInScene.lightParams.shadows;
        }
        bulbLight.power = objsInScene.bulbLuminousPowers[ objsInScene.lightParams.bulbPower ];
        bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow( 0.02, 2.0 ); // convert from intensity to irradiance at bulb surface
        hemiLight.intensity = objsInScene.hemiLuminousIrradiances[  objsInScene.lightParams.hemiIrradiance ];


        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            videoTexture.needsUpdate = true;
        }


     //  var gridCenter = structure.stcrGetGridCenter();

       // camera.lookAt(new THREE.Vector3( move[0],move[1], move[2]));
        //camera.position.set( move[0],move[1], move[2]);

       // console.log( move[0], move[1], move[2] );
        renderer.render( scene, camera );
        var screenshot = renderer.domElement.toDataURL("coco.png");

    }

    function animate() {

        window.requestAnimationFrame(animate);
        controls.update();
        render();
    }


    function setupGui() {

      gui = new dat.GUI();

      gui.add(  objsInScene.lightParams , 'hemiIrradiance', Object.keys( objsInScene.hemiLuminousIrradiances ) );
      var thresholdRegMin =  gui.add( objsInScene.ebkTriangulation  , 'thresholdRegMin').min(-6).max(6).name("thresholdRegMin");
          thresholdRegMin.onChange(function(jar){ objsInScene.ebkTriangulation.thresholdRegMin = jar });
      var thresholdRegMax =  gui.add( objsInScene.ebkTriangulation  , 'thresholdRegMax').min(-6).max(6).name("thresholdRegMax");
          thresholdRegMax.onChange(function(jar){ objsInScene.ebkTriangulation.thresholdRegMax = jar });

      var subDivsteps_count =gui.add( objsInScene.ebkTriangulation  , 'steps_count',[2,3,4]).name("SubDiv Depth Count");
          subDivsteps_count.onChange(function(jar){objsInScene.ebkTriangulation.steps_count = jar });

        var  innerFactor   =gui.add( objsInScene.ebkTriangulation  , 'innerFactor').min(-6).max(6).name("inner Factor");
             innerFactor.onChange(function(jar){ objsInScene.ebkTriangulation.innerFactor = jar });


        gui.open();
    }



    //try {

        iniEbkSession(false);
       // webAudioInit();
        midiIni();
        init();
        setupGui();
        addToDOM();
        animate();

    // } catch (e) {
    //     var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    //   $('#container').append(errorReport + e);
    //}


}




