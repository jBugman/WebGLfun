var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x555555, 1);
document.body.appendChild(renderer.domElement);

// var texture = new THREE.ImageUtils.loadTexture("texture.jpg");

// var plane = new THREE.Mesh(
// 	new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
// 	new THREE.MeshBasicMaterial({color: 0x555555})
// );
// scene.add(plane);

// var geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
// // var material = new THREE.MeshBasicMaterial({
// // 	color: 0x00ff00
// var material = new THREE.MeshPhongMaterial({
// 	map: texture,
// 	side: THREE.DoubleSide
// });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

var paperman = new THREE.Mesh();
var skin;

// var loader = new THREE.ColladaLoader();
// loader.options.convertUpAxis = true;
// loader.load("paperMan/paperman.dae", function(collada) {
// 	paperman = collada.scene;
// 	paperman.scale.x = paperman.scale.y = paperman.scale.z = 0.3;
// 	paperman.position.set(0.0, 3.5, 0.0);
// 	paperman.rotation.x = 0.3;
//
// 	skin = collada.skins[0];
//
// 	// paperman.children[0].material = new THREE.MeshBasicMaterial({color: 0xff0000});
//
// 	scene.add(paperman);
// });

var setupPaperman = function(object) {
	paperman = object;
	paperman.scale.x = paperman.scale.y = paperman.scale.z = 0.3;
	paperman.position.set(0.0, 3.5, 0.0);
	paperman.rotation.x = 0.3;
	scene.add(paperman);
}

// var texture = new THREE.ImageUtils.loadTexture("paperMan/paperMan.png");
// var material = new THREE.MeshLambertMaterial({
// 	map: texture,
// 	side: THREE.DoubleSide
// });

var loader = new THREE.OBJLoader();
loader.load('paperMan/paperMan.obj', function(object) {

	object.traverse( function (child) {
		console.log(child);
	          if ( child instanceof THREE.Mesh ) {
				  console.log(true);
	              child.material.map = THREE.ImageUtils.loadTexture("paperMan/paperMan.png");
				  // child.material = material;
	              // child.material.needsUpdate = true;
	          }
	      });

	setupPaperman(object);
	// paperman = object;
	// paperman.scale.x = paperman.scale.y = paperman.scale.z = 0.3;
	// paperman.position.set(0.0, 3.5, 0.0);
	// paperman.rotation.x = 0.3;
	// scene.add(paperman);
});

camera.position.set(0, 6, 6);

var ambientLight = new THREE.AmbientLight(0x101010, 0.2);
scene.add(ambientLight);

// var light = new THREE.PointLight(0xff0000, 1, 100);
// light.position.set(50, 50, 50);
// scene.add(light);

var directionalLight = new THREE.PointLight(0xffffff, 1.0, 10);
// directionalLight.position = camera.position;
directionalLight.position.set(-1, 6.0, 3.0);
scene.add(directionalLight);


function render() {
	requestAnimationFrame(render);

	// paperman.rotation.x += 0.01;
	paperman.rotation.y += 0.01;

	renderer.render(scene, camera);
}
render();

renderer.render(scene, camera);

// window.addEventListener('mousemove', function(e) {
// 	var mouseX = (e.clientX - window.innerWidth / 2);
// 	var mouseY = (e.clientY - window.innerHeight / 2);
// 	cube.rotation.x = mouseY * 0.005;
// 	cube.rotation.y = mouseX * 0.005;
//
// 	renderer.render(scene, camera);
// }, false);
