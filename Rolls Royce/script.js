document.addEventListener('DOMContentLoaded', () => {
    // ---- Scroll Animations ----
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .glass-slide').forEach(element => {
        observer.observe(element);
    });

    // ---- Canvas Logic ----
    const canvas = document.getElementById('hero-canvas');
    const context = canvas.getContext('2d');
    const loadingOverlay = document.getElementById('loading-overlay');
    const container = document.getElementById('canvas-container');

    const frameCount = 8;
    const images = [];
    let imagesLoaded = 0;

    // Based on 'Luxury_car_door_202604082019_001.jpg' format
    const currentFrame = index => (
        `frames/Luxury_car_door_202604082019_frames/Luxury_car_door_202604082019_00${index}.jpg`
    );

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            imagesLoaded++;
            loadingOverlay.innerText = `Loading Experience ${Math.round((imagesLoaded / frameCount) * 100)}%`;
            if (imagesLoaded === frameCount) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => loadingOverlay.style.display = 'none', 500);
                requestAnimationFrame(resizeCanvas);
            }
        };
        images.push(img);
    }

    const renderFrame = (frameIndex) => {
        const img = images[frameIndex];
        if (!img || !img.width) return;

        // Cover logic
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    let lastFrameIndex = -1;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let cFrame = Math.max(0, lastFrameIndex);
        lastFrameIndex = -1;
        renderFrame(cFrame);
    };

    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const rect = container.getBoundingClientRect();
            // scrollDistance is total inner scrollable minus viewport
            const scrollDistance = rect.height - window.innerHeight;
            
            if (scrollDistance <= 0) return;

            // calculate scroll progress within container
            const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
            const frameIndex = Math.floor(progress * (frameCount - 1));

            if (frameIndex !== lastFrameIndex && imagesLoaded === frameCount) {
                renderFrame(frameIndex);
                lastFrameIndex = frameIndex;
            }
        });
    }, { passive: true });

    // ---- Ghost Door Hover Animation ----
    const ghostCanvas = document.getElementById('ghost-door-canvas');
    const ghostCtx = ghostCanvas.getContext('2d');
    const ghostExperience = document.getElementById('ghost');
    let ghostFrameIndex = 0;
    let targetFrameIndex = 0;
    let ghostAnimationId = null;

    const renderGhostFrame = (index) => {
        const img = images[index];
        if (!img || !img.width) return;

        const scale = Math.max(ghostCanvas.width / img.width, ghostCanvas.height / img.height);
        const x = (ghostCanvas.width / 2) - (img.width / 2) * scale;
        const y = (ghostCanvas.height / 2) - (img.height / 2) * scale;

        ghostCtx.clearRect(0, 0, ghostCanvas.width, ghostCanvas.height);
        ghostCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const resizeGhostCanvas = () => {
        ghostCanvas.width = ghostExperience.clientWidth;
        ghostCanvas.height = ghostExperience.clientHeight;
        renderGhostFrame(ghostFrameIndex);
    };

    window.addEventListener('resize', resizeGhostCanvas);
    resizeGhostCanvas();

    const animateGhost = () => {
        if (ghostFrameIndex < targetFrameIndex) {
            ghostFrameIndex++;
        } else if (ghostFrameIndex > targetFrameIndex) {
            ghostFrameIndex--;
        } else {
            cancelAnimationFrame(ghostAnimationId);
            ghostAnimationId = null;
            return;
        }

        renderGhostFrame(ghostFrameIndex);
        ghostAnimationId = requestAnimationFrame(animateGhost);
    };

    const startGhostAnimation = (target) => {
        targetFrameIndex = target;
        if (!ghostAnimationId) {
            ghostAnimationId = requestAnimationFrame(animateGhost);
        }
    };

    ghostExperience.addEventListener('mouseenter', () => {
        startGhostAnimation(0); // Open door (Index 0 is open)
    });

    ghostExperience.addEventListener('mouseleave', () => {
        startGhostAnimation(frameCount - 1); // Close door (Index 7 is closed)
    });

    // Initial render for ghost (Target closed state - index 7)
    const closedIndex = frameCount - 1;
    ghostFrameIndex = closedIndex; 

    if (imagesLoaded === frameCount) {
        renderGhostFrame(closedIndex);
    } else {
        // Fallback if images not yet loaded
        const checkLoaded = setInterval(() => {
            if (imagesLoaded === frameCount) {
                renderGhostFrame(closedIndex);
                clearInterval(checkLoaded);
            }
        }, 100);
    }
});
