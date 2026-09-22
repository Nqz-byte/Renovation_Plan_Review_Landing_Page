document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNavigation = document.querySelector(".main-navigation");

    if (header) {
        function updateHeader() {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        updateHeader();
        window.addEventListener("scroll", updateHeader);
    }

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener("click", function () {
            mainNavigation.classList.toggle("active");
            menuToggle.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });

        mainNavigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mainNavigation.classList.remove("active");
                menuToggle.classList.remove("active");
                document.body.classList.remove("menu-open");
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Hero inspection markers
    const heroMarkers = document.querySelectorAll(".hero-marker");
    const heroInspectionPanel = document.querySelector(".hero-inspection-panel");

    heroMarkers.forEach(function (marker) {
        marker.addEventListener("click", function () {
            const type = this.dataset.type;
            const title = this.dataset.title;
            const description = this.dataset.description;

            heroMarkers.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            if (heroInspectionPanel) {
                const panelTitle = heroInspectionPanel.querySelector(".inspection-title");
                const panelDescription = heroInspectionPanel.querySelector(".inspection-description");

                if (panelTitle) {
                    panelTitle.textContent = title || type || "Lighting Opportunity";
                }

                if (panelDescription) {
                    panelDescription.textContent = description || "";
                }

                heroInspectionPanel.classList.add("active");
            }
        });
    });

    // Local MP4 video
    const videoContainer = document.querySelector(".hero-video");
    const videoPlayer = document.querySelector(".hero-video-player");
    const videoButton = document.querySelector(".video-play-button");

    if (videoContainer && videoPlayer && videoButton) {
        videoButton.addEventListener("click", function () {
            if (videoPlayer.paused) {
                videoPlayer.play();
                videoContainer.classList.add("playing");
            } else {
                videoPlayer.pause();
            }
        });

        videoPlayer.addEventListener("play", function () {
            videoContainer.classList.add("playing");
        });

        videoPlayer.addEventListener("pause", function () {
            videoContainer.classList.remove("playing");
        });

        videoPlayer.addEventListener("ended", function () {
            videoContainer.classList.remove("playing");
        });
    }

    // Opportunity map
    const opportunityHotspots = document.querySelectorAll(".opportunity-hotspot");
    const opportunityPanel = document.querySelector(".opportunity-panel");

    opportunityHotspots.forEach(function (hotspot) {
        hotspot.addEventListener("click", function () {
            const title = this.dataset.title;
            const category = this.dataset.category;
            const description = this.dataset.description;

            opportunityHotspots.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            if (opportunityPanel) {
                const panelTitle = opportunityPanel.querySelector(".opportunity-title");
                const panelCategory = opportunityPanel.querySelector(".opportunity-category");
                const panelDescription = opportunityPanel.querySelector(".opportunity-description");

                if (panelTitle) {
                    panelTitle.textContent = title || "AREA";
                }

                if (panelCategory) {
                    panelCategory.textContent = category || "";
                }

                if (panelDescription) {
                    panelDescription.textContent = description || "";
                }

                opportunityPanel.classList.add("active");
            }
        });
    });

    // 2AM Test scroll narrative
    const twoAmSection = document.querySelector(".two-am-section");
    const twoAmOutput = document.querySelector(".two-am-output");
    const twoAmLabel = document.querySelector(".two-am-label");

    if (twoAmSection && twoAmOutput) {
        function updateTwoAmProgress() {
            const rect = twoAmSection.getBoundingClientRect();
            const sectionHeight = twoAmSection.offsetHeight;
            const viewportHeight = window.innerHeight;

            const start = viewportHeight * 0.8;
            const end = -sectionHeight * 0.35;
            const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

            if (progress < 0.33) {
                twoAmOutput.textContent = "100%";
                if (twoAmLabel) {
                    twoAmLabel.textContent = "LIGHT OUTPUT";
                }
            } else if (progress < 0.66) {
                twoAmOutput.textContent = "RIGHT LEVEL";
                if (twoAmLabel) {
                    twoAmLabel.textContent = "";
                }
            } else {
                twoAmOutput.textContent = "RIGHT TIME";
                if (twoAmLabel) {
                    twoAmLabel.textContent = "";
                }
            }

            twoAmSection.style.setProperty("--scan-progress", progress);
        }

        updateTwoAmProgress();
        window.addEventListener("scroll", updateTwoAmProgress);
    }

    // Before / After slider
    const beforeAfterVisual = document.querySelector(".before-after-visual");
    const beforeImage = document.querySelector(".before-image");
    const comparisonHandle = document.querySelector(".comparison-handle");

    if (beforeAfterVisual && beforeImage && comparisonHandle) {
        let isDragging = false;

        function updateComparison(clientX) {
            const rect = beforeAfterVisual.getBoundingClientRect();
            let position = clientX - rect.left;

            position = Math.max(0, Math.min(position, rect.width));

            const percentage = (position / rect.width) * 100;

            beforeImage.style.width = percentage + "%";
            comparisonHandle.style.left = percentage + "%";
        }

        function startDrag(event) {
            isDragging = true;
            event.preventDefault();
        }

        function stopDrag() {
            isDragging = false;
        }

        comparisonHandle.addEventListener("mousedown", startDrag);
        comparisonHandle.addEventListener("touchstart", startDrag, { passive: false });

        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);

        document.addEventListener("mousemove", function (event) {
            if (!isDragging) {
                return;
            }

            updateComparison(event.clientX);
        });

        document.addEventListener("touchmove", function (event) {
            if (!isDragging) {
                return;
            }

            updateComparison(event.touches[0].clientX);
        }, { passive: false });

        beforeAfterVisual.addEventListener("click", function (event) {
            if (event.target === comparisonHandle) {
                return;
            }

            updateComparison(event.clientX);
        });
    }

    // FAQ
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

    // Form validation
    const estimateForm = document.querySelector(".estimate-form");

    if (estimateForm) {
        estimateForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fields = [
                {
                    selector: '[name="name"]',
                    message: "Please enter your name."
                },
                {
                    selector: '[name="email"]',
                    message: "Please enter a valid work email."
                },
                {
                    selector: '[name="phone"]',
                    message: "Please enter your phone number."
                },
                {
                    selector: '[name="property"]',
                    message: "Please enter your property or site."
                },
                {
                    selector: '[name="project"]',
                    message: "Please tell us about the project."
                }
            ];

            let isValid = true;

            fields.forEach(function (field) {
                const input = estimateForm.querySelector(field.selector);

                if (!input) {
                    return;
                }

                clearFieldError(input);

                if (input.value.trim() === "") {
                    showFieldError(input, field.message);
                    isValid = false;
                }

                if (input.type === "email" && input.value.trim() !== "") {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailPattern.test(input.value.trim())) {
                        showFieldError(input, field.message);
                        isValid = false;
                    }
                }
            });

            if (!isValid) {
                const firstError = estimateForm.querySelector(".input-error");

                if (firstError) {
                    firstError.focus();
                }

                return;
            }

            showFormSuccess(estimateForm);
        });
    }

    document.querySelectorAll(".form-input, .form-textarea, .form-select").forEach(function (input) {
        input.addEventListener("input", function () {
            clearFieldError(input);
        });

        input.addEventListener("change", function () {
            clearFieldError(input);
        });
    });

    // Reveal animation
    const revealElements = document.querySelectorAll(
        ".review-item, .opportunity-hotspot, .inspection-item, .journey-step, .faq-item, .project-file"
    );

    if ("IntersectionObserver" in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    }

    // Current year
    const footerYear = document.querySelector(".footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});

function showFieldError(input, message) {
    input.classList.add("input-error");

    let error = input.parentElement.querySelector(".form-error");

    if (!error) {
        error = document.createElement("small");
        error.className = "form-error";
        input.parentElement.appendChild(error);
    }

    error.textContent = message;
}

function clearFieldError(input) {
    input.classList.remove("input-error");

    const error = input.parentElement.querySelector(".form-error");

    if (error) {
        error.remove();
    }
}

function showFormSuccess(form) {
    const existingMessage = form.querySelector(".form-success");

    if (existingMessage) {
        existingMessage.remove();
    }

    const successMessage = document.createElement("div");
    successMessage.className = "form-success";
    successMessage.innerHTML = `
        <strong>Thank you for your enquiry.</strong>
        <span>Your information has been received and is ready for review.</span>
    `;

    form.insertBefore(successMessage, form.firstChild);
    form.reset();

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}