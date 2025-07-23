const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planets = [];
const planetData = [
    { name: 'Mercury', distance: 2, speed: 0.1, color: 0xaaaaaa },
    { name: 'Venus', distance: 3, speed: 0.07, color: 0xffcc00 },
    { name: 'Earth', distance: 4, speed: 0.05, color: 0x0000ff },
    { name: 'Mars', distance: 5, speed: 0.04, color: 0xff0000 },
    { name: 'Jupiter', distance: 6, speed: 0.02, color: 0xffa500 },
    { name: 'Saturn', distance: 7, speed: 0.015, color: 0xffd700 },
    { name: 'Uranus', distance: 8, speed: 0.01, color: 0x00ffff },
    { name: 'Neptune', distance: 9, speed: 0.008, color: 0x00008b }
];

planetData.forEach(data => {
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: data.color });
    const planet = new THREE.Mesh(geometry, material);
    planet.userData = { speed: data.speed };
    planets.push(planet);
    scene.add(planet);
});

function positionPlanets() {
    planets.forEach((planet, index) => {
        const angle = Date.now() * 0.001 * planet.userData.speed;
        planet.position.x = Math.cos(angle) * planetData[index].distance;
        planet.position.z = Math.sin(angle) * planetData[index].distance;
    });
}

function animate() {
    requestAnimationFrame(animate);
    positionPlanets();
    renderer.render(scene, camera);
}

document.getElementById('mercury-speed').addEventListener('input', (event) => {
    planets[0].userData.speed = event.target.value;
});

camera.position.z = 10;
animate();
