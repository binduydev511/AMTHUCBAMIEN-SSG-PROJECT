let scene, camera, renderer, mapGroup, controls;
let raycaster, mouse;
let currentHover = null;
let labels = [];

// Đăng ký Plugin GSAP ngay từ đầu
gsap.registerPlugin(ScrollTrigger);

const mapContainer = document.getElementById('vietnam-map');
const foodCard = document.getElementById('food-card');
const uiLayer = document.getElementById('ui-layer');

// Bảng màu đặc trưng cho 3 miền (Nền nã, phù hợp với màu gỗ, đất nung, lá cây)
const regionColors = [
    0x8e9e7b, // Xanh lá pastel
    0xd4a373, // Nâu vàng (primary)
    0xe9c46a, // Vàng cát
    0xf4a261, // Cam đất nhạt
    0xe76f51, // Đỏ đất nung nhạt
    0xa8dadc, // Xanh dương pastel
    0x457b9d, // Xanh lam đậm
    0xb5838d, // Tím tro
    0xffb4a2, // Hồng phấn
    0xccd5ae  // Xanh lục nhạt
];

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, mapContainer.clientWidth / mapContainer.clientHeight, 0.1, 1000);
    camera.position.set(108, 16, 30); // Giảm Z từ 40 xuống 30 để to hơn
    camera.lookAt(108, 16, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Nền hoàn toàn trong suốt
    renderer.setSize(mapContainer.clientWidth, mapContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mapContainer.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd4a373, 1);
    pointLight.position.set(105, 15, 20);
    scene.add(pointLight);

    mapGroup = new THREE.Group();
    scene.add(mapGroup);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.enableZoom = false; // Vô hiệu hóa room theo yêu cầu

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    loadMapData();
    animate();

    window.addEventListener('resize', onWindowResize);
    mapContainer.addEventListener('mousemove', onMouseMove);
    mapContainer.addEventListener('click', onMapClick);
    mapContainer.addEventListener('touchstart', onMapClick, { passive: false });
}

function onMapClick(event) {
    // Raycasting trực tiếp tại vị trí click/touch (đặc biệt quan trọng cho Mobile)
    const rect = mapContainer.getBoundingClientRect();
    const clientX = event.clientX || (event.touches ? event.touches[0].clientX : 0);
    const clientY = event.clientY || (event.touches ? event.touches[0].clientY : 0);

    if (clientX === 0 && clientY === 0) return;

    mouse.x = ((clientX - rect.left) / mapContainer.clientWidth) * 2 - 1;
    mouse.y = -((clientY - rect.top) / mapContainer.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(mapGroup.children);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (currentHover && currentHover !== object) resetHighlight(currentHover);
        currentHover = object;
        highlightProvince(object);
        updateFoodCard(object.name);

        const provinceName = object.name;
        console.log('Interacted with province:', provinceName);

        // Nếu click đúp hoặc click lại chính tỉnh đó thì mới chuyển menu (optional)
        // Hiện tại: Chỉ hiện card thông tin là đủ tốt cho Mobile UX
    } else {
        if (currentHover) {
            resetHighlight(currentHover);
            currentHover = null;
            hideFoodCard();
        }
    }
}

// Hàm hỗ trợ trộn chuỗi tạo số nguyên cho thuật toán sinh màu
const hashCode = s => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);

