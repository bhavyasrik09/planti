import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.145.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.145.0/examples/jsm/loaders/GLTFLoader.js';

// Handle plant identification
document.getElementById('upload-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const fileInput = document.getElementById('plant-image');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload an image.");
    return;
  }

  // Mocking plant identification (replace with actual API call)
  const plantResult = document.getElementById('plant-result');
  plantResult.innerHTML = "<p>Identifying...</p>";

  setTimeout(() => {
    plantResult.innerHTML = "<p><strong>Result:</strong> Monstera Deliciosa</p>";
  }, 2000);
});

// Handle 3D Model viewer
function load3DModel(modelPath) {
  const container = document.getElementById('3d-container');
  container.innerHTML = ''; // Clear previous content

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  loader.load(modelPath, function(gltf) {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  }, undefined, function(error) {
    console.error(error);
  });

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

document.getElementById('plant-selector').addEventListener('change', function() {
  const selectedPlant = this.value;
  load3DModel(`assets/models/${selectedPlant}`);
});

// Load initial model
load3DModel('assets/models/monstera.glb');



