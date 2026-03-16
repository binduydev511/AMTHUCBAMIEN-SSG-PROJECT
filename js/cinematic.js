/**
 * AAA Game-Style 3D Vietnamese Food Showcase
 * Features: GSAP ScrollTrigger, Modular Engine, High-End Post-Processing, Cinematic Camera.
 */

class AAAShowcase {
    constructor() {
        this.container = document.getElementById('three-canvas');
        this.clock = new THREE.Clock();
        this.models = [];
        this.currentModelIndex = 0;

        // Configuration
        this.dishData = [
            { name: 'Phở Bò', region: 'Hà Nội', desc: 'Món súp đặc trưng với nước dùng xương trong vắt và thảo mộc thơm nồng.', color: 0xffffff, type: 'bowl', images: ['floating_pho_bowl_1773138715905.png'] },
            { name: 'Bánh Mì', region: 'Toàn Quốc', desc: 'Sự kết hợp tinh tế của ẩm thực Pháp và lòng hiếu khách của người Việt.', color: 0x8b4513, type: 'bread', images: ['floating_banh_mi_1773138734373.png'] },
            { name: 'Bún Bò Huế', region: 'Huế', desc: 'Hương vị mạnh mẽ, nồng nàn sả và mắm ruốc đặc trưng của cố đô.', color: 0xa52a2a, type: 'bowl', images: ['floating_bun_bo_hue_1773140164890.png'] },
            { name: 'Gỏi Cuốn', region: 'Miền Nam', desc: 'Lớp bánh tráng mỏng manh bọc lấy tôm tươi và những nhành rau hẹ.', color: 0xf5f5f5, type: 'rolls', images: ['floating_spring_rolls_1773138751072.png'] },
            { name: 'Bánh Xèo', region: 'Miền Tây', desc: 'Âm thanh "xèo xèo" đặc trưng trên chảo nóng cùng vị bột nghệ béo ngậy.', color: 0xffd700, type: 'plate', images: ['floating_banh_xeo_1773140148559.png'] },
            { name: 'Cơm Tấm', region: 'Sài Gòn', desc: 'Hạt gạo vỡ đặc biệt ăn cùng sườn nướng mật ong và chả trứng vàng ươm.', color: 0xfffacd, type: 'plate', images: ['floating_com_tam_plate_1773140183437.png'] },
            { name: 'Cà Phê Sữa Đá', region: 'Toàn Quốc', desc: 'Tinh hoa cà phê phin kết hợp sữa đặc, một biểu tượng của lối sống Việt.', color: 0x5d4037, type: 'cup', images: ['floating_coffee_filter_1773138773879.png'] }
        ];

        this.init();
    }

