console.log('Mateket Secondary School website loaded.');

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                const nav = document.querySelector('.main-nav');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Form Submission Handler (progressive enhancement + local fallback)
    const enquiryForm = document.getElementById('enquiryForm');
    const liveRegion = document.getElementById('formLiveRegion');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(enquiryForm);
            const payload = Object.fromEntries(formData.entries());

            // Try sending to a backend endpoint; fall back to localStorage
            try {
                const res = await fetch('/api/enquiries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) throw new Error('Network response was not ok');

                // success
                const name = payload.name || 'Friend';
                if (liveRegion) liveRegion.textContent = `Thank you, ${name}! Your enquiry has been received.`;
                enquiryForm.reset();
            } catch (err) {
                // Fallback: save locally
                const stored = JSON.parse(localStorage.getItem('mateket:enquiries') || '[]');
                stored.push({ ...payload, createdAt: new Date().toISOString() });
                localStorage.setItem('mateket:enquiries', JSON.stringify(stored));
                const name = payload.name || 'Friend';
                if (liveRegion) liveRegion.textContent = `Thank you, ${name}! Your enquiry was saved locally.`;
                enquiryForm.reset();
            }
        });
    }

    // Mobile Menu Toggle (Dynamic creation)
    const headerContainer = document.querySelector('.site-header .container');
    const nav = document.querySelector('.main-nav');

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.innerHTML = '☰';
    toggleBtn.setAttribute('aria-label', 'Toggle menu');
    toggleBtn.setAttribute('aria-controls', 'mainNav');
    toggleBtn.setAttribute('aria-expanded', 'false');

    // Insert before nav
    headerContainer.insertBefore(toggleBtn, nav);

    toggleBtn.addEventListener('click', () => {
        const expanded = nav.classList.toggle('active');
        toggleBtn.innerHTML = expanded ? '✕' : '☰';
        toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Load site content (CMS-friendly JSON)
    async function loadSiteData() {
        try {
            const resp = await fetch('./data/site.json');
            if (!resp.ok) return;
            const data = await resp.json();

            // Stats
            const statsGrid = document.querySelector('.stats-grid');
            if (statsGrid && Array.isArray(data.stats)) {
                statsGrid.innerHTML = data.stats.map(s => `
                    <div class="stat-card">
                        <span class="stat-number">${s.number}</span>
                        <span class="stat-label">${s.label}</span>
                    </div>
                `).join('');
            }

            // Downloads
            const downloadsArea = document.querySelector('.download-links');
            if (downloadsArea && Array.isArray(data.downloads)) {
                downloadsArea.innerHTML = data.downloads.map(d => `
                    <a href="${d.href}" class="download-btn">
                        <span class="icon">${d.icon}</span> ${d.title}
                    </a>
                `).join('');
            }

        } catch (err) {
            console.warn('Failed to load site data', err);
        }
    }

    loadSiteData();
    
    // Carousel: render slides and start autoplay
    function renderCarousel(slides) {
        const track = document.querySelector('#heroCarousel .carousel__track');
        const indicators = document.querySelector('#heroCarousel .carousel__indicators');
        if (!track || !Array.isArray(slides)) return;

        track.innerHTML = '';
        indicators.innerHTML = '';

        slides.forEach((s, i) => {
            const slide = document.createElement('section');
            slide.className = 'carousel__slide';
            slide.style.backgroundImage = `url('${s.image}')`;
            slide.setAttribute('role', 'group');
            slide.setAttribute('aria-roledescription', 'slide');
            slide.setAttribute('aria-label', `${i+1} of ${slides.length}`);

            slide.innerHTML = `
                <div class="carousel__overlay"></div>
                <div class="carousel__content container">
                    <h2>${s.title}</h2>
                    <p class="hero-subtitle">${s.subtitle}</p>
                    <p class="hero-desc">${s.description}</p>
                    <div class="cta-group">
                        <a href="${s.ctaPrimary.href}" class="btn btn-primary">${s.ctaPrimary.label}</a>
                        <a href="${s.ctaSecondary.href}" class="btn btn-secondary">${s.ctaSecondary.label}</a>
                    </div>
                </div>
            `;

            track.appendChild(slide);

            const btn = document.createElement('button');
            btn.className = 'carousel__indicator';
            btn.setAttribute('aria-label', `Go to slide ${i+1}`);
            btn.dataset.index = i;
            indicators.appendChild(btn);
        });

        // Initialize state
        initCarouselBehavior();
    }

    // Carousel behavior
    function initCarouselBehavior() {
        const carousel = document.getElementById('heroCarousel');
        const track = carousel.querySelector('.carousel__track');
        const slides = Array.from(track.children);
        const prev = carousel.querySelector('.carousel__control.prev');
        const next = carousel.querySelector('.carousel__control.next');
        const indicators = Array.from(carousel.querySelectorAll('.carousel__indicator'));
        if (!slides.length) return;

        let current = 0;
        let interval = null;
        const ms = 5000;

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            indicators.forEach((btn, i) => btn.classList.toggle('active', i === current));
        }

        function nextSlide() { goTo(current + 1); }
        function prevSlide() { goTo(current - 1); }

        next.addEventListener('click', nextSlide);
        prev.addEventListener('click', prevSlide);

        indicators.forEach(btn => btn.addEventListener('click', (e) => goTo(Number(e.currentTarget.dataset.index))));

        carousel.addEventListener('mouseenter', () => clearInterval(interval));
        carousel.addEventListener('mouseleave', () => interval = setInterval(nextSlide, ms));

        // Keyboard
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Start
        goTo(0);
        interval = setInterval(nextSlide, ms);
        carousel.setAttribute('tabindex', '0');
    }

    // Try to render hero slides from site data
    (async function tryRenderHero() {
        try {
            const resp = await fetch('./data/site.json');
            if (!resp.ok) return;
            const data = await resp.json();
            if (data && Array.isArray(data.heroSlides)) renderCarousel(data.heroSlides);
        } catch (err) {
            console.warn('Failed to render hero slides', err);
        }
    })();
});
