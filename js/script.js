var canvas = document.getElementById("renderCanvas");

var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
	var labColor = new BABYLON.Color3(0.9, 0.737, 0.035);

	var scene = new BABYLON.Scene(engine);
	scene.clearColor = labColor;

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
	camera.setPosition(new BABYLON.Vector3(5, 5, 5));
	camera.attachControl(canvas, false);

	var light = new BABYLON.HemisphericLight("SkyLight", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.75;

	var pointLight = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(4, 3, 3.5), scene);
	pointLight.diffuse = labColor;
	pointLight.specular = labColor;
	pointLight.intensity = 0.75;

	var box = BABYLON.Mesh.CreateBox("Box", 2.5, scene);

	return scene;
};

var scene = createScene();

engine.runRenderLoop(function() {
	scene.render();
});

window.addEventListener("resize", function() {
	engine.resize();
});