async function loadMapData() {
    try {
        const response = await fetch('assets/data/vn_geo.json');
        const data = await response.json();
        console.log('GeoJSON loaded:', data.features.length, 'features');

        // Bước 1: Tính tâm bản đồ từ tọa độ GeoJSON thô (trước khi scatter)
        let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
        data.features.forEach(feature => {
            const coords = feature.geometry.coordinates;
            const allPolygons = feature.geometry.type === 'MultiPolygon' ? coords : [coords];
            allPolygons.forEach(polygon => {
                polygon[0].forEach(point => {
                    minLon = Math.min(minLon, point[0]);
                    maxLon = Math.max(maxLon, point[0]);
                    minLat = Math.min(minLat, point[1]);
                    maxLat = Math.max(maxLat, point[1]);
                });
            });
        });
        const geoCenter = { x: (minLon + maxLon) / 2, y: (minLat + maxLat) / 2 };
        const geoSpan = Math.max(maxLon - minLon, maxLat - minLat);
        console.log('Geo center:', geoCenter, 'Span:', geoSpan);

        // Bước 2: Tạo geometry cho từng tỉnh
        // Object để lưu trữ tâm thực (từ geometry gốc) của từng tỉnh cho label
        const provinceGeoCenter = {};

        data.features.forEach(feature => {
            const provinceName = feature.properties.name;
            const coordinates = feature.geometry.coordinates;

            if (!provinceGeoCenter[provinceName]) {
                provinceGeoCenter[provinceName] = { sumX: 0, sumY: 0, count: 0 };
            }

            if (feature.geometry.type === 'MultiPolygon') {
                coordinates.forEach(polygon => {
                    drawShape(polygon[0], provinceName);
                    // Tính tâm từ tọa độ gốc
                    polygon[0].forEach(pt => {
                        provinceGeoCenter[provinceName].sumX += pt[0];
                        provinceGeoCenter[provinceName].sumY += pt[1];
                        provinceGeoCenter[provinceName].count++;
                    });
                });
            } else {
                drawShape(coordinates[0], provinceName);
                coordinates[0].forEach(pt => {
                    provinceGeoCenter[provinceName].sumX += pt[0];
                    provinceGeoCenter[provinceName].sumY += pt[1];
                    provinceGeoCenter[provinceName].count++;
                });
            }
        });

        console.log('Total meshes in mapGroup:', mapGroup.children.length);

        // Tạo duy nhất 1 Label HTML tại tâm thực (từ tọa độ gốc) của mỗi tỉnh
        for (const [name, data] of Object.entries(provinceGeoCenter)) {
            if (data.count > 0) {
                const cx = data.sumX / data.count;
                const cy = data.sumY / data.count;
                createLabel(name, new THREE.Vector3(cx, cy, 0.3));
            }
        }

        // Bước 3: Đặt camera dựa trên tâm bản đồ thực (nâng camera lên một chút để dịch bản đồ xuống dưới cho cân đối)
        const camZ = geoSpan * 1.3;
        camera.position.set(geoCenter.x, geoCenter.y + 12.8, camZ); // Cân bằng 1:1 hoàn hảo (Y+12.8) sau khi đo đạc thực tế
        camera.lookAt(geoCenter.x, geoCenter.y, 0);
        controls.target.set(geoCenter.x, geoCenter.y, 0);
        controls.update();
        console.log('Camera set to:', camera.position, 'Target:', controls.target);

        // Bước 4: Hiệu ứng lắp ghép (assembly animation) 
        // Đã được chuyển sang gọi từ main.js thông qua window.playAssemblyAnimation

    } catch (error) {
        console.error('Error loading map:', error);
    }
}

