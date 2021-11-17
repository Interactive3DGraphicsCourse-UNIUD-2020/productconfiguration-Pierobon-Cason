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

function applyMaterial(diffuseMapPar, specularMapPar, roughnessMapPar, normalMapPar, textureCubePar) {
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