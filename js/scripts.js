/*!
    Title: Dev Portfolio Template
    Version: 1.2.1
    Last Change: 08/27/2017
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function ($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Scroll to first element
    $('#lead-down span').click(function () {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function () {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function () {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function () {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function () {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">' + date + '</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function () {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function () {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function (e) {
        e.preventDefault();
        $(this).fadeOut(300, function () {
            $('#more-projects').fadeIn(300);
        });
    });

    // Shows previous project card
    $('#prev-project').click(function (e) {
        prevCard();
    });

    // Shows previous project card
    $('#prev-project-mobile').click(function (e) {
        prevCard();
    });

    // Shows next project card
    $('#next-project').click(function (e) {
        nextCard();
    });

    // Shows next project card
    $('#next-project-mobile').click(function (e) {
        nextCard();
    });

    $(function () {
        "use strict";
        var t = $(window);
        function o() {
            $("#home").css({
                height: window.innerHeight + "px"
            })
        }
        o();
        t.resize(o);
    });
})(jQuery);

function nextCard() {
    var card_index = parseInt($("input[name='card-set']:checked")[0].id.substring(5));
    var num_projects = $('input[name=card-set]').length;
    $('#card-' + ((card_index + 1) % num_projects))[0].checked = true;
}

function prevCard() {
    var card_index = parseInt($("input[name='card-set']:checked")[0].id.substring(5));
    var num_projects = $('input[name=card-set]').length;
    $('#card-' + ((card_index - 1 < 0) ? (num_projects + (card_index - 1)) : (card_index - 1)))[0].checked = true;
}

document.body.addEventListener('click', function (event) {
    // filter out clicks on any other elements
    if (event.target.getAttribute('aria-disabled') == 'true') {
        event.preventDefault();
    }
});

$(function () {
    $.scrollIt();
});

var view_height = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', view_height + 'px');
/*
window.addEventListener('resize', function () {
    var view_height = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', view_height + 'px');
});
*/

// Projects swipe listener
var cards = document.querySelectorAll('[card]');
cards.forEach(function (card) {
    card.addEventListener('touchstart', handleTouchStart, false);
    card.addEventListener('touchmove', handleTouchMove, false);
});

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    var firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            nextCard();
        } else {
            /* right swipe */
            prevCard();
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};