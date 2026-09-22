document.addEventListener("DOMContentLoaded", function () {

    // === MOBILE NAVIGATION ===
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNavigation = document.querySelector(".main-navigation");

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener("click", function () {
            const isOpen = mainNavigation.classList.toggle("active");

            if (isOpen) {
                mainNavigation.style.display = "flex";
                mainNavigation.style.position = "absolute";
                mainNavigation.style.top = "65px";
                mainNavigation.style.left = "0";
                mainNavigation.style.width = "100%";
                mainNavigation.style.padding = "20px";
                mainNavigation.style.flexDirection = "column";
                mainNavigation.style.alignItems = "flex-start";
                mainNavigation.style.gap = "18px";
                mainNavigation.style.background = "#03243c";
                mainNavigation.style.borderTop = "1px solid rgba(255,255,255,0.1)";
            } else {
                mainNavigation.removeAttribute("style");
            }
        });

        mainNavigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mainNavigation.classList.remove("active");
                mainNavigation.removeAttribute("style");
            });
        });
    }

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                const header = document.querySelector(".site-header");
                const headerHeight = header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // === HERO VIDEO ===
    const heroVideo = document.querySelector(".hero-video");
    const videoPlayer = document.querySelector(".hero-video-player");
    const videoButton = document.querySelector(".video-play-button");

    if (heroVideo && videoPlayer && videoButton) {
        videoButton.addEventListener("click", function () {
            if (videoPlayer.paused) {
                videoPlayer.play();
                heroVideo.classList.add("playing");
                videoButton.style.opacity = "0";
                videoButton.style.pointerEvents = "none";
            } else {
                videoPlayer.pause();
            }
        });

        videoPlayer.addEventListener("pause", function () {
            heroVideo.classList.remove("playing");
            videoButton.style.opacity = "1";
            videoButton.style.pointerEvents = "auto";
        });

        videoPlayer.addEventListener("ended", function () {
            heroVideo.classList.remove("playing");
            videoButton.style.opacity = "1";
            videoButton.style.pointerEvents = "auto";
        });
    }

    // === BEFORE / AFTER SLIDER ===
    const comparison = document.querySelector(".before-after-visual");
    const beforeImage = document.querySelector(".before-image");
    const comparisonHandle = document.querySelector(".comparison-handle");

    if (comparison && beforeImage && comparisonHandle) {
        let dragging = false;

        function updateComparison(clientX) {
            const rect = comparison.getBoundingClientRect();
            let position = clientX - rect.left;

            position = Math.max(0, Math.min(position, rect.width));

            const percentage = (position / rect.width) * 100;

            beforeImage.style.width = percentage + "%";
            comparisonHandle.style.left = percentage + "%";
        }

        comparisonHandle.addEventListener("mousedown", function (event) {
            event.preventDefault();
            dragging = true;
        });

        document.addEventListener("mouseup", function () {
            dragging = false;
        });

        document.addEventListener("mousemove", function (event) {
            if (dragging) {
                updateComparison(event.clientX);
            }
        });

        comparisonHandle.addEventListener("touchstart", function (event) {
            dragging = true;
            event.preventDefault();
        }, { passive: false });

        document.addEventListener("touchend", function () {
            dragging = false;
        });

        document.addEventListener("touchmove", function (event) {
            if (dragging) {
                updateComparison(event.touches[0].clientX);
            }
        }, { passive: false });

        comparison.addEventListener("click", function (event) {
            if (event.target.closest(".comparison-handle")) {
                return;
            }

            updateComparison(event.clientX);
        });
    }

    // === TESTIMONIAL ===
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const testimonialControls = document.querySelectorAll(".testimonial-controls button");

    let currentTestimonial = 0;

    if (testimonialCards.length > 1) {
        function showTestimonial(index) {
            testimonialCards.forEach(function (card, cardIndex) {
                card.style.display = cardIndex === index ? "block" : "none";
            });
        }

        showTestimonial(currentTestimonial);

        if (testimonialControls.length >= 2) {
            testimonialControls[0].addEventListener("click", function () {
                currentTestimonial--;

                if (currentTestimonial < 0) {
                    currentTestimonial = testimonialCards.length - 1;
                }

                showTestimonial(currentTestimonial);
            });

            testimonialControls[1].addEventListener("click", function () {
                currentTestimonial++;

                if (currentTestimonial >= testimonialCards.length) {
                    currentTestimonial = 0;
                }

                showTestimonial(currentTestimonial);
            });
        }
    }

    // === FAQ ===
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {
        item.addEventListener("toggle", function () {
            if (!item.open) {
                return;
            }

            faqItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.removeAttribute("open");
                }
            });
        });
    });

    // === FORM VALIDATION ===
    const estimateForm = document.querySelector(".estimate-form");

    if (estimateForm) {
        estimateForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.querySelector("#name");
            const email = document.querySelector("#email");
            const phone = document.querySelector("#phone");
            const property = document.querySelector("#property");
            const project = document.querySelector("#project");

            let valid = true;

            clearFormErrors();

            if (name.value.trim() === "") {
                showFormError(name, "Please enter your name.");
                valid = false;
            }

            if (email.value.trim() === "") {
                showFormError(email, "Please enter your email.");
                valid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showFormError(email, "Please enter a valid email.");
                valid = false;
            }

            if (phone.value.trim() === "") {
                showFormError(phone, "Please enter your phone number.");
                valid = false;
            }

            if (property.value === "") {
                showFormError(property, "Please select a property type.");
                valid = false;
            }

            if (project.value.trim() === "") {
                showFormError(project, "Please tell us about the project.");
                valid = false;
            }

            if (valid) {
                showFormSuccess();
            }
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormError(input, message) {
        input.style.borderColor = "#df4040";

        const error = document.createElement("small");
        error.className = "form-error";
        error.textContent = message;

        input.parentElement.appendChild(error);
    }

    function clearFormErrors() {
        document.querySelectorAll(".form-error").forEach(function (error) {
            error.remove();
        });

        document.querySelectorAll(".estimate-form input, .estimate-form select, .estimate-form textarea").forEach(function (input) {
            input.style.borderColor = "";
        });
    }

    function showFormSuccess() {
        const existingMessage = document.querySelector(".form-success");

        if (existingMessage) {
            existingMessage.remove();
        }

        const message = document.createElement("div");

        message.className = "form-success";

        message.innerHTML = `
            <strong>Thank you for your enquiry.</strong>
            <span>We've received your information and will review your project.</span>
        `;

        estimateForm.insertBefore(message, estimateForm.firstChild);

        estimateForm.reset();

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    // === HEADER SCROLL ===
    const header = document.querySelector(".site-header");

    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // === FOOTER YEAR ===
    const footerYear = document.querySelector(".footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});