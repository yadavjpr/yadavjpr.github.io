(function ($) {
  // Remove no-js class
  $("html").removeClass("no-js");

  // Create timeline
  $("#experience-timeline").each(function () {
    $this = $(this); // Store reference to this
    $userContent = $this.children("div"); // user content

    // Create each timeline block
    $userContent.each(function () {
      $(this)
        .addClass("vtimeline-content")
        .wrap(
          '<div class="vtimeline-point"><div class="vtimeline-block"></div></div>'
        );
    });

    // Add icons to each block
    $this.find(".vtimeline-point").each(function () {
      $(this).prepend('<div class="vtimeline-icon" />');
    });

    // Add dates to the timeline if exists
    $this.find(".vtimeline-content").each(function () {
      var date = $(this).data("date");
      if (date) {
        // Prepend if exists
        $(this)
          .parent()
          .prepend('<span class="vtimeline-date">' + date + "</span>");
      }
    });
  });

  // Open mobile menu
  $("#mobile-menu-open").click(function () {
    $("header, body").removeClass("inactive");
    $("header, body").addClass("active");
  });

  // Close mobile menu
  $("#mobile-menu-close").click(function () {
    $("header, body").removeClass("active");
    $("header, body").addClass("inactive");
    setTimeout(function () {
      $("header, body").removeClass("inactive");
    }, 750);
  });

  $("header a").click(function () {
    $("header, body").removeClass("active");
    $("header, body").addClass("inactive");
    setTimeout(function () {
      $("header, body").removeClass("inactive");
    }, 750);
  });

  $(function () {
    "use strict";
    var t = $(window);
    function o() {
      $("#home").css({
        height: window.innerHeight + "px",
      });
    }
    o();
    t.resize(o);
  });
})(jQuery);

// Disable click on items with aria-disabled="true"
document.body.addEventListener("click", function (event) {
  if (event.target.getAttribute("aria-disabled") == "true") {
    event.preventDefault();
  }
});

// Scrollit
$(function () {
  $.scrollIt();
});

var view_height = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", view_height + "px");
