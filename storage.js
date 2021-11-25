//plastic
var diffuseMapPlastic1 = loadTexture("texture/plastic/plasticColor1.jpg");
var diffuseMapPlastic2 = loadTexture("texture/plastic/plasticColor2.jpg");

var specularMapPlastic = loadTexture("texture/plastic/plasticSpec.jpg");
var roughnessMapPlastic = loadTexture("texture/plastic/plasticRough.jpg");
var normalMapPlastic = loadTexture("texture/plastic/plasticNormal.jpg");

//metal
var diffuseMapMetalGold = loadTexture("texture/metal/metalGold.jpg");
var diffuseMapMetalSilver = loadTexture("texture/metal/metalSilver.jpg");

var specularMapMetal = loadTexture("texture/metal/metalSpec.jpg");
var roughnessMapMetal = loadTexture("texture/metal/metalRough1.jpg");
var normalMapMetal = loadTexture("texture/plastic/metalNormal.jpg");

//canvas
var diffuseMapCanvas1 = loadTexture("texture/canvas/canvasColor1.jpg");
var diffuseMapCanvas2 = loadTexture("texture/canvas/canvasColor2.jpg");

var specularMapCanvas = loadTexture("texture/canvas/canvasSpec.jpg");
var roughnessMapCanvas = loadTexture("texture/canvas/canvasRough.jpg");
var normalMapCanvas = loadTexture("texture/canvas/canvasNormal.jpg");

//crea uniforms nel caso in cui il materiale dovrebbe riflettere l'ambiente (plastica e metallo)
function applyMaterialRad(diffuseMapPar, specularMapPar, roughnessMapPar, normalMapPar, textureCubePar) {
    diffuseMap = diffuseMapPar;
    specularMap = specularMapPar;
    roughnessMap = roughnessMapPar;
    normalMap = normalMapPar;

    var uniforms = {
        specularMap: { type: "t", value: specularMapPar },
        diffuseMap: { type: "t", value: diffuseMapPar },
        roughnessMap: { type: "t", value: roughnessMapPar },
        pointLightPosition: { type: "v3", value: new THREE.Vector3(0.0, 600.0, 0.0) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        textureRepeat: { type: "v2", value: new THREE.Vector2(1, 1) },
        normalMap: { type: "t", value: normalMapPar },
        normalScale: { type: "v2", value: new THREE.Vector2(0.2, 0.2) },
        envMap: { type: "t", value: textureCubePar },
    };
    return uniforms;
}

//crea uniforms nel caso in cui il materiale non dovrebbe riflettere l'ambiente (tela)
function applyMaterialIrra(diffuseMapPar, specularMapPar, roughnessMapPar, normalMapPar, irradianceMap) {
    diffuseMap = diffuseMapPar;
    specularMap = specularMapPar;
    roughnessMap = roughnessMapPar;
    normalMap = normalMapPar;

    var uniforms = {
        diffuseMap: { type: "t", value: diffuseMapPar },
        normalMap: { type: "t", value: normalMapPar },
        normalScale: { type: "v2", value: new THREE.Vector2(1, 1) },
        textureRepeat: { type: "v2", value: new THREE.Vector2(1, 1) },
        pointLightPosition: { type: "v3", value: new THREE.Vector3(0.0, 600.0, 0.0) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        irradianceMap: { type: "t", value: irradianceMap },
        roughnessMap: { type: "t", value: roughnessMapPar },
        specularMap: { type: "t", value: specularMapPar },
    };
    return uniforms;
}

//creazione uniforms quando sfondo bianco
function applyMaterialOnlyLight(diffuseMapPar, specularMapPar, roughnessMapPar, normalMapPar) {
    diffuseMap = diffuseMapPar;
    specularMap = specularMapPar;
    roughnessMap = roughnessMapPar;
    normalMap = normalMapPar;

    var uniforms = {
        diffuseMap: { type: "t", value: diffuseMapPar },
        normalMap: { type: "t", value: normalMapPar },
        normalScale: { type: "v2", value: new THREE.Vector2(0.2, 0.2) },
        textureRepeat: { type: "v2", value: new THREE.Vector2(1, 1) },
        roughnessMap: { type: "t", value: roughnessMapPar },
        specularMap: { type: "t", value: specularMapPar },

        //se voglio applicare una luce meno bianca (0xe1dfdf), uso il codice nei commenti
        pointLightPosition1: { type: "v3", value: new THREE.Vector3(0.0, 600.0, 0.0) },
        //clight1: { type: "v3", value: new THREE.Vector3(0.88, 0.87, 0.88) },
        clight1: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        pointLightPosition2: { type: "v3", value: new THREE.Vector3(0.0, 400.0, -100.0) },
        //clight2: { type: "v3", value: new THREE.Vector3(0.88, 0.87, 0.88) },
        clight2: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        pointLightPosition2: { type: "v3", value: new THREE.Vector3(0.0, 400.0, 100.0) },
        //clight3: { type: "v3", value: new THREE.Vector3(0.88, 0.87, 0.88) },
        clight3: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        //ambientLight: { type: "v3", value: new THREE.Vector3(0.88, 0.87, 0.88) },
        ambientLight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
    };
    return uniforms;
}

//applico il textureCube e Vertex/Fragment shader in base alla situazione
function applyShaderUniforms(diffuseMapPar, specularMapPar, roughnessMapPar, normalMapPar, textureCube){
    if(textureCube == textureCubeWhite){
        vs = vsNormal; fs = fsNormal;
        return applyMaterialOnlyLight(diffuseMapPar, specularMapPar, roughnessMapPar, normalMapPar);
    }
    if(diffuseMapPar == diffuseMapCanvas1 || diffuseMapPar == diffuseMapCanvas2 || diffuseMapPar == diffuseMapPlastic1 || diffuseMapPar == diffuseMapPlastic2){
        textureCube = textureCubeStadiumIrra;
        vs = vsNoRefle; fs = fsNoRefle;
        return applyMaterialIrra(diffuseMapPar, specularMapPar, roughnessMapPar, normalMapPar, textureCube);
    }
    textureCube = textureCubeStadium;
    vs = vsRefle; fs = fsRefle;
    return applyMaterialRad(diffuseMapPar, specularMapPar, roughnessMapPar, normalMapPar, textureCube);
}



