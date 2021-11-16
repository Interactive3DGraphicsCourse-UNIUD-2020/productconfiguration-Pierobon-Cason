var stats, controls, renderer, scene, camera, loader, ourMaterial, textureCube, uniforms;
var envMap = false;
var norPre = false;
var plasticMod1 = false;
var plasticMod1 = false;
var metalGold = false;
var metalSilver = false;
var canvasMod1 = false;
var canvasMod2 = false;
var leather
var meshPlane, lightP, lightA;
var textureCube = textureCubeWhite;
var diffuseMap;
var specularMap;
var roughnessMap;
var aoMap;
var normalMap;
let clock = new THREE.Clock();
let delta = 0;
let interval = 1 / 60;

var loaderStadium = new THREE.CubeTextureLoader();
loaderStadium.setPath('cubemaps/stadium/');

var textureCubeStadium = loaderStadium.load([
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
]);

var loaderWhite = new THREE.CubeTextureLoader();
loaderWhite.setPath('cubemaps/white/');

var textureCubeWhite = loaderWhite.load([
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
]);

var vs1 = document.getElementById("vertex1").textContent;
var fs1 = document.getElementById("fragment1").textContent;


document.getElementById("envMap").onclick = function () { envMap = true; };
document.getElementById("norPre").onclick = function () { norPre = true; };
document.getElementById("plasticMod1").onclick = function () { plasticMod1 = true; };
document.getElementById("plasticMod2").onclick = function () { plasticMod2 = true; };
document.getElementById("metalGold").onclick = function () { metalGold = true; };
document.getElementById("metalSilver").onclick = function () { metalSilver = true; };
document.getElementById("tela1").onclick = function () { canvasMod1 = true; };
document.getElementById("tela2").onclick = function () { canvasMod2 = true; };

function update() {
    requestAnimationFrame(update);
    delta += clock.getDelta();

    if (delta > interval) {
        render();
        delta = delta % interval;
    }
}

function render() {
    stats.update();
    changeEnv();
    changeMaterial();
    controls.update();
    renderer.render(scene, camera);
}

function loadTexture(file) {
    var texture = new THREE.TextureLoader().load(file, function (texture) {

        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.anisotropy = renderer.getMaxAnisotropy();
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.needsUpdate = true;
        render();
    })
    return texture;
}

function init() {
    var canvas = document.getElementById("myCanvasId");
    let box = document.querySelector('.product-pic');
    let canvasWidth = box.offsetWidth;
    let canvasHeight = box.offsetHeight;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 1, 200);
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    ourMaterial = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        color: 0x696969
    });
    loader = new THREE.OBJLoader();
    loader.load("model/football2.obj", function (group) {
        geometry = group.children[0].geometry;
        geometry.center();
        mesh = new THREE.Mesh(geometry, ourMaterial);
        mesh.scale.multiplyScalar(4);
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        scene.add(mesh);
    });

    addPlaneAndLight();

    controls.minDistance = 30;
    controls.maxDistance = 100;
    controls.enablePan = false;

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    camera.position.z = 100;
    camera.position.y = 50;

    ourMaterial.needsUpdate = true;
}

function addPlaneAndLight() {
    var geometryPlane = new THREE.PlaneGeometry(1000, 1000);
    var materialPlane = new THREE.MeshLambertMaterial({
        side: THREE.BackSide,
        color: 0xffffff
    });
    meshPlane = new THREE.Mesh(geometryPlane, materialPlane);
    meshPlane.castShadow = false;
    meshPlane.receiveShadow = true;
    scene.add(meshPlane);
    meshPlane.position.set(0, -35, 0);
    meshPlane.rotation.set(Math.PI / 2, 0, 0);

    lightP = new THREE.SpotLight(0xe1dfdf);
    scene.add(lightP);
    lightP.position.set(0, 600, 0);

    lightA = new THREE.AmbientLight(0xe1dfdf);
    scene.add(lightA);

    lightP.castShadow = true;
    lightP.shadow.camera.near = 600;
    lightP.shadow.camera.far = 650;
    lightP.shadow.mapSize.width = 5012;
    lightP.shadow.mapSize.height = 5012;
    lightP.shadow.bias = 0.0001;

    textureCube = textureCubeWhite;
    scene.background = textureCubeWhite;
}

