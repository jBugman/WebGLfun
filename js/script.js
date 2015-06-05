var canvas = document.getElementById("renderCanvas");

var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
	var labColor = new BABYLON.Color3(0.9, 0.737, 0.035);

	var scene = new BABYLON.Scene(engine);
	scene.clearColor = labColor;

	var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
	camera.setPosition(new BABYLON.Vector3(5, 5, 5));
	camera.attachControl(canvas, false);

	var light = new BABYLON.HemisphericLight("skyLight", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.75;

	var pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(4, -3, 3.5), scene);
	pointLight.diffuse = labColor;
	pointLight.specular = labColor;
	pointLight.intensity = 0.75;

	// var dynamicMaterial = new BABYLON.StandardMaterial("dynamicTextureMaterial", scene);
	var box = BABYLON.Mesh.CreateBox("box", 2.5, scene);
	// box.material = dynamicMaterial;

	box.subMeshes = [];
	box.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, box));
	box.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, box));
	box.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, box));
	box.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, box));
	box.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, box));
	box.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, box));

	var angles = [
		Math.PI,  // right
		0,  // left back
		Math.PI / 2,  // left
		Math.PI / 2,
		0,  // top
		0,
	];

	var boxMultiMaterial = new BABYLON.MultiMaterial("cubeMulti", scene);
	for(var i = 0; i < 4; i++) {
		var dynamicTexture = new BABYLON.DynamicTexture("dynamicTexture", 512, scene, true);
		dynamicTexture.drawText("#partyprint", null, 410, "bold 70px ComicSansMS", "#555", "white");
		// dynamicTexture.drawText("#partyprint", null, 200, "bold 70px Arial", "#555", "#fff");
		dynamicTexture.drawText("Монохромная часть + свет", null, 200, "20px Arial", "#555", "transparent");

		dynamicTexture.wAng = angles[i];

		var dynamicMaterial = new BABYLON.StandardMaterial("dynamicTextureMaterial", scene);
		dynamicMaterial.diffuseTexture = dynamicTexture;
		boxMultiMaterial.subMaterials.push(dynamicMaterial);
	}
	var mat = new BABYLON.StandardMaterial("mat", scene);
	mat.diffuseTexture = new BABYLON.Texture("img/texture.png", scene);
	boxMultiMaterial.subMaterials.push(mat);

	box.material = boxMultiMaterial;

	return scene;
};

var scene = createScene();

engine.runRenderLoop(function() {
	scene.render();
});

window.addEventListener("resize", function() {
	engine.resize();
});
