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

    // Animate to section when nav is clicked
    $('header a').click(function (e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

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
        var card_index = parseInt($("input[name='card-set']:checked")[0].id.substring(5));
        var num_projects = $('input[name=card-set]').length;
        $('#card-' + ((card_index - 1 < 0) ? (num_projects + (card_index - 1)) : (card_index - 1)))[0].checked = true;
    });

    // Shows previous project card
    $('#prev-project-mobile').click(function (e) {
        var card_index = parseInt($("input[name='card-set']:checked")[0].id.substring(5));
        var num_projects = $('input[name=card-set]').length;
        $('#card-' + ((card_index - 1 < 0) ? (num_projects + (card_index - 1)) : (card_index - 1)))[0].checked = true;
    });

    // Shows next project card
    $('#next-project').click(function (e) {
        var card_index = parseInt($("input[name='card-set']:checked")[0].id.substring(5));
        var num_projects = $('input[name=card-set]').length;
        $('#card-' + ((card_index + 1) % num_projects))[0].checked = true;
    });

    // Shows next project card
    $('#next-project-mobile').click(function (e) {
        var card_index = parseInt($("input[name='card-set']:checked")[0].id.substring(5));
        var num_projects = $('input[name=card-set]').length;
        $('#card-' + ((card_index + 1) % num_projects))[0].checked = true;
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

document.body.addEventListener('click', function (event) {
    // filter out clicks on any other elements
    if (event.target.getAttribute('aria-disabled') == 'true') {
        event.preventDefault();
    }
});