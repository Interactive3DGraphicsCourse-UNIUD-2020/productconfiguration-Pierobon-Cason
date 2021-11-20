var stats, controls, renderer, scene, camera, loader, ourMaterial;
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
var textureCube;
var diffuseMap;
var specularMap;
var roughnessMap;
var normalMap;
var vs, fs;
//memorizza il tempo
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

var loaderStadiumIrra = new THREE.CubeTextureLoader();
loaderStadiumIrra.setPath('cubemaps/stadiumIrradiance/');

var textureCubeStadiumIrra = loaderStadiumIrra.load([
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
]);

var vsRefle = document.getElementById("vertex-reflection").textContent;
var fsRefle = document.getElementById("fragment-reflection").textContent;
var vsNoRefle = document.getElementById("vertex-noreflection").textContent;
var fsNoRefle = document.getElementById("fragment-noreflection").textContent;
var vsNormal = document.getElementById("vertex-normalBackground").textContent;
var fsNormal = document.getElementById("fragment-normalBackground").textContent;

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
    //questo ciclo è responsabile di dettare gli fps, e senza questo if, che gli imposta a 60, tutta la scena laggherebbe, se il delta supera 1/60, quindi 
    //sono passati 1/60 di secondo, passa. Una volta passati si fa il render() e si calcola il modulo di delta e interval così da poter ricalcolare il tutto
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

//funzione responsabile di caricare le immagini come texture
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

//funzione init che inizializza
function init() {
    //si setta la finestra del render, in base alla grandezza del canvas
    var canvas = document.getElementById("myCanvasId");
    let box = document.querySelector('.product-pic');
    let canvasWidth = box.offsetWidth;
    let canvasHeight = box.offsetHeight;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 1, 200);
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    //si aggiungono i controlli orbitali
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    //aggiunta ombre nel renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    //aggiunta tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    textureCube = textureCubeStadium;
    //aggiunta oggetto 3d con come materiale il primo tipo di plastica e sfondo bianco
    var ourMaterial = new THREE.ShaderMaterial({ uniforms: applyShaderUniforms(diffuseMapMetalGold, specularMapMetal, roughnessMapMetal, normalMapMetal, textureCube), vertexShader: vs, fragmentShader: fs });
    loader = new THREE.OBJLoader();
    loader.load("model/football2.obj", function (group) {
        geometry = group.children[0].geometry;
        geometry.center();
        mesh = new THREE.Mesh(geometry, ourMaterial);
        mesh.scale.multiplyScalar(4);
        //si imposta che trasmette ombre ma non le riceve
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        scene.add(mesh);
    });

    addPlaneAndLight();

    controls.minDistance = 30;
    controls.maxDistance = 100;
    controls.enablePan = false;

    //si aggiungono le statistiche riguardo gli fps
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    camera.position.z = 100;
    camera.position.y = 50;

    //altrimenti darà errore se si cambierà il materiale
    ourMaterial.needsUpdate = true;

    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
}

//si aggiunge un piano per far vedere l'ombra, nel caso di ambiente bianco, e una luce di tipo spotLight
function addPlaneAndLight() {
    var geometryPlane = new THREE.PlaneGeometry(1000, 1000);
    var materialPlane = new THREE.MeshLambertMaterial({
        side: THREE.BackSide,
        color: 0xffffff
    });
    meshPlane = new THREE.Mesh(geometryPlane, materialPlane);
    //il piano può ricevere le luci ma non le trasmette
    meshPlane.castShadow = false;
    meshPlane.receiveShadow = true;
    
    meshPlane.position.set(0, -35, 0);
    meshPlane.rotation.set(Math.PI / 2, 0, 0);

    lightP1 = new THREE.SpotLight(0xffffff);
    scene.add(lightP1);
    lightP1.position.set(0, 600, 0);

    lightP2 = new THREE.SpotLight(0xffffff);
    
    lightP2.position.set(0, 400, -100.0);

    lightP3 = new THREE.SpotLight(0xffffff);
    
    lightP3.position.set(0, 400, 100.0);

    ambientLight = new THREE.AmbientLight(0xffffff,0.4);

    //la luce spotLight sarà responsabile di creare le ombre
    lightP1.castShadow = true;
    lightP1.shadow.camera.near = 600;
    lightP1.shadow.camera.far = 650;
    lightP1.shadow.mapSize.width = 5012;
    lightP1.shadow.mapSize.height = 5012;
    lightP1.shadow.bias = 0.0001;

    scene.background = textureCube;
}

//verifica se si vuole cambiare l'ambiente
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

//cambia il materiale
function changeMaterial() {
    if (plasticMod1 == true) {
        plasticMod1 = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyShaderUniforms(diffuseMapPlastic1, specularMapPlastic, roughnessMapPlastic, normalMapPlastic, textureCube), vertexShader: vs, fragmentShader: fs });
    }
    if (plasticMod2 == true) {
        plasticMod2 = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyShaderUniforms(diffuseMapPlastic2, specularMapPlastic, roughnessMapPlastic, normalMapPlastic, textureCube), vertexShader: vs, fragmentShader: fs });
    }
    if (metalGold == true) {
        metalGold = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyShaderUniforms(diffuseMapMetalGold, specularMapMetal, roughnessMapMetal, normalMapMetal, textureCube), vertexShader: vs, fragmentShader: fs });
    }
    if (metalSilver == true) {
        metalSilver = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyShaderUniforms(diffuseMapMetalSilver, specularMapMetal, roughnessMapMetal, normalMapMetal, textureCube), vertexShader: vs, fragmentShader: fs });
    }
    if (canvasMod1 == true) {
        canvasMod1 = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyShaderUniforms(diffuseMapCanvas1, specularMapCanvas, roughnessMapCanvas, normalMapCanvas, textureCube), vertexShader: vs, fragmentShader: fs });
    }
    if (canvasMod2 == true) {
        canvasMod2 = false;
        mesh.material = new THREE.ShaderMaterial({ uniforms: applyShaderUniforms(diffuseMapCanvas2, specularMapCanvas, roughnessMapCanvas, normalMapCanvas, textureCube), vertexShader: vs, fragmentShader: fs });
    }
}

//cambia l'ambiente nello sfondo bianco
function presentNormal() {
    scene.add(meshPlane);
    scene.add(lightP2);
    scene.add(lightP3);
    scene.add(ambientLight);
    textureCube = textureCubeWhite;
    scene.background = textureCube;
    mesh.material = new THREE.ShaderMaterial({ uniforms: applyShaderUniforms(diffuseMap, specularMap, roughnessMap, normalMap, textureCube), vertexShader: vs, fragmentShader: fs });
}

//cambia l'ambiente nello sfondo stadio
function presentEnv() {
    scene.remove(lightP2);
    scene.remove(lightP3);
    scene.remove(meshPlane);
    scene.remove(ambientLight);
    textureCube = textureCubeStadium;
    scene.background = textureCube;
    mesh.material = new THREE.ShaderMaterial({ uniforms: applyShaderUniforms(diffuseMap, specularMap, roughnessMap, normalMap, textureCube), vertexShader: vs, fragmentShader: fs });
}