    async init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 20);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.container,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = 1.6;

        // Post Processing
        this.setupPostProcessing();

        // Environment & Lights
        this.setupLighting();

        // Models
        await this.loadModels();

        // Scroll Integration
        this.setupScroll();

        // Interaction
        this.setupEventListeners();

        // Animation Loop
        this.animate();

        // UI Reveal
        gsap.to('#loading-screen', {
            opacity: 0, duration: 1.5, delay: 0.5, onComplete: () => {
                document.getElementById('loading-screen').style.display = 'none';
            }
        });
    }

    setupPostProcessing() {
        this.renderScene = new THREE.RenderPass(this.scene, this.camera);
        this.bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.8, 0.4, 0.85
        );

        this.composer = new THREE.EffectComposer(this.renderer);
        this.composer.addPass(this.renderScene);
        this.composer.addPass(this.bloomPass);
    }

    setupLighting() {
        // High-end Cinematic Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        const spotTop = new THREE.SpotLight(0xffffff, 2, 50, 0.4, 0.5, 1);
        spotTop.position.set(5, 15, 10);
        this.scene.add(spotTop);

        const pointLight = new THREE.PointLight(0xd4a373, 1, 30);
        pointLight.position.set(-10, -5, 5);
        this.scene.add(pointLight);

        // Environment Fog
        this.scene.fog = new THREE.FogExp2(0x050505, 0.02);
    }

    async loadModels() {
        const loader = new THREE.TextureLoader();
        const uiContainer = document.getElementById('ui-layer');
        const progress = document.getElementById('progress');

        const promises = this.dishData.map(async (data, i) => {
            return new Promise((resolve) => {
                loader.load(`assets/images/${data.images[0]}`, (texture) => {
                    // Create AAA-Style Geometries
                    const model = this.createRealisticModel(data, texture);
                    model.position.z = -50; // Initially hidden
                    model.visible = false;
                    this.scene.add(model);
                    this.models.push(model);

                    // Create Section
                    const section = document.createElement('div');
                    section.className = `section section-${i}`;
                    section.innerHTML = `
                        <div class="content-box">
                            <span class="region-tag">${data.region}</span>
                            <h2 class="dish-name">${data.name}</h2>
                            <p class="dish-desc">${data.desc}</p>
                        </div>
                    `;
                    uiContainer.appendChild(section);

                    // Progress
                    const p = ((i + 1) / this.dishData.length) * 100;
                    gsap.to(progress, { width: `${p}%`, duration: 0.2 });

                    resolve();
                });
            });
        });

        await Promise.all(promises);
    }

    createRealisticModel(data, texture) {
        const group = new THREE.Group();
        let geometry;

        // Custom Geometries for realism
        if (data.type === 'bowl') {
            // Main Bowl
            const bowlGeo = new THREE.CylinderGeometry(4.2, 2.5, 2.5, 64);
            const bowlMat = new THREE.MeshStandardMaterial({
                color: 0xffffff, roughness: 0.05, metalness: 0
            });
            const bowl = new THREE.Mesh(bowlGeo, bowlMat);
            group.add(bowl);

            // Food Content Plane
            const contentGeo = new THREE.PlaneGeometry(8, 8);
            const contentMat = this.createFoodMaterial(texture);
            const content = new THREE.Mesh(contentGeo, contentMat);
            content.position.y = 1.26;
            content.rotation.x = -Math.PI / 2;
            group.add(content);
        }
        else if (data.type === 'bread') {
            // Rounded Loaf Geometry
            geometry = new THREE.BoxGeometry(7, 2.2, 2.2);
            const mat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.8 });
            const bread = new THREE.Mesh(geometry, mat);
            group.add(bread);

            const overlayGeo = new THREE.PlaneGeometry(9, 6);
            const overlayMat = this.createFoodMaterial(texture);
            const overlay = new THREE.Mesh(overlayGeo, overlayMat);
            overlay.position.z = 1.15;
            group.add(overlay);
        }
        else if (data.type === 'plate') {
            geometry = new THREE.CylinderGeometry(5.5, 5, 0.4, 64);
            const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
            const plate = new THREE.Mesh(geometry, mat);
            group.add(plate);

            const overlayGeo = new THREE.PlaneGeometry(10, 10);
            const overlayMat = this.createFoodMaterial(texture);
            const overlay = new THREE.Mesh(overlayGeo, overlayMat);
            overlay.position.y = 0.25;
            overlay.rotation.x = -Math.PI / 2;
            group.add(overlay);
        }
        else {
            // Generic Cylinder for Coffee/Rolls
            geometry = new THREE.CylinderGeometry(2, 2, 5, 32);
            const mat = new THREE.MeshStandardMaterial({ color: data.color || 0xcccccc, roughness: 0.1 });
            const mesh = new THREE.Mesh(geometry, mat);
            group.add(mesh);

            const overlayGeo = new THREE.PlaneGeometry(6, 6);
            const overlayMat = this.createFoodMaterial(texture);
            const overlay = new THREE.Mesh(overlayGeo, overlayMat);
            overlay.position.z = 1.1;
            group.add(overlay);
        }

        return group;
    }

    createFoodMaterial(texture) {
        const mat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
        });

        // Advanced Background Removal (White Discard)
        mat.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                `
                #include <map_fragment>
                const float threshold = 0.92;
                if (diffuseColor.r > threshold && diffuseColor.g > threshold && diffuseColor.b > threshold) discard;
                `
            );
        };
        return mat;
    }

    setupScroll() {
        gsap.registerPlugin(ScrollTrigger);

        this.models.forEach((model, i) => {
            const section = document.querySelector(`.section-${i}`);

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    scrub: 2,
                    onEnter: () => {
                        model.visible = true;
                        section.classList.add('active');
                    },
                    onLeave: () => {
                        model.visible = false;
                        section.classList.remove('active');
                    },
                    onEnterBack: () => {
                        model.visible = true;
                        section.classList.add('active');
                    },
                    onLeaveBack: () => {
                        model.visible = false;
                        section.classList.remove('active');
                    }
                }
            });

            // Cinematic Cinematic Entry (Apple-style)
            timeline.fromTo(model.position,
                { z: -80, y: 15, x: 20 },
                { z: 12, y: 0, x: 0, ease: "power2.out" }
            );

            timeline.fromTo(model.rotation,
                { x: 1.5, y: -2, z: 0 },
                { x: 0.4, y: 0, z: 0, ease: "power2.out" },
                0
            );
        });
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;

            // Subtle Parallax
            gsap.to(this.camera.position, {
                x: x * 2,
                y: -y * 2,
                duration: 2,
                ease: "power2.out"
            });
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.composer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();

        // Idle Animations
        this.models.forEach((model, i) => {
            if (model.visible) {
                model.rotation.y += 0.005;
                model.position.y += Math.sin(time + i) * 0.003;
            }
        });

        this.composer.render();
    }
}

// Kickoff
document.addEventListener('DOMContentLoaded', () => {
    new AAAShowcase();
});
