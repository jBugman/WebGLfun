var canvas = document.getElementById("renderCanvas");

var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
	var scene = new BABYLON.Scene(engine);

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
	camera.setPosition(new BABYLON.Vector3(5, 5, 5));
	camera.attachControl(canvas, false);

	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.75;

	var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
	light0.diffuse = new BABYLON.Color3(1, 0, 0);
	light0.specular = new BABYLON.Color3(1, 1, 1);

	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 2, scene);
	sphere.position.y = 1;
	sphere.position.z = -1;
	sphere.material = new BABYLON.StandardMaterial("texture1", scene);
	sphere.material.bumpTexture = new BABYLON.Texture("img/normalmap.jpg", scene);

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
