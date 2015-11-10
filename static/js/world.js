/* global $ */
/* global Stats */
/* global THREE */
(function(doc, win){

    'use strict';

    var defaults = {
        earth_spin_speed: 0.0003,
        clouds_spin_speed: 0.0004,
        global_illumination: 0x222222, //0x222222
        default_html      : '<div class="data-countries"></div>',
        data_path         : 'static/js/data/data.json',
        new_data_interval : 300000, // 5min
        data_size_height : 4,
        data_size_width : 4,
        full_screen_width: win.innerWidth,
        full_screen_height: win.innerHeight
    };

    // three.js scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 25, win.innerWidth / win.innerHeight, .1, 10000 );

    //globals
    var cameraControl,
    cloudMesh,
    cityLights,
    composer,
    sceneBG, cameraBG,
    stats,
    latLongToVector3,
    renderer,
    sphere,
    clock,
    fetchJSONFile,
    addCanvas,
    world,
    canvas;

    //@start init
    function moduleInit() {

        clock = new THREE.Clock();

        // camera position 
        camera.position.x = 80;
        camera.position.y = 30;
        camera.position.z = 1;
        camera.name='main-camera';
        camera.lookAt(scene.position);

        // controls (using orbit library)
        cameraControl = new THREE.OrbitControls(camera);
        cameraControl.minDistance = 55;
        cameraControl.maxDistance = 80;

        // size hack FIX ME
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(win.innerWidth, win.innerHeight);
        renderer.shadowMapEnabled = true;
            
        // world
        sphere = new THREE.Mesh( globeGenerate(), worldTexture() );
        sphere.name = 'earth';
        scene.add( sphere );

        // create overlay
        var overlayGeometry = new THREE.SphereGeometry(15.1, 32, 32);
        var overlayMaterial = createOverlayMaterial();
        var overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterial);
        overlayMesh.name= 'overlay';
        scene.add(overlayMesh);

        //lights
        scene.add(cityLightsRender());

        // clouds
        sphere.add(cloudsRender());
        
        // now add some better lighting
        scene.add(ambientLight());

        // add sunlight 
        scene.add(directionalLight());

        //addStats to render (FPS)
        addStatsObject();

        // add background
        cameraBG = new THREE.OrthographicCamera(-win.innerWidth, win.innerWidth, win.innerHeight, -win.innerHeight, -10000, 10000);
        cameraBG.position.z = 50;
        sceneBG = new THREE.Scene();

        var materialColor = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture("static/images/space.jpg"), depthTest: false });
        var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
        bgPlane.position.z = -100;
        bgPlane.scale.set(win.innerWidth * 2, win.innerHeight * 2, 1);
        sceneBG.add(bgPlane);

        doc.querySelector('.country-list').innerHTML = defaults.default_html;

        // add these passes to the composer
        document.body.appendChild( renderer.domElement );
        composerRender();
        render();

    };
    //@end init



    //@start get data
    fetchJSONFile = function (path, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
          if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var data = JSON.parse(httpRequest.responseText);
            if (callback) {
              callback(data);
            }
          }
        };

        httpRequest.open('GET', path);
        httpRequest.send();

        setInterval(function(){
            httpRequest.open('GET', path);
            httpRequest.send();
        }, defaults.new_data_interval);
    };
    //@end get data



    //@start use data
    addCanvas = function () {  

        canvas = document.createElement("canvas");
        canvas.width = 4096;
        canvas.height = 2048;

        var context = canvas.getContext('2d');

        fetchJSONFile(defaults.data_path, function(data){

            var container = $('.data-countries');
            container.css({'height': defaults.full_screen_height, 'overflow': 'auto'});

            var html = '<details> <ul>',
                   x,
                   y;

            $.each(data.earth, function(key, value){
                
                html += '<li> <h3>' + key + '<span class="total-rev">' + value.TotalRevenue + '</h3></span></li>';
                
                if (value.Sales.length > 0) {
                    html += '<ul>';
                    $.each(value.Sales, function(key, value){  

                        html += '<li>' + value.city + ' <span class="total-rev">' + value.orderValue + '</span><p> Lat: ' + value.lat + ', Long:' + value.lng + '</p></li>';
                        
                        x = ( (canvas.width / 360) * ( 180  + parseFloat(value.lng) ) );
                        y = ( (canvas.height / 180) * ( 90 - parseFloat(value.lat) ) );


                        // var material = new THREE.MeshBasicMaterial( {color: 'red'} );
                        // var geometry = new THREE.BoxGeometry( 200, 500, 200 );
                        // var cube = new THREE.Mesh( geometry, material );                 

                        // cube.position.x = x;
                        // cube.position.y = y;
                        // cube.position.z = 1000;

                        // scene.add( cube );
                        
                        context.rect(x, y, defaults.data_size_width, defaults.data_size_height);
                        context.fillStyle = 'orange';
                        context.fill();
                        
                    });

                  html += '</ul>';
              }
            
          });

          html += '</ul></details>';
          container.html(html);

        });
        // debug to see canvas is being created document.body.appendChild(canvas);
        return canvas;
    };
    //@end use data



    //@start convert data to 3d
    latLongToVector3 = function (lat, lon, radius, heigth) {
        var phi = (lat)*Math.PI/180;
        var theta = (lon-180)*Math.PI/180;
 
        var x = -(radius+heigth) * Math.cos(phi) * Math.cos(theta);
        var y = (radius+heigth) * Math.sin(phi);
        var z = (radius+heigth) * Math.cos(phi) * Math.sin(theta);
 
        return new THREE.Vector3(x,y,z);
    }
    //@end convert data to 3d



    //@start clouds
    function cloudsRender() {
        var geometry = new THREE.SphereGeometry(15.15, 32, 32);
        var material = new THREE.MeshPhongMaterial({
            map         : THREE.ImageUtils.loadTexture('static/images/planets/fair_clouds_4k.png'),
            side        : THREE.DoubleSide,
            opacity     : 0.5,
            transparent : true,
            depthWrite  : false
        });
        cloudMesh = new THREE.Mesh(geometry, material);
        return cloudMesh;
    };
    //@start clouds



    //@start lights
    function ambientLight() {
        var ambientLight = new THREE.AmbientLight(defaults.global_illumination);
        ambientLight.name='ambient';
        return ambientLight;
    };

    function directionalLight() {
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.x = 100;
        directionalLight.position.y = 10;
        directionalLight.position.z = -50;
        directionalLight.name='directional';
        return directionalLight;
    };
    //@end lights



    //@start composer
    function composerRender() {
        var bgPass = new THREE.RenderPass(sceneBG, cameraBG);
        var renderPass = new THREE.RenderPass(scene, camera);
        var effectCopy = new THREE.ShaderPass(THREE.CopyShader);

        renderPass.clear = false;
        effectCopy.renderToScreen = true;
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(bgPass);
        composer.addPass(renderPass);
        composer.addPass(effectCopy);
        return composer;
    };
    //@end composer



    //@start: earth
    function globeGenerate() {
        world = new THREE.SphereGeometry(15, 32, 32);
        return world;
    };
    function worldTexture() {
        var worldMatertial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('static/images/planets/earthmap4k.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('static/images/planets/earthbump4k.jpg'),
            bumpScale: 5,
            normalMap: THREE.ImageUtils.loadTexture('static/images/planets/earth_normalmap_flat4k.jpg'),
            specularMap: THREE.ImageUtils.loadTexture('static/images/planets/earthspec4k.jpg'),
            specular: new THREE.Color(0x333333),
            normalScale: new THREE.Vector2(0.5, 0.7)
        });
        return worldMatertial;
    };
    //@end: earth

    

    //@start city lights
    function cityLightsRender() {
        var geometry = new THREE.SphereGeometry(15.01, 32, 32);

        var material = new THREE.MeshBasicMaterial({
            map         : THREE.ImageUtils.loadTexture('static/images/planets/city_lights_4k.png'),
            transparent : true,
            opacity     : .37,
            lights      : true
        });

        cityLights = new THREE.Mesh(geometry, material);
        return cityLights;
    };
    //@end city lights



    //@start: texture overlay
    function createOverlayMaterial() {
        var olMaterial = new THREE.MeshPhongMaterial();
        olMaterial.map = new THREE.Texture(addCanvas());
        olMaterial.transparent = true;
        olMaterial.lights = true;
        olMaterial.opacity = 1;
        return olMaterial;
    }
    //@end: texture overlay



    //@start render loop
    function render() {
        
        scene.getObjectByName('overlay').material.map.needsUpdate = true;
        cameraControl.update();
        
        cloudMesh.rotation.y += defaults.clouds_spin_speed;
        sphere.rotation.y += defaults.earth_spin_speed;
        cityLights.rotation.y += defaults.earth_spin_speed;
        scene.getObjectByName('overlay').rotation.y += defaults.earth_spin_speed;
        
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        camera.lookAt(scene.position);

        stats.update();

        renderer.autoClear = false;
        composer.render();
    };
    //@end render loop



    //@start stats
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = 0;
        stats.domElement.style.top = 0;
        document.body.appendChild(stats.domElement);
    };
    //@end stats



    //@start handleResize
    function handleResize() {
        camera.aspect = win.innerWidth / win.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(win.innerWidth, win.innerHeight);
    };
    //@end handleResize


    //render when win is ready
    win.onload = moduleInit();
    win.addEventListener('resize', handleResize, false);

})(document, window);