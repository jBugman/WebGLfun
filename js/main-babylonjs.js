var canvas = document.getElementById("renderCanvas");

var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
	var labColor = new BABYLON.Color3(230 / 255, 188 / 255, 9 / 255);

	var scene = new BABYLON.Scene(engine);
	scene.clearColor = labColor;

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
	camera.setPosition(new BABYLON.Vector3(5, 5, 5));
	camera.attachControl(canvas, false);

	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.75;

	var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
	light0.diffuse = labColor;
	light0.specular = labColor;
	light.intensity = 0.75;

	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 2, scene);
	sphere.position.y = 1;
	sphere.position.z = -1;
	sphere.material = new BABYLON.StandardMaterial("texture1", scene);
	sphere.material.bumpTexture = new BABYLON.Texture("img/normalmap.jpg", scene);

	var knot = BABYLON.Mesh.CreateTorusKnot("knot", 0.8, 0.1, 128, 64, 1, 3, scene);
	knot.position.x = 1.5;
	knot.position.z = 1.5;

	var paperman;
	BABYLON.SceneLoader.ImportMesh("", "paperMan/", "paperMan.babylon", scene, function(newMeshes, particleSystems, skeletons) {
		paperman = newMeshes[0];
		for(var i = 0; i < newMeshes.length; i++) {
			newMeshes[i].scaling.x = newMeshes[i].scaling.y = newMeshes[i].scaling.z = 0.2;
			newMeshes[i].rotation.y = 4.6;
			newMeshes[i].position = new BABYLON.Vector3(-3, 0, 0);
		}
		paperman.material.diffuseTexture = new BABYLON.Texture("paperMan/paperMan.png", scene);
	});

	return scene;
};

var scene = createScene();

engine.runRenderLoop(function() {
	scene.render();
});

window.addEventListener("resize", engine.resize);
