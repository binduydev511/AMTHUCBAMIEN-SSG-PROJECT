// GSAP Plugins Implementation
gsap.registerPlugin(Observer, MotionPathPlugin, Draggable);

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section-scroll");
    const images = document.querySelectorAll(".bg");
    const headings = gsap.utils.toArray(".section-heading");
    const outerWrappers = gsap.utils.toArray(".outer");
    const innerWrappers = gsap.utils.toArray(".inner");

    // Split text using SplitType (free alternative to SplitText)
    const splitHeadings = headings.map(heading => new SplitType(heading, { types: 'chars,words' }));

    let currentIndex = -1;
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating = false;
    let isFooterOpened = false; // Theo dõi việc mở Footer lần đầu

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function updateNavbar(index) {
        const navbar = document.querySelector('.navbar');
        if (index > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    const paperPlane = document.querySelector('.paper-plane');
    // Đảm bảo máy bay hiện ngay vị trí đầu tiên
    gsap.set(paperPlane, {
        xPercent: -50,
        yPercent: -50,
        left: 50,
        top: window.innerHeight / 2,
        autoAlpha: 1,
        display: "flex"
    });

    // --- HIỆU ỨNG ĐẬP CÁNH (WING FLAPPING) ---
    const wingLeft = document.querySelector('#wing-left');
    const wingRight = document.querySelector('#wing-right');

    if (wingLeft && wingRight) {
        gsap.set(wingLeft, { transformOrigin: "90% center" });
        gsap.set(wingRight, { transformOrigin: "10% center" });

        gsap.to(wingLeft, {
            scaleX: 0.7,
            duration: 0.6, // Đập chậm hơn
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
        gsap.to(wingRight, {
            scaleX: 0.7,
            duration: 0.6, // Đập chậm hơn
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // --- HIỆU ỨNG LƠ LỬNG (FLOATING EFFECT khi đứng yên) ---
        gsap.to(paperPlane, {
            y: "+=15",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    function createWindStreak(x, y, rotation) {
        const streak = document.createElement('div');
        streak.className = 'wind-streak';
        document.body.appendChild(streak);

        gsap.set(streak, {
            left: x,
            top: y,
            rotation: rotation + 180,
            scaleX: 0
        });

        gsap.to(streak, {
            scaleX: gsap.utils.random(0.5, 1.5),
            opacity: 0,
            duration: 0.8,
            ease: "sine.out",
            onComplete: () => streak.remove()
        });
    }

    let lastPlanePos = { x: -200, y: window.innerHeight / 2 };
    let fixedPlanePositions = new Array(6).fill({ x: 500, y: 500 }); // Dự phòng khởi tạo

    function calculatePlanePositions() {
        try {
            const getRelativeTarget = (index, useLastChar = true) => {
                const heading = headings[index];
                if (!heading) return null;
                const section = heading.closest('.section-scroll');
                if (!section) return null;

                let targetEl = heading;
                if (useLastChar && splitHeadings[index] && splitHeadings[index].chars) {
                    const chars = splitHeadings[index].chars;
                    targetEl = chars[chars.length - 1]; // Ký tự cuối (ví dụ 'n' trong Miền hoặc 'm' trong Nam)
                }

                const rect = targetEl.getBoundingClientRect();
                const secRect = section.getBoundingClientRect();

                return {
                    x: (rect.left - secRect.left) + rect.width,
                    y: (rect.top - secRect.top) + (rect.height / 2)
                };
            };

            const heroPos = getRelativeTarget(0);
            const aboutPos = getRelativeTarget(1);
            const mapPos = getRelativeTarget(2);
            const northPos = getRelativeTarget(3);
            const centralPos = getRelativeTarget(4);
            const southPos = getRelativeTarget(5);

            fixedPlanePositions = [
                {
                    x: (heroPos ? heroPos.x : window.innerWidth * 0.7) + 70,
                    y: (heroPos ? heroPos.y : window.innerHeight * 0.35)
                },
                {
                    x: (aboutPos ? aboutPos.x : window.innerWidth * 0.8) + 70,
                    y: (aboutPos ? aboutPos.y : 800)
                },
                {
                    x: (mapPos ? mapPos.x : window.innerWidth * 0.8) + 80,
                    y: (mapPos ? mapPos.y : 1500)
                },
                {
                    x: (northPos ? northPos.x : window.innerWidth * 0.8) + 70,
                    y: (northPos ? northPos.y : 2200)
                },
                {
                    x: (centralPos ? centralPos.x : window.innerWidth * 0.8) + 70,
                    y: (centralPos ? centralPos.y : 3000)
                },
                {
                    x: (southPos ? southPos.x : window.innerWidth * 0.8) + 70,
                    y: (southPos ? southPos.y : 3800)
                }
            ];

        } catch (e) {
            console.warn("Máy bay: Lỗi tính tọa độ:", e);
        }
    }

    // Tính toán ngay lần đầu
    calculatePlanePositions();

    // Khởi tạo máy bay ẩn
    gsap.set(paperPlane, {
        xPercent: -50,
        yPercent: -50,
        left: -150,
        top: window.innerHeight / 2,
        autoAlpha: 1,
        display: "flex"
    });

    // Hành trình bay vào lướt qua tiêu đề - Quỹ đạo mượt mà, xuất hiện nhanh (400ms)
    setTimeout(() => {
        calculatePlanePositions();
        const startTarget = fixedPlanePositions[0];

        // Tiêu đề trang đầu xuất hiện từ trái sang phải - Đồng bộ với máy bay
        gsap.fromTo(splitHeadings[0].chars, {
            autoAlpha: 0,
            x: -40,
            filter: "blur(10px)"
        }, {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.05,
            ease: "power2.out"
        });

        // Dừng các animation cũ nếu có để tránh xung đột
        gsap.killTweensOf(paperPlane);
        gsap.set(paperPlane, { autoAlpha: 1, display: "flex" });

        gsap.to(paperPlane, {
            duration: 4.5,
            ease: "sine.inOut",
            motionPath: {
                path: [
                    { left: -100, top: window.innerHeight * 0.4 },
                    { left: window.innerWidth * 0.3, top: window.innerHeight * 0.15 },
                    { left: window.innerWidth * 0.6, top: window.innerHeight * 0.3 },
                    { left: startTarget.x, top: startTarget.y }
                ],
                curviness: 1.5,
                autoRotate: 90
            },
            onUpdate: function () {
                const x = gsap.getProperty(paperPlane, "left");
                const y = gsap.getProperty(paperPlane, "top");
                const r = gsap.getProperty(paperPlane, "rotation");
                if (Math.random() > 0.45) createWindStreak(x, y, r);
            },
            onComplete: () => {
                lastPlanePos = { x: startTarget.x, y: startTarget.y };
                // Snap chính xác lại một lần nữa
                gsap.set(paperPlane, { left: startTarget.x, top: startTarget.y });
            }
        });
    }, 400);

    window.addEventListener('resize', calculatePlanePositions);

    function gotoSection(index, direction) {
        // Hỗ trợ trạng thái Footer (index == sections.length)
        if (index < 0 || index > sections.length) return;

        if (currentIndex === index) return;

        animating = true;
        let fromTop = direction === -1;
        let dFactor = fromTop ? -1 : 1;

        // --- XỬ LÝ TRẠNG THÁI REVEAL FOOTER ---
        if (index === sections.length) {
            // Hiển thị container footer trước khi chạy animation nội bộ
            gsap.set(".main-footer", { autoAlpha: 1, visibility: "visible" });

            // Đang cuộn xuống để xem Footer từ trang cuối
            const marqueeRows = document.querySelectorAll('.marquee-row');
            const footerContent = document.querySelector('.footer-content');
            const marqueeWrapper = document.querySelector('.footer-marquee-wrapper');

            const footerTimeline = gsap.timeline({
                onComplete: () => {
                    animating = false;
                    currentIndex = index;
                    isFooterOpened = true; // Đánh dấu đã mở lần đầu
                }
            });

            // 1. Kéo trang cuối lên
            footerTimeline.to(sections[currentIndex], {
                yPercent: -70,
                duration: 0.5,
                ease: "power2.inOut"
            });

            // 2. Kiểm tra nếu mở lần đầu thì chạy hiệu ứng Marquee/Split
            if (!isFooterOpened) {
                // Reset trạng thái cho lần đầu
                marqueeWrapper.classList.add('active');
                gsap.set(marqueeWrapper, { autoAlpha: 1 });
                // Trên Mobile, chúng ta không ẩn hẳn nội dung để tránh lỗi mất hiển thị
                if (window.innerWidth > 768) {
                    gsap.set(footerContent, { autoAlpha: 0, y: 50, scale: 0.9 });
                } else {
                    gsap.set(footerContent, { autoAlpha: 1, y: 0, scale: 1 });
                }

                // Hiệu ứng chữ chạy ngược chiều
                marqueeRows.forEach((row, i) => {
                    const direction = i % 2 === 0 ? -1 : 1;
                    gsap.fromTo(row.querySelector('span'), {
                        xPercent: direction === -1 ? 0 : -50
                    }, {
                        xPercent: direction === -1 ? -50 : 0,
                        duration: 4,
                        ease: "none",
                        repeat: -1
                    });
                });

                // 3. Hiệu ứng Split-Exit (Tách dòng)
                const topRows = [marqueeRows[0], marqueeRows[1]];
                const bottomRows = [marqueeRows[2], marqueeRows[3]];

                footerTimeline.to(topRows, {
                    yPercent: -100,
                    autoAlpha: 0,
                    duration: 0.4,
                    ease: "power2.in"
                }, "+=0.5");

                footerTimeline.to(bottomRows, {
                    yPercent: 100,
                    autoAlpha: 0,
                    duration: 0.4,
                    ease: "power2.in"
                }, "<");

                footerTimeline.to(marqueeWrapper, {
                    autoAlpha: 0,
                    duration: 0.2,
                    onComplete: () => {
                        marqueeWrapper.classList.remove('active');
                        gsap.set(marqueeWrapper, { display: "none" });
                    }
                }, "-=0.2");

                footerTimeline.to(footerContent, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, "-=0.1");
            } else {
                // TỪ LẦN THỨ 2: Hiện ngay lập tức hoặc fade nhẹ, không marquee
                gsap.set(marqueeWrapper, { autoAlpha: 0, display: "none" });
                footerTimeline.to(footerContent, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.2");
            }

            // Ẩn máy bay khi xem footer
            gsap.to(paperPlane, { autoAlpha: 0, duration: 0.5 });
            return;
        }

        if (currentIndex === sections.length && index === sections.length - 1) {
            // Đang cuộn lên từ Footer về trang cuối
            // Reset Footer content để lần sau hiện marquee lại
            gsap.set(".footer-content", { autoAlpha: 0, y: 30 });
            gsap.set(".footer-marquee-wrapper", { autoAlpha: 0, display: "none" });

            gsap.to(sections[index], {
                yPercent: 0,
                duration: 1.2,
                ease: "expo.inOut",
                onComplete: () => {
                    animating = false;
                    currentIndex = index;
                }
            });
            return;
        }

        // --- LOGIC CHUYỂN SECTION THÔNG THƯỜNG ---

        // CHỈ CHO MÁY BAY BAY ĐẾN CÁC SECTION CÓ VỊ TRÍ CỐ ĐỊNH (0 ĐẾN 5)
        if (index >= 0 && index <= 5 && currentIndex !== -1) {
            const targetPos = fixedPlanePositions[index];
            if (!targetPos) return;

            gsap.killTweensOf(paperPlane);
            gsap.set(paperPlane, { display: "flex", autoAlpha: 1 });

            // Quỹ đạo lướt mượt mà
            gsap.to(paperPlane, {
                duration: 2.5,
                ease: "power2.inOut",
                motionPath: {
                    path: [
                        { left: lastPlanePos.x, top: lastPlanePos.y },
                        { left: (lastPlanePos.x + targetPos.x) / 2 + 50, top: (lastPlanePos.y + targetPos.y) / 2 - 100 },
                        { left: targetPos.x, top: targetPos.y }
                    ],
                    curviness: 1.5,
                    autoRotate: 90
                },
                onUpdate: function () {
                    const x = gsap.getProperty(paperPlane, "left");
                    const y = gsap.getProperty(paperPlane, "top");
                    const r = gsap.getProperty(paperPlane, "rotation");
                    if (Math.random() > 0.45) createWindStreak(x, y, r);
                },
                onComplete: () => {
                    lastPlanePos = { x: targetPos.x, y: targetPos.y };
                    gsap.set(paperPlane, { left: targetPos.x, top: targetPos.y });
                }
            });
        } else if (index > 5) {
            // Nếu đi xa hơn các section này, biến mất máy bay
            gsap.to(paperPlane, {
                autoAlpha: 0,
                duration: 0.8,
                onComplete: () => {
                    gsap.set(paperPlane, { display: "none" });
                }
            });
        }



        // ---------------------------

        let tl = gsap.timeline({
            defaults: { duration: 1.4, ease: "expo.inOut" },
            onComplete: () => {
                animating = false;
            }
        });

        if (currentIndex >= 0) {
            // The first time this function runs, current is -1
            gsap.set(sections[currentIndex], { zIndex: 0 });
            // Section hiện tại trượt ra ngoài
            tl.to(sections[currentIndex], { yPercent: -100 * dFactor }, 0);
        }

        // Thiết lập section mới bắt đầu từ ngoài màn hình và trượt vào
        gsap.set(sections[index], { autoAlpha: 1, zIndex: 1, visibility: "visible", yPercent: 100 * dFactor });
        gsap.set([outerWrappers[index], innerWrappers[index]], { yPercent: 0 });
        gsap.set(images[index], { visibility: "visible", yPercent: 0 });

        // Section mới trượt vào
        tl.to(sections[index], { yPercent: 0 }, 0)
            // Thêm chút parallax nhẹ cho ảnh nền để mượt mắt
            .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

        // Kích hoạt animation bản đồ ngay khi bắt đầu chuyển section (nếu là map)
        if (sections[index].id === 'map-section' && window.playAssemblyAnimation) {
            window.playAssemblyAnimation();
        }

        // Độ trễ mặc định cho chữ
        let headDelay = 0.2;
        let revealDelay = 0.6;

        // Bỏ qua animation tiêu đề mặc định cho trang 1 (vì đã có riêng ở trên)
        if (index === 0) {
            // Hiệu ứng tiêu đề trang đầu nhảy từ trái sang phải
            tl.fromTo(splitHeadings[0].chars, {
                autoAlpha: 0,
                x: -50,
                filter: "blur(5px)"
            }, {
                autoAlpha: 1,
                x: 0,
                filter: "blur(0px)",
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out"
            }, 1.0);

            const reveals = sections[index].querySelectorAll('.reveal');
            if (reveals.length > 0) {
                tl.fromTo(reveals, {
                    autoAlpha: 0,
                    y: 20
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.1
                }, 1.4);
            }
        } else {
            // Nếu là trang bản đồ, trì hoãn lâu hơn chút để bản đồ lắp (nhưng nhanh hơn trước)
            if (sections[index].id === 'map-section') {
                headDelay = 1.2;
                revealDelay = 1.5;
            }

            tl.fromTo(splitHeadings[index].chars, {
                autoAlpha: 0,
                x: -50,
                filter: "blur(5px)"
            }, {
                autoAlpha: 1,
                x: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.03
            }, headDelay);

            const reveals = sections[index].querySelectorAll('.reveal');
            if (reveals.length > 0) {
                tl.fromTo(reveals, {
                    autoAlpha: 0,
                    y: 20
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.1
                }, revealDelay);
            }
        }

        updateNavbar(index);
        currentIndex = index;
    }

    // ===== URBAN SLIDER LOGIC (NEW CODE FROM USER) =====
    const items = gsap.utils.toArray(".urban-slider-container .item");
    const bgs = gsap.utils.toArray(".urban-slider-container .bg1, .urban-slider-container .bg2, .urban-slider-container .bg3");
    gsap.set([bgs[0], bgs[1]], { scale: 2, opacity: 0 });

    const panal = document.querySelector(".urban-slider-container .content-body");
    const cards = document.querySelector(".urban-slider-container .item-list");
    const spacer = document.createElement("div");
    let itemIndex;
    let urbanAutoTween;

    function startUrbanAutoScroll() {
        if (!cards || items.length < 3 || urbanAutoTween) return;

        // Tính toán khoảng cách tối đa có thể cuộn
        const maxScroll = cards.offsetWidth - panal.offsetWidth;
        if (maxScroll <= 0) return;

        urbanAutoTween = gsap.to(cards, {
            x: -maxScroll,
            duration: 20, // Tốc độ cuộn (giây)
            ease: "none",
            repeat: -1,
            yoyo: true, // Cuộn đi cuộn lại để xem toàn bộ món ăn
            paused: false
        });
    }

    function stopUrbanAutoScroll() {
        if (urbanAutoTween) {
            urbanAutoTween.kill();
            urbanAutoTween = null;
        }
    }

    function activate(index) {
        if (!items[index]) return;
        let item = items[index],
            img = item.querySelector(".item-img"),
            description = item.querySelector(".item-description"),
            itemGetter = gsap.getProperty(item),
            state = Flip.getState([item, img, description], { props: "borderRadius,maxWidth,zIndex" });

        gsap.set(spacer, {
            width: itemGetter("width"),
            height: itemGetter("height"),
            marginLeft: itemGetter("marginLeft") + "px",
            marginRight: itemGetter("marginRight") + "px"
        });

        item.parentNode.insertBefore(spacer, item);
        panal.appendChild(item);
        item.classList.add("active");

        stopUrbanAutoScroll(); // Dừng auto scroll khi đang xem chi tiết

        Flip.from(state, { duration: 0.5, ease: "power1.inOut", nested: true });
        itemIndex = index;
        setTimeout(() => item.addEventListener("click", deactivate), 100);
    }

    function deactivate() {
        let item = items[itemIndex],
            img = item.querySelector(".item-img"),
            description = item.querySelector(".item-description"),
            state = Flip.getState([item, img, description], { props: "borderRadius,maxWidth" });

        spacer.parentNode.insertBefore(item, spacer);
        spacer.parentNode.removeChild(spacer);
        item.classList.remove("active");

        // Khởi động lại auto scroll sau khi đóng chi tiết
        setTimeout(startUrbanAutoScroll, 1000);

        Flip.from(state, { duration: 0.5, ease: "power1.inOut", nested: true });
        itemIndex = null;
        item.removeEventListener("click", deactivate);
    }

    if (panal && cards) {
        let isDragging = false;

        const sliderDraggable = Draggable.create(cards, {
            type: "x",
            edgeResistance: 0.5,
            snap: { x: [0, -360, -680] },
            zIndexBoost: false,
            onDragStart: function () {
                isDragging = true;
                if (urbanAutoTween) urbanAutoTween.pause(); // Tạm dừng khi đang drag
            },
            onDragEnd: function () {
                setTimeout(() => isDragging = false, 100);
                if (urbanAutoTween) {
                    // Cập nhật progress của tween dựa trên vị trí mới sau khi drag
                    const maxScroll = cards.offsetWidth - panal.offsetWidth;
                    const progress = Math.abs(this.x) / maxScroll;
                    urbanAutoTween.progress(gsap.utils.clamp(0, 1, progress));
                    setTimeout(() => urbanAutoTween.resume(), 2000); // Resume sau 2s không tương tác
                }

                let index = this.endX === 0 ? 2 : this.endX === -360 ? 1 : 0;
                gsap.to(bgs, {
                    scale: i => i === index ? 1 : 2,
                    opacity: i => i === index ? 1 : 0
                });
            },
            inertia: true,
            allowContextMenu: false,
            bounds: {
                minX: -cards.offsetWidth + panal.offsetWidth,
                maxX: 0
            },
        })[0];

        // Hover listeners
        panal.addEventListener("mouseenter", () => {
            if (urbanAutoTween) urbanAutoTween.pause();
        });
        panal.addEventListener("mouseleave", () => {
            if (urbanAutoTween && !itemIndex) urbanAutoTween.resume();
        });

        startUrbanAutoScroll(); // Chạy ngay khi khởi tạo

        // Lắng nghe click trực tiếp trên từng item để đảm bảo độ nhạy cao nhất
        items.forEach((item, index) => {
            item.addEventListener("click", (e) => {
                if (!isDragging && !item.classList.contains("active")) {
                    activate(index);
                }
            });
        });
    }

    Observer.create({
        type: "wheel,touch",
        wheelSpeed: -1,
        onDown: () => {
            (!animating) && gotoSection(currentIndex - 1, -1);
        },
        onUp: () => {
            (!animating) && gotoSection(currentIndex + 1, 1);
        },
        tolerance: window.innerWidth < 768 ? 25 : 10, // Tăng độ trễ cuộn trên Mobile để tránh nhảy trang quá nhanh
        preventDefault: false,
        ignore: "#vietnam-map, .urban-slider-container, .food-card, .menu-horizontal-wrapper, .horizontal-scroll-container, .menu-item, .menu-region-row, .main-footer"
    });

    // Hash navigation & Click listeners
    document.querySelectorAll('.nav-links a, .hero-btns a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const index = Array.from(sections).indexOf(targetSection);
                if (index !== -1) {
                    const direction = index > currentIndex ? 1 : -1;

                    // Special case for map button
                    if (targetId === '#map-section' && window.scatterMap) {
                        window.scatterMap();
                    }

                    gotoSection(index, direction);
                }
            }
        });
    });

    // Initial section
    gotoSection(0, 1);

    // --- LOGIC ĐIỀU HƯỚNG TỪ MAP ĐẾN MENU ---
    window.navigateToMenu = function (provinceName) {
        const province = provinceFoodData[provinceName];
        if (!province) return;

        const regionToIndex = {
            "North": 3,
            "Central": 4,
            "South": 5
        };

        const targetIndex = regionToIndex[province.region];
        // Tạo ID chuẩn hóa từ tên tỉnh để khớp với ID được render động
        const targetId = `food-${provinceName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")}`;

        // 1. Chuyển sang section Menu tương ứng
        gotoSection(targetIndex, 1);

        // 2. Chờ section chuyển xong, sau đó điều hướng nội bộ (cuộn ngang)
        setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
                // Cuộn dọc trong Menu section để hàng đó hiện ra
                const row = el.closest('.menu-region-row');
                const wrapper = document.querySelector('.menu-horizontal-wrapper');

                if (row && wrapper) {
                    wrapper.scrollTo({
                        top: row.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }

                // Cuộn ngang mượt mà đến Card tương ứng
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

                // Highlight hiệu ứng
                document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('highlight'));
                el.classList.add('highlight');

                // Feedback trực quan
                gsap.fromTo(el, { scale: 1 }, { scale: 1.1, duration: 0.5, yoyo: true, repeat: 1 });
            }
        }, 1500);
    };

    // --- HỖ TRỢ KÉO (DRAGGABLE) TRÊN MENU ---
    Draggable.create(".horizontal-scroll-container", {
        type: "scrollLeft",
        edgeResistance: 0.65,
        inertia: true,
        autoScroll: 1,
        throwResistance: 1000,
        dragClickables: true,
        onDragStart: function () {
            this.target.classList.add('is-dragging');
        },
        onDragEnd: function () {
            this.target.classList.remove('is-dragging');
        }
    });

    // --- HỖ TRỢ CUỘN CHUỘT NGANG TRÊN MENU ---

    // --- RENDER THỰC ĐƠN ĐỘNG ---
    function initDynamicMenu() {
        const containers = {
            "North": document.getElementById('container-north'),
            "Central": document.getElementById('container-central'),
            "South": document.getElementById('container-south')
        };

        // Xóa nội dung cũ nếu có (phòng trường hợp gọi lại)
        Object.values(containers).forEach(c => { if (c) c.innerHTML = ''; });

        Object.entries(provinceFoodData).forEach(([province, data]) => {
            const container = containers[data.region];
            if (!container) return;

            // Tạo ID chuẩn hóa (ví dụ: "Đà Nẵng" -> "food-DaNang")
            const foodId = `food-${province.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")}`;

            const menuItem = document.createElement('div');
            menuItem.className = `menu-item ${data.region}`;
            menuItem.id = foodId;
            menuItem.innerHTML = `
                <span class="highlight-badge">${province}</span>
                <div class="item-img">
                    <img src="${data.image}" alt="${data.dish}">
                </div>
                <div class="item-info">
                    <h3>${data.dish}</h3>
                    <div class="item-story">
                        <p class="story-text">${data.story}</p>
                    </div>
                    <div class="menu-footer">
                        <a href="#" class="btn btn-primary btn-sm btn-view-origin">Xem nguồn gốc</a>
                    </div>
                </div>
            `;
            container.appendChild(menuItem);
        });
    }

    // --- LOGIC TỰ ĐỘNG TRÔI THỰC ĐƠN (AUTO-SCROLL) ---
    let autoScrollIntervals = [];
    let isAutoScrolling = true;

    function startAutoScroll() {
        stopAutoScroll();
        const containers = document.querySelectorAll('.horizontal-scroll-container');

        containers.forEach(container => {
            const interval = setInterval(() => {
                if (isAutoScrolling && !container.classList.contains('is-dragging')) {
                    container.scrollLeft += 1;
                    // Reset nếu cuộn hết
                    if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
                        container.scrollLeft = 0;
                    }
                }
            }, 30);
            autoScrollIntervals.push(interval);

            // Dừng khi hover
            container.addEventListener('mouseenter', () => isAutoScrolling = false);
            container.addEventListener('mouseleave', () => isAutoScrolling = true);
        });
    }

    function stopAutoScroll() {
        autoScrollIntervals.forEach(clearInterval);
        autoScrollIntervals = [];
    }

    // Gán hàm điều hướng toàn cục để gọi từ food-map.js
    window.navigateToMenu = function (provinceName) {
        const province = provinceFoodData[provinceName];
        if (!province) return;

        const regionToIndex = {
            "North": 3,
            "Central": 4,
            "South": 5
        };

        const targetIndex = regionToIndex[province.region];
        // Chuẩn hóa ID: bỏ dấu, bỏ khoảng trắng (Ví dụ: "Đà Nẵng" -> "DaNang")
        const foodId = `food-${provinceName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")}`;

        console.log('[DEBUG] Navigating:', { provinceName, region: province.region, targetIndex, foodId });

        // Tạm dừng auto scroll khi điều hướng
        isAutoScrolling = false;

        if (typeof gotoSection === "function") {
            gotoSection(targetIndex, 1);
        } else {
            console.error('[ERROR] gotoSection is not defined!');
        }

        setTimeout(() => {
            const el = document.getElementById(foodId);
            if (el) {
                console.log('Element found, performing scroll and highlight...');
                el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

                // Hiệu ứng highlight đặc biệt
                el.style.boxShadow = "0 0 30px var(--primary)";
                el.style.borderColor = "var(--primary)";

                gsap.fromTo(el, { scale: 1 }, {
                    scale: 1.1,
                    duration: 0.6,
                    yoyo: true,
                    repeat: 2,
                    onComplete: () => {
                        el.style.boxShadow = "";
                    }
                });
            } else {
                console.warn('[WARN] Food element not found:', foodId);
                alert(`Không tìm thấy phần tử món ăn cho tỉnh: ${provinceName} (ID: ${foodId}). Vui lòng kiểm tra lại dữ liệu.`);
            }

            // Resume auto-scroll sau một khoảng thời gian
            setTimeout(() => {
                isAutoScrolling = true;
            }, 8000);
        }, 1600);
    };

    initDynamicMenu();
    startAutoScroll();
});

// Reveal components on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
