/**
     * ============================================================
     *  MAIN APPLICATION SCRIPT
     *  - js‑enabled class on body (progressive enhancement)
     *  - Scroll‑spy active nav link (with bottom‑of‑page fix)
     *  - Smooth reveal on scroll (Intersection Observer)
     *  - Navbar hide/show on scroll (using lastScroll)
     *  - Back‑to‑top button visibility
     *  - Smooth scroll for anchor links (single source of truth)
     * ============================================================
     */

    (function() {
        'use strict';

        // ---- 1. PROGRESSIVE ENHANCEMENT ----
        document.body.classList.add('js-enabled');

        // ---- DOM refs ----
        const navLinks = document.querySelectorAll('#mainNav .nav-link');
        const sections = document.querySelectorAll('section[id]');
        const navbar = document.getElementById('mainNav');
        const backToTop = document.getElementById('backToTop');

        /**
         * ============================================================
         *  2.  SCROLL‑SPY: highlight active nav link
         *  + bottom‑of‑page fix for Contact
         * ============================================================
         */
        function updateActiveNav() {
            let current = '';
            const scrollPos = window.scrollY + 120;
            const windowHeight = window.innerHeight;
            const docHeight = document.body.offsetHeight;

            // bottom-of-page check for Contact
            if (windowHeight + window.scrollY >= docHeight - 50) {
                current = 'contact';
            } else {
                sections.forEach(section => {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        current = section.getAttribute('id');
                    }
                });
            }

            navLinks.forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
                const href = link.getAttribute('href');
                if (href === '#' + current) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        }

        // ---- throttle scroll events ----
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateActiveNav();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // ---- run once on load ----
        window.addEventListener('load', updateActiveNav);

        /**
         * ============================================================
         *  3.  SCROLL REVEAL (Intersection Observer)
         * ============================================================
         */
        const revealElements = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));

        /**
         * ============================================================
         *  4.  NAVBAR HIDE/SHOW ON SCROLL (using lastScroll)
         * ============================================================
         */
        let lastScroll = 0;
        const scrollThreshold = 60;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // update box-shadow
            if (currentScroll > 30) {
                navbar.style.boxShadow = '0 8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(0,240,255,0.02)';
            } else {
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
            }

            // hide/show logic
            if (currentScroll > scrollThreshold && currentScroll > lastScroll) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }

            lastScroll = currentScroll;
        }, { passive: true });

        /**
         * ============================================================
         *  5.  BACK‑TO‑TOP BUTTON VISIBILITY
         * ============================================================
         */
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        /**
         * ============================================================
         *  6.  SMOOTH SCROLL FOR ANCHOR LINKS (single source of truth)
         *  CSS scroll-behavior removed; JS handles all smooth scrolling
         * ============================================================
         */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // close mobile menu if open
                    const collapse = document.getElementById('navMenu');
                    if (collapse && collapse.classList.contains('show')) {
                        const toggler = document.querySelector('.navbar-toggler');
                        if (toggler) toggler.click();
                    }
                }
            });
        });

        /**
         * ============================================================
         *  7.  CONSOLE EASTER EGG
         * ============================================================
         */
        console.log('%c⟨ Osama Ali Mohamed ⟩', 'font-size:20px; font-weight:700; color:#00f0ff;');
        console.log('%cFrontend Developer · Software Engineer', 'font-size:14px; color:#8da4c9;');
        console.log('%cBuilt with vanilla HTML, CSS, Bootstrap 5 & JavaScript', 'font-size:12px; color:#5a7298;');
        console.log('%c🔍 Ready to defend every line of code.', 'font-size:13px; color:#00f0ff;');

        const liveProjectUrls = {
            'NEXUS_CITY': 'https://osamaalidev.github.io/NEXUS_CITY/',
            'crud-system': 'https://osamaalidev.github.io/crud-system/',
            'Weather': 'https://osamaalidev.github.io/Weather/',
            'Bakery': 'https://osamaalidev.github.io/bakery/',
            'GameReview2': 'https://osamaalidev.github.io/GameReview2/',
            'GameReview': 'https://osamaalidev.github.io/GameReview/',
            'Fokir': 'https://osamaalidev.github.io/Fokir/',
            'FoodReview': 'https://osamaalidev.github.io/FoodReview/',
            'Creative-Agency': 'https://osamaalidev.github.io/creative-agency/',
            'Osama_Ali_Portfolio': 'https://osamaalidev.github.io/Osama_Ali_Portfolio/'
        };

        const projectScreenshotUrls = {
            'NEXUS_CITY': 'https://osamaalidev.github.io/NEXUS_CITY/',
            'CRUD System': 'https://osamaalidev.github.io/crud-system/',
            'Weather': 'https://osamaalidev.github.io/Weather/',
            'Bakery': 'https://osamaalidev.github.io/bakery/',
            'GameReview2': 'https://osamaalidev.github.io/GameReview2/',
            'Fokir': 'https://osamaalidev.github.io/Fokir/',
            'FoodReview': 'https://osamaalidev.github.io/FoodReview/',
            'Creative Agency': 'https://osamaalidev.github.io/creative-agency/',
            'Osama_Ali_Portfolio': 'https://osamaalidev.github.io/Osama_Ali_Portfolio/'
        };

        document.querySelectorAll('.project-row').forEach(projectRow => {
            const title = projectRow.querySelector('.project-title');
            const visual = projectRow.querySelector('.project-visual');
            if (!title || !visual || !projectScreenshotUrls[title.textContent.trim()]) return;

            const screenshot = document.createElement('img');
            screenshot.className = 'project-screenshot';
            screenshot.src = 'https://api.microlink.io/?url=' + encodeURIComponent(projectScreenshotUrls[title.textContent.trim()]) + '&screenshot=true&embed=screenshot.url';
            screenshot.alt = title.textContent.trim() + ' project screenshot';
            screenshot.loading = 'lazy';
            screenshot.onerror = () => { screenshot.style.display = 'none'; };
            visual.insertBefore(screenshot, visual.firstChild);
        });

        const gameReviewCard = document.createElement('div');
        gameReviewCard.className = 'project-row row-alt reveal visible';
        gameReviewCard.innerHTML = '<div class="project-visual"><span class="visual-badge"><i class="bi bi-controller me-1"></i> Free-to-play API</span><span class="visual-fallback-emoji">G</span><div class="visual-bg-glow"></div></div><div class="project-info"><span class="project-level beginner"><i class="bi bi-circle-fill"></i> Beginner · #6</span><h5 class="project-title">GameReview</h5><p class="project-desc">A free-to-play games browser that consumes game data through an API and presents searchable, dynamic game cards with details and launch links.</p><div class="tech-tags"><span class="tech-tag">HTML</span><span class="tech-tag">CSS</span><span class="tech-tag">Bootstrap</span><span class="tech-tag">JavaScript</span><span class="tech-tag">API</span></div><div class="project-actions"><a href="https://osamaalidev.github.io/GameReview/" target="_blank" rel="noopener noreferrer" class="btn-sm-hud accent"><i class="bi bi-box-arrow-up-right"></i> Live Demo</a><a href="https://github.com/OsamaAliDev/GameReview" target="_blank" rel="noopener noreferrer" class="btn-sm-hud"><i class="bi bi-github"></i> View GitHub</a></div></div>';
        const fokirCard = Array.from(document.querySelectorAll('.project-row')).find(row => row.querySelector('.project-title')?.textContent.trim() === 'Fokir');
        if (fokirCard) fokirCard.parentElement.insertBefore(gameReviewCard, fokirCard);

        const gameReviewScreenshot = document.createElement('img');
        gameReviewScreenshot.className = 'project-screenshot';
        gameReviewScreenshot.src = 'https://api.microlink.io/?url=' + encodeURIComponent('https://osamaalidev.github.io/GameReview/') + '&screenshot=true&embed=screenshot.url';
        gameReviewScreenshot.alt = 'GameReview project screenshot';
        gameReviewScreenshot.loading = 'lazy';
        gameReviewScreenshot.onerror = () => { gameReviewScreenshot.style.display = 'none'; };
        gameReviewCard.querySelector('.project-visual').insertBefore(gameReviewScreenshot, gameReviewCard.querySelector('.project-visual').firstChild);

        document.querySelectorAll('.project-level').forEach((level, index) => {
            level.innerHTML = level.innerHTML.replace(/#\d+/, '#' + (index + 1));
        });

        document.querySelectorAll('.project-actions a[href*="github.com"]').forEach(githubLink => {
            const repositoryName = githubLink.href.split('/').filter(Boolean).pop();
            const liveUrl = liveProjectUrls[repositoryName];
            if (!liveUrl || githubLink.parentElement.querySelector('a[href*="github.io/"]')) return;

            const liveLink = document.createElement('a');
            liveLink.href = liveUrl;
            liveLink.target = '_blank';
            liveLink.rel = 'noopener noreferrer';
            liveLink.className = 'btn-sm-hud accent';
            liveLink.innerHTML = '<i class="bi bi-box-arrow-up-right"></i> Live Demo';
            githubLink.classList.remove('accent');
            githubLink.parentElement.insertBefore(liveLink, githubLink);
        });

        /**
         * ============================================================
         *  8.  VERIFY PROJECT LINKS (log only — no 404 check possible client‑side)
         * ============================================================
         */
        const projectUrls = [
            'https://github.com/OsamaAliDev/NEXUS_CITY',
            'https://github.com/OsamaAliDev/crud-system',
            'https://github.com/OsamaAliDev/Weather',
            'https://github.com/OsamaAliDev/Bakery',
            'https://github.com/OsamaAliDev/GameReview2',
            'https://github.com/OsamaAliDev/GameReview',
            'https://github.com/OsamaAliDev/Fokir',
            'https://github.com/OsamaAliDev/FoodReview',
            'https://github.com/OsamaAliDev/Creative-Agency',
            'https://github.com/OsamaAliDev/Osama_Ali_Portfolio'
        ];
        console.log('%c📦 Project URLs (verify manually):', 'font-weight:600; color:#8da4c9;');
        projectUrls.forEach(url => console.log('  ' + url));

    })();