function presentNormal() {
    scene.add(meshPlane);
    textureCube = textureCubeWhite;
    scene.background = textureCube;
    mesh.material = new THREE.ShaderMaterial({ uniforms: applyMaterial(diffuseMap, specularMap, roughnessMap, normalMap, aoMapMetal, textureCube), vertexShader: vs1, fragmentShader: fs1 });
}

function presentEnv() {
    textureCube = textureCubeStadium;
    scene.remove(meshPlane);
    scene.background = textureCube;
    mesh.material = new THREE.ShaderMaterial({ uniforms: applyMaterial(diffuseMap, specularMap, roughnessMap, normalMap, aoMapMetal, textureCube), vertexShader: vs1, fragmentShader: fs1 });
}

function changeEnv() {
    if (envMap == true) {
        envMap = false;
        presentEnv();
    }
    if (norPre == true) {
        norPre = false;
        presentNormal();
    }
}

function changeMaterial() {
    if (plasticMod1 == true) {
        plasticMod1 = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyMaterial(diffuseMapPlastic1, specularMapPlastic, roughnessMapPlastic, normalMapPlastic, aoMapPlastic, textureCube), vertexShader: vs1, fragmentShader: fs1 });
        diffuseMap = diffuseMapPlastic1;
        specularMap = specularMapPlastic;
        roughnessMap = roughnessMapPlastic;
        normalMap = normalMapPlastic;
        aoMap = aoMapPlastic;
    }
    if (plasticMod2 == true) {
        plasticMod2 = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyMaterial(diffuseMapPlastic2, specularMapPlastic, roughnessMapPlastic, normalMapPlastic, aoMapPlastic, textureCube), vertexShader: vs1, fragmentShader: fs1 });
        diffuseMap = diffuseMapPlastic2;
        specularMap = specularMapPlastic;
        roughnessMap = roughnessMapPlastic;
        normalMap = normalMapPlastic;
        aoMap = aoMapPlastic;
    }
    if (metalGold == true) {
        metalGold = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyMaterial(diffuseMapMetalGold, specularMapMetal, roughnessMapMetal, normalMapMetal, aoMapMetal, textureCube), vertexShader: vs1, fragmentShader: fs1 });
        diffuseMap = diffuseMapMetalGold;
        specularMap = specularMapMetal;
        roughnessMap = roughnessMapMetal;
        normalMap = normalMapMetal;
        aoMap = aoMapMetal;
    }
    if (metalSilver == true) {
        metalSilver = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyMaterial(diffuseMapMetalSilver, specularMapMetal, roughnessMapMetal, normalMapMetal, aoMapMetal, textureCube), vertexShader: vs1, fragmentShader: fs1 });
        diffuseMap = diffuseMapMetalSilver;
        specularMap = specularMapMetal;
        roughnessMap = roughnessMapMetal;
        normalMap = normalMapMetal;
        aoMap = aoMapMetal;
    }
    if (canvasMod1 == true) {
        canvasMod1 = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyMaterial(diffuseMapCanvas1, specularMapCanvas, roughnessMapCanvas, normalMapCanvas, aoMapMetal, textureCube), vertexShader: vs1, fragmentShader: fs1 });
        diffuseMap = diffuseMapCanvas1;
        specularMap = specularMapCanvas;
        roughnessMap = roughnessMapCanvas;
        normalMap = normalMapCanvas;
        aoMap = aoMapMetal;
    }
    if (canvasMod2 == true) {
        canvasMod2 = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyMaterial(diffuseMapCanvas2, specularMapCanvas, roughnessMapCanvas, normalMapCanvas, aoMapCanvas, textureCube), vertexShader: vs1, fragmentShader: fs1 });
        diffuseMap = diffuseMapCanvas2;
        specularMap = specularMapCanvas;
        roughnessMap = roughnessMapCanvas;
        normalMap = normalMapCanvas;
        aoMap = aoMapCanvas;
    }

}