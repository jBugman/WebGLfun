var canvas = document.getElementById("renderCanvas");

var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
	var scene = new BABYLON.Scene(engine);

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
	camera.setPosition(new BABYLON.Vector3(5, 5, 5));
	camera.attachControl(canvas, false);

	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.75;

	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
	sphere.position.y = 1;
	sphere.position.z = -1;

	var box = BABYLON.Mesh.CreateBox("box", 1.5, scene);
	box.position.x = -3;

	var knot = BABYLON.Mesh.CreateTorusKnot("knot", 0.8, 0.1, 128, 64, 1, 3, scene);
	knot.position.x = 1.5;
	knot.position.z = 1.5;

	return scene;
};

var scene = createScene();

engine.runRenderLoop(function() {
	scene.render();
});

window.addEventListener("resize", engine.resize);
