document.addEventListener("DOMContentLoaded", function () {

    /* MOBILE NAVIGATION */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNavigation = document.querySelector(".main-navigation");

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener("click", function () {
            mainNavigation.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        const navigationLinks = mainNavigation.querySelectorAll("a");

        navigationLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                mainNavigation.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       VSL VIDEO
    ===================================================== */

    const videoContainer = document.querySelector(".hero-video");
    const videoPlayer = document.querySelector(".hero-video-player");
    const videoButton = document.querySelector(".video-play-button");

    if (videoContainer && videoPlayer && videoButton) {
        videoButton.addEventListener("click", function () {
            videoPlayer.play();
            videoContainer.classList.add("playing");
        });

        videoPlayer.addEventListener("pause", function () {
            videoContainer.classList.remove("playing");
        });

        videoPlayer.addEventListener("ended", function () {
            videoContainer.classList.remove("playing");
        });
    }


    /* =====================================================
       BEFORE / AFTER SLIDER
    ===================================================== */

    const comparisonHandle = document.querySelector(".comparison-handle");
    const beforeAfterVisual = document.querySelector(".before-after-visual");
    const beforeImage = document.querySelector(".before-image");

    if (
        comparisonHandle &&
        beforeAfterVisual &&
        beforeImage
    ) {

        let isDragging = false;

        function updateComparison(clientX) {

            const rect = beforeAfterVisual.getBoundingClientRect();

            let position = clientX - rect.left;

            if (position < 0) {
                position = 0;
            }

            if (position > rect.width) {
                position = rect.width;
            }

            const percentage = (position / rect.width) * 100;

            beforeImage.style.width = percentage + "%";
            comparisonHandle.style.left = percentage + "%";
        }

        comparisonHandle.addEventListener("mousedown", function () {
            isDragging = true;
        });

        document.addEventListener("mouseup", function () {
            isDragging = false;
        });

        document.addEventListener("mousemove", function (event) {

            if (!isDragging) {
                return;
            }

            updateComparison(event.clientX);
        });


        comparisonHandle.addEventListener("touchstart", function (event) {
            isDragging = true;
            event.preventDefault();
        }, {
            passive: false
        });

        document.addEventListener("touchend", function () {
            isDragging = false;
        });

        document.addEventListener("touchmove", function (event) {

            if (!isDragging) {
                return;
            }

            updateComparison(event.touches[0].clientX);
        }, {
            passive: false
        });


        beforeAfterVisual.addEventListener("click", function (event) {

            if (event.target === comparisonHandle) {
                return;
            }

            updateComparison(event.clientX);
        });
    }


    /* =====================================================
       TESTIMONIAL SLIDER
    ===================================================== */

    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const testimonialButtons = document.querySelectorAll(".testimonial-controls button");

    let currentTestimonial = 0;

    if (testimonialCards.length > 0) {

        function showTestimonial(index) {

            testimonialCards.forEach(function (card) {
                card.style.display = "none";
            });

            testimonialCards[index].style.display = "flex";

            testimonialButtons.forEach(function (button) {
                button.classList.remove("active");
            });
        }

        showTestimonial(currentTestimonial);

        if (testimonialButtons.length >= 2) {

            testimonialButtons[0].addEventListener("click", function () {

                currentTestimonial--;

                if (currentTestimonial < 0) {
                    currentTestimonial = testimonialCards.length - 1;
                }

                showTestimonial(currentTestimonial);
            });

            testimonialButtons[1].addEventListener("click", function () {

                currentTestimonial++;

                if (currentTestimonial >= testimonialCards.length) {
                    currentTestimonial = 0;
                }

                showTestimonial(currentTestimonial);
            });
        }
    }


    /* =====================================================
       FAQ
    ===================================================== */

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


    /* =====================================================
       ESTIMATE FORM
    ===================================================== */

    const estimateForm = document.querySelector(".estimate-form");

    if (estimateForm) {

        estimateForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameInput = estimateForm.querySelector(
                'input[name="name"]'
            );

            const phoneInput = estimateForm.querySelector(
                'input[name="phone"]'
            );

            const emailInput = estimateForm.querySelector(
                'input[name="email"]'
            );

            const propertyInput = estimateForm.querySelector(
                'input[name="property"]'
            );

            const projectInput = estimateForm.querySelector(
                'textarea[name="project"]'
            );


            let isValid = true;


            /* NAME */

            if (nameInput && nameInput.value.trim() === "") {
                showError(nameInput, "Please enter your name.");
                isValid = false;
            } else if (nameInput) {
                clearError(nameInput);
            }


            /* PHONE */

            if (phoneInput && phoneInput.value.trim() === "") {
                showError(phoneInput, "Please enter your phone number.");
                isValid = false;
            } else if (phoneInput) {
                clearError(phoneInput);
            }


            /* EMAIL */

            if (emailInput) {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    emailInput.value.trim() === "" ||
                    !emailPattern.test(emailInput.value.trim())
                ) {
                    showError(
                        emailInput,
                        "Please enter a valid email address."
                    );

                    isValid = false;

                } else {
                    clearError(emailInput);
                }
            }


            /* PROPERTY */

            if (propertyInput && propertyInput.value.trim() === "") {
                showError(
                    propertyInput,
                    "Please enter your property details."
                );

                isValid = false;

            } else if (propertyInput) {
                clearError(propertyInput);
            }


            /* PROJECT */

            if (projectInput && projectInput.value.trim() === "") {

                showError(
                    projectInput,
                    "Please tell us a little about your project."
                );

                isValid = false;

            } else if (projectInput) {
                clearError(projectInput);
            }


            /* SUCCESS */

            if (isValid) {
                showFormSuccess(estimateForm);
            }

        });
    }


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const footerYear = document.querySelector(".footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

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

});

function closeVideoModal(modal) {

    modal.classList.remove("active");

    setTimeout(function () {

        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }

    }, 300);
}


/* =========================================================
   FORM ERROR
========================================================= */

function showError(input, message) {

    input.classList.add("input-error");

    let errorMessage =
        input.parentElement.querySelector(".form-error");

    if (!errorMessage) {

        errorMessage = document.createElement("small");

        errorMessage.className = "form-error";

        input.parentElement.appendChild(errorMessage);
    }

    errorMessage.textContent = message;
}


function clearError(input) {

    input.classList.remove("input-error");

    const errorMessage =
        input.parentElement.querySelector(".form-error");

    if (errorMessage) {
        errorMessage.remove();
    }
}


/* =========================================================
   FORM SUCCESS
========================================================= */

function showFormSuccess(form) {

    const existingMessage =
        form.querySelector(".form-success");

    if (existingMessage) {
        existingMessage.remove();
    }

    const successMessage =
        document.createElement("div");

    successMessage.className = "form-success";

    successMessage.innerHTML = `
        <strong>Thanks for your enquiry.</strong>
        <span>
            We'll review your information and get back to you shortly.
        </span>
    `;

    form.insertBefore(
        successMessage,
        form.firstChild
    );

    form.reset();

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}