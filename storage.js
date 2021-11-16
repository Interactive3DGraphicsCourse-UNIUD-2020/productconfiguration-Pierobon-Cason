//plastic
var diffuseMapPlastic1 = loadTexture("texture/plastic/plasticColor1.jpg");
var diffuseMapPlastic2 = loadTexture("texture/plastic/plasticColor2.jpg");

var specularMapPlastic = loadTexture("texture/plastic/plasticSpec.jpg");
var roughnessMapPlastic = loadTexture("texture/plastic/plasticRough.jpg");
var normalMapPlastic = loadTexture("texture/plastic/plasticNormal.jpg");
var aoMapPlastic = loadTexture("texture/plastic/plasticAO.jpg");

//metal
var diffuseMapMetalGold = loadTexture("texture/metal/metalGold.jpg");
var diffuseMapMetalSilver = loadTexture("texture/metal/metalSilver.jpg");

var specularMapMetal = loadTexture("texture/metal/metalSpec.jpg");
var roughnessMapMetal = loadTexture("texture/metal/metalRough1.jpg");
var normalMapMetal = loadTexture("texture/plastic/metalNormal.jpg");
var aoMapMetal = loadTexture("texture/plastic/metalAO.jpg");

//canvas
var diffuseMapCanvas1 = loadTexture("texture/canvas/canvasColor1.jpg");
var diffuseMapCanvas2 = loadTexture("texture/canvas/canvasColor2.jpg");

var specularMapCanvas = loadTexture("texture/canvas/canvasSpec.jpg");
var roughnessMapCanvas = loadTexture("texture/canvas/canvasRough.jpg");
var normalMapCanvas = loadTexture("texture/canvas/canvasNormal.jpg");
var aoMapCanvas = loadTexture("texture/canvas/canvasAO.jpg");

var uniformsEnvMap = {
    cspec: { type: "v3", value: new THREE.Vector3(0.8, 0.8, 0.8) },
    normalScale: { type: "v2", value: new THREE.Vector2(1, 1) },
    envMap: { type: "t", value: textureCube },
};

function applyMaterial(diffuseMap, specularMap, roughnessMap, normalMap, aoMap, textureCube) {
    var uniforms = {
        specularMap: { type: "t", value: specularMap },
        diffuseMap: { type: "t", value: diffuseMap },
        roughnessMap: { type: "t", value: roughnessMap },
        pointLightPosition: { type: "v3", value: new THREE.Vector3(0.0, 600.0, 0.0) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        textureRepeat: { type: "v2", value: new THREE.Vector2(1, 1) },
        normalMap: { type: "t", value: normalMap },
        normalScale: { type: "v2", value: new THREE.Vector2(0.2, 0.2) },
        aoMap:	{ type: "t", value: aoMap},
        envMap:	{ type: "t", value: textureCube},
    };
    return uniforms;
}