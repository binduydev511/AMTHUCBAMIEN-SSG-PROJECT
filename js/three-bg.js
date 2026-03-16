/**
 * Three.js 3D Background for Ẩm thực Ba Miền
 * Renders realistic 3D geometries (bowls, cups, bread) for a premium experience.
 */

let scene, camera, renderer, container;
let dishes = [];

const dishData = [
    {
        url: 'assets/images/floating_pho_bowl_1773138715905.png',
        type: 'bowl',
        size: 5,
        baseColor: 0xffffff, // White ceramic
        pos: { x: 10, y: 5, z: -50 }
    },
    {
        url: 'assets/images/floating_banh_mi_1773138734373.png',
        type: 'bread',
        size: 3.5,
        baseColor: 0x8b4513, // Toasty brown side
        pos: { x: -12, y: -4, z: -80 }
    },
    {
        url: 'assets/images/floating_spring_rolls_1773138751072.png',
        type: 'plate',
        size: 3,
        baseColor: 0xf5f5f5, // Off-white plate
        pos: { x: 15, y: -8, z: -110 }
    },
    {
        url: 'assets/images/floating_coffee_filter_1773138773879.png',
        type: 'cup',
        size: 2.2,
        baseColor: 0xcccccc, // Silver/Glass feel
        pos: { x: -15, y: 10, z: -140 }
    }
];

function initThree() {
    container = document.getElementById('three-canvas-container');
    if (!container) return;

    // Scene
    scene = new THREE.Scene();

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.z = 15;

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(10, 10, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4a373, 0.5); // Warm spotlight
    dirLight2.position.set(-10, -10, 5);
    scene.add(dirLight2);

    const loader = new THREE.TextureLoader();

    dishData.forEach((data) => {
        loader.load(data.url, (texture) => {
            let geometry;
            let mesh;

            // Create specific geometries based on food type
            if (data.type === 'bowl' || data.type === 'plate') {
                // Circle bowl/plate
                const radius = data.size / 2;
                const height = data.type === 'bowl' ? 1.5 : 0.3;
                geometry = new THREE.CylinderGeometry(radius, radius * 0.7, height, 32);

                // Materials: top, side, bottom
                const faceMaterial = createFoodMaterial(texture);
                const ceramicMaterial = new THREE.MeshStandardMaterial({
                    color: data.baseColor,
                    roughness: 0.1,
                    metalness: 0
                });

                const materials = [ceramicMaterial, faceMaterial, ceramicMaterial];
                mesh = new THREE.Mesh(geometry, materials);
                mesh.rotation.x = Math.PI / 2; // Flat for fly-in
            }
            else if (data.type === 'cup') {
                // Coffee cup
                const radius = data.size / 2;
                geometry = new THREE.CylinderGeometry(radius, radius, 2, 32);

                const faceMaterial = createFoodMaterial(texture);
                const metalMaterial = new THREE.MeshStandardMaterial({
                    color: data.baseColor,
                    roughness: 0.2,
                    metalness: 0.8
                });

                const materials = [metalMaterial, faceMaterial, metalMaterial];
                mesh = new THREE.Mesh(geometry, materials);
            }
            else {
                // Boxy food (Banh Mi)
                geometry = new THREE.BoxGeometry(data.size * 2, data.size, 0.5);
                const faceMaterial = createFoodMaterial(texture);
                const breadMaterial = new THREE.MeshStandardMaterial({ color: data.baseColor });

                const materials = [
                    breadMaterial, breadMaterial, breadMaterial, breadMaterial,
                    faceMaterial, faceMaterial
                ];
                mesh = new THREE.Mesh(geometry, materials);
            }

            resetMesh(mesh, data.pos.x, data.pos.y, -100 - Math.random() * 50);

            mesh.userData = {
                speedZ: 0.15 + Math.random() * 0.25,
                rotX: (Math.random() - 0.5) * 0.02,
                rotY: (Math.random() - 0.5) * 0.02,
                rotZ: (Math.random() - 0.5) * 0.01,
                originX: data.pos.x,
                originY: data.pos.y
            };

            scene.add(mesh);
            dishes.push(mesh);
        });
    });

    window.addEventListener('resize', onWindowResize);
    animate();
}

function createFoodMaterial(texture) {
    const mat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.5,
        metalness: 0
    });

    // GPU-accelerated background removal (White -> Alpha)
    mat.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <map_fragment>',
            `
            #include <map_fragment>
            // Improved white detection for cleaner edges
            float whiteLimit = 0.85;
            if (diffuseColor.r > whiteLimit && diffuseColor.g > whiteLimit && diffuseColor.b > whiteLimit) {
                discard;
            }
            `
        );
    };
    return mat;
}

function resetMesh(mesh, x, y, z) {
    mesh.position.set(x, y, z);
    mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
}

function onWindowResize() {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);

    dishes.forEach(mesh => {
        const u = mesh.userData;

        // Flight towards camera
        mesh.position.z += u.speedZ;

        // Tumbling in 3D space
        mesh.rotation.x += u.rotX;
        mesh.rotation.y += u.rotY;
        mesh.rotation.z += u.rotZ;

        // Reset
        if (mesh.position.z > 20) {
            mesh.position.z = -200 - Math.random() * 50;
        }
    });

    renderer.render(scene, camera);
}

window.addEventListener('load', initThree);
