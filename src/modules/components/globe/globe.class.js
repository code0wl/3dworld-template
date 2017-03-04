"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three-js");
var OrbitControls = require('three-orbit-controls')(THREE);
var Globe = (function () {
    function Globe(options) {
        this.THREE = THREE();
        this.rotationSpeed = options.rotationSpeed;
        this.cloudRotationSpeed = options.rotationSpeed;
        this.globalIllumination = options.globalIllumination;
        this.domClass = options.domClass;
        this.dataURL = options.dataURL;
        this.dataPolling = options.dataPolling;
        this.createScene();
        this.globeGenerate();
        var overlayMaterial = this.createOverlayMaterial();
        var overlayMesh = new this.THREE.Mesh(new this.THREE.SphereGeometry(15.1, 32, 32), overlayMaterial);
        this.createGlobe();
        this.addCanvas(options);
    }
    Globe.prototype.createGlobe = function () {
        this.sphere = new this.THREE.Mesh(this.globeGenerate(), this.worldTexture());
        this.sphere.name = 'earth';
        this.scene.add(this.sphere);
    };
    Globe.prototype.fetchJSONFile = function (path, callback) {
        //@start get data
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) {
                    callback(data);
                }
            }
        };
        httpRequest.open('GET', path);
        httpRequest.send();
        setInterval(function () {
            httpRequest.open('GET', path);
            httpRequest.send();
        }, 1000);
    };
    Globe.prototype.addCanvas = function (options) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 4096;
        this.canvas.height = 2048;
        var context = this.canvas.getContext('2d');
        this.fetchJSONFile(options.data_path, function (data) {
            var container = document.querySelector('.data-countries');
            container.style.height = options.full_screen_height;
            container.style.overflow = 'auto';
            var html = '<details> <ul>', x, y;
            Object.keys(data.earth).map(function (key) {
                html += '<li> <h3>' + key + '<span class="total-rev">' + data.earth[key].TotalRevenue + '</h3></span></li>';
                if (data.earth[key].Sales.length > 0) {
                    html += '<ul>';
                    data.earth[key].Sales.map(function (key, index) {
                        html += '<li>' + key.city + ' <span class="total-rev">' + key.orderValue + '</span><p> Lat: ' + key.lat + ', Long:' + key.lng + '</p></li>';
                        x = ((this.canvas.width / 360) * (180 + parseFloat(key.lng)));
                        y = ((this.canvas.height / 180) * (90 - parseFloat(key.lat)));
                        context.rect(x, y, options.data_size_width, options.data_size_height);
                        context.fillStyle = 'orange';
                        context.fill();
                    });
                    html += '</ul>';
                }
            });
            html += '</ul></details>';
            container.innerHTML = html;
        });
        return this.canvas;
    };
    // TODO: change height, width to auto
    Globe.prototype.createScene = function () {
        this.scene = new this.THREE.Scene();
        this.camera = new this.THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, .1, 10000);
        this.camera.position.x = 80;
        this.camera.position.y = 30;
        this.camera.position.z = 1;
        this.camera.name = 'main-camera';
        this.camera.lookAt(this.scene.position);
        this.cameraControl = this.THREE.OrbitControls(this.camera);
        this.cameraControl.minDistance = 55;
        this.cameraControl.maxDistance = 80;
        window.addEventListener('resize', this.handleResize, false);
    };
    Globe.prototype.handleResize = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    Globe.prototype.globeGenerate = function () {
        var world = new this.THREE.SphereGeometry(15, 32, 32);
        return world;
    };
    Globe.prototype.worldTexture = function () {
        var worldMatertial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../../../static/images/planets/earthmap4k.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('../../../static/images/planets/earthbump4k.jpg'),
            bumpScale: 5,
            normalMap: THREE.ImageUtils.loadTexture('../../../static/images/planets/earth_normalmap_flat4k.jpg'),
            specularMap: THREE.ImageUtils.loadTexture('../../../static/images/planets/earthspec4k.jpg'),
            specular: new THREE.Color(0x333333),
            normalScale: new THREE.Vector2(0.5, 0.7)
        });
        return worldMatertial;
    };
    Globe.prototype.createOverlayMaterial = function () {
        var olMaterial = new this.THREE.MeshPhongMaterial();
        olMaterial.map = new this.THREE.Texture(this.addCanvas());
        olMaterial.transparent = true;
        olMaterial.lights = true;
        olMaterial.opacity = 1;
        return olMaterial;
    };
    return Globe;
}());
exports.Globe = Globe;