let animationPlayed = false;
window.playAssemblyAnimation = function (force = false) {
    if (animationPlayed && !force) return;
    animationPlayed = true;
    console.log('Playing assembly animation for', mapGroup.children.length, 'meshes');

    // Sắp xếp meshes theo vĩ độ (từ Nam lên Bắc) để tạo hiệu ứng sóng
    const sortedMeshes = [...mapGroup.children].sort((a, b) => {
        a.geometry.computeBoundingBox();
        b.geometry.computeBoundingBox();
        const centerA = new THREE.Vector3();
        const centerB = new THREE.Vector3();
        a.geometry.boundingBox.getCenter(centerA);
        b.geometry.boundingBox.getCenter(centerB);
        return centerA.y - centerB.y;
    });

    const totalMeshes = sortedMeshes.length;
    sortedMeshes.forEach((mesh, index) => {
        // Stagger theo thứ tự vĩ độ: delay tăng dần từ 0 -> 1.5s
        const staggerDelay = (index / totalMeshes) * 1.5;

        // Animate Position - bay về đúng vị trí
        gsap.to(mesh.position, {
            x: 0, y: 0, z: 0,
            duration: 3,
            delay: staggerDelay,
            ease: "power3.out"
        });

        // Animate Rotation - xoay mượt về đúng hướng
        gsap.to(mesh.rotation, {
            x: 0, y: 0, z: 0,
            duration: 3,
            delay: staggerDelay,
            ease: "power3.out"
        });

        // Animate Material Opacity - fade in mượt mà
        gsap.to(mesh.material, {
            opacity: 1,
            duration: 2,
            delay: staggerDelay + 0.3,
            ease: "power2.inOut"
        });

        // Animate Edge line opacity
        if (mesh.children[0] && mesh.children[0].material) {
            gsap.to(mesh.children[0].material, {
                opacity: 0.6,
                duration: 1.5,
                delay: staggerDelay + 1,
                ease: "power2.in"
            });
        }
    });

    // Hiệu ứng hiện nhãn tỉnh thành sau khi bản đồ đã hòm hòm (delay 2.5s)
    labels.forEach((label, index) => {
        gsap.to(label.element, {
            opacity: 1,
            duration: 1,
            delay: 2.5 + (index / labels.length) * 1.0,
            ease: "power2.inOut"
        });
    });
}

window.scatterMap = function () {
    console.log('Scattering map pieces...');
    const scatterRange = 25;
    mapGroup.children.forEach(mesh => {
        mesh.position.set(
            (Math.random() - 0.5) * scatterRange,
            (Math.random() - 0.5) * scatterRange,
            -5 + Math.random() * -15
        );
        mesh.rotation.set(
            (Math.random() - 0.5) * Math.PI * 0.5,
            (Math.random() - 0.5) * Math.PI * 0.5,
            (Math.random() - 0.5) * Math.PI * 0.3
        );
        mesh.material.opacity = 0;
        if (mesh.children[0] && mesh.children[0].material) {
            mesh.children[0].material.opacity = 0;
        }
    });

    // Ẩn nhãn tỉnh thành khi tung mảnh ghép
    labels.forEach(label => {
        label.element.style.opacity = '0';
    });

    // Reset cờ animationPlayed để playAssemblyAnimation có thể kích hoạt lại
    animationPlayed = false;
}

function drawShape(points, name) {
    const shape = new THREE.Shape();
    points.forEach((point, index) => {
        if (index === 0) {
            shape.moveTo(point[0], point[1]);
        } else {
            shape.lineTo(point[0], point[1]);
        }
    });

    const extrudeSettings = {
        steps: 1,
        depth: 0.5,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 3
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Chọn màu ngẫu nhiên nhưng cố định cho từng tỉnh dựa trên tên
    const colorIndex = Math.abs(hashCode(name)) % regionColors.length;
    const baseColor = regionColors[colorIndex];

    const material = new THREE.MeshStandardMaterial({
        color: baseColor,
        metalness: 0.1,
        roughness: 0.8,
        emissive: 0x000000,
        transparent: true,
        opacity: 0
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.userData = { originalColor: baseColor };

    // Khởi tạo trạng thái phân tán cho hiệu ứng lắp ghép
    // Scatter nhẹ hơn để hiệu ứng rõ ràng, dễ theo dõi
    const scatterRange = 25;
    mesh.position.set(
        (Math.random() - 0.5) * scatterRange,
        (Math.random() - 0.5) * scatterRange,
        -5 + Math.random() * -15  // Bay từ phía sau camera
    );
    mesh.rotation.set(
        (Math.random() - 0.5) * Math.PI * 0.5,
        (Math.random() - 0.5) * Math.PI * 0.5,
        (Math.random() - 0.5) * Math.PI * 0.3
    );

    // Thêm đường viền (Edgeline)
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, transparent: true, opacity: 0.6 });
    const line = new THREE.LineSegments(edges, lineMaterial);
    mesh.add(line);

    mapGroup.add(mesh);
    return mesh;
}

function createLabel(text, position) {
    const div = document.createElement('div');
    div.className = 'province-label';
    div.textContent = text;
    div.style.position = 'absolute';
    div.style.color = 'rgba(255,255,255,0.9)';
    div.style.fontSize = '9px';
    div.style.fontWeight = '600';
    div.style.pointerEvents = 'none';
    div.style.textShadow = '0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.opacity = '0'; // Ẩn mặc định để hiện sau animation
    div.style.transition = 'opacity 0.6s ease';
    div.style.zIndex = '5';

    // Chỉ hiển thị nhãn cho một số tỉnh lớn hoặc trung tâm để tránh rối, nhưng vì yêu cầu là hiện tên các tỉnh, 
    // chúng ta sẽ ẩn bớt khi zooom out (xử lý ở animate vòng lặp)

    mapContainer.appendChild(div);
    labels.push({ element: div, position: position, name: text });
}

function onMouseMove(event) {
    const rect = mapContainer.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / mapContainer.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / mapContainer.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(mapGroup.children);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (currentHover !== object) {
            if (currentHover) resetHighlight(currentHover);
            currentHover = object;
            highlightProvince(object);
            updateFoodCard(object.name);
        }
    } else {
        if (currentHover) {
            resetHighlight(currentHover);
            currentHover = null;
            hideFoodCard();
        }
    }
}

function highlightProvince(object) {
    gsap.to(object.material.color, { r: 0.83, g: 0.64, b: 0.45, duration: 0.3 }); // #d4a373
    gsap.to(object.position, { z: 0.5, duration: 0.3 });
    object.material.emissive.setHex(0x332211);
}

function resetHighlight(object) {
    const rColor = new THREE.Color(object.userData.originalColor);
    gsap.to(object.material.color, { r: rColor.r, g: rColor.g, b: rColor.b, duration: 0.3 });
    gsap.to(object.position, { z: 0, duration: 0.3 });
    object.material.emissive.setHex(0x000000);
}

function updateFoodCard(name) {
    const data = provinceFoodData[name] || {
        dish: "Đang cập nhật",
        description: "Hương vị đặc trưng của vùng đất này đang được chúng tôi tìm kiếm.",
        image: "assets/images/hero.png"
    };

    document.getElementById('card-province').innerText = name;
    document.getElementById('card-dish').innerText = data.dish;
    document.getElementById('card-desc').innerText = data.description;

    // Gán đường dẫn hình ảnh từ data, sử dụng ảnh hero.png làm mặc định
    document.getElementById('card-dish-img').src = data.image || 'assets/images/hero.png';

    foodCard.classList.add('active');
}

function hideFoodCard() {
    foodCard.classList.remove('active');
}

function onWindowResize() {
    camera.aspect = mapContainer.clientWidth / mapContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(mapContainer.clientWidth, mapContainer.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Cập nhật OrbitControls
    if (controls) controls.update();

    // Cập nhật vị trí nhãn (Labels)
    if (labels.length > 0) {
        // Tính từ camera đến target (tâm)
        const distance = camera.position.distanceTo(controls.target);

        labels.forEach(label => {
            const vector = label.position.clone();
            vector.project(camera);

            // Ẩn nhãn nếu đằng sau camera HOẶC nếu distance lơn hơn 22 (phải zoom gần hơn mới thấy)
            if (vector.z > 1 || distance > 22) {
                label.element.style.opacity = '0';
                return;
            }

            label.element.style.opacity = '1';

            const x = (vector.x * .5 + .5) * mapContainer.clientWidth;
            const y = (vector.y * -.5 + .5) * mapContainer.clientHeight;

            label.element.style.left = `${x}px`;
            label.element.style.top = `${y}px`;
        });
    }

    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', init);
