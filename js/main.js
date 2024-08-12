(function ($) {
    "use strict";

    // Show/hide the navbar based on scroll position
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Smooth scrolling for navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    // Initialize typed.js for animated text typing effect
    if ($('.typed-text-output').length === 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Modal video handling
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        // Auto-play video when the modal is shown
        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        });

        // Stop video when the modal is hidden
        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        });
    });

    // Show/hide the scroll-to-bottom button based on scroll position
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });

    // Animate skill bars on scroll using waypoint.js
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });

    // Initialize Isotope for portfolio filtering
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    // Filter portfolio items on button click
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

    // Show/hide the back-to-top button based on scroll position
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    // Smooth scroll to the top when back-to-top button is clicked
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Initialize testimonial carousel with owlCarousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
})(jQuery);

// Dark mode toggle functionality
function toggleMode() {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');

    const headElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headElements.forEach(element => {
        element.classList.toggle('dark-mode');
    });
}
document.getElementById("toggle").addEventListener("click", toggleMode);

// Hide intro animation after 3 seconds on page load
window.onload = function () {
    setTimeout(function () {
        document.querySelector('.intro-animation').style.display = 'none';
    }, 3000);
};

// Initialize Isotope for skill filtering and tooltips
$(document).ready(function () {
    var $grid = $('.skill-container').isotope({
        itemSelector: '.skill-item',
        layoutMode: 'fitRows'
    });

    // Filter skill items on button click
    $('#skill-flters li').on('click', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $('#skill-flters li').removeClass('active');
        $(this).addClass('active');
    });

    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
});

// Scroll-based animation for the 'About' section
document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector('.scroll-animation');

    function revealSection() {
        const sectionPos = aboutSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        // Add animation class when the section is in view
        if (sectionPos < screenPos) {
            aboutSection.classList.add('animate__fadeInUp');
        }
    }

    // Listen for scroll events to trigger the animation
    window.addEventListener('scroll', revealSection);
});
