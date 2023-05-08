"use strict";

$(() => {
  if (isMobile) {
    $(".settings-menu").css("width", "100%");
    $(".title").css("font-size", "7vmax");
    $('label[for="custom-cursor"]').hide();
    $('div[id="custom-cursor"]').hide();
    $(".text-container > .container-content").css("font-size", "smaller");
    $(".text-container:has(.container-content)").css("top", "45%");

    // screen.orientation.lock("portrait");

    $(window).on("orientationchange", () => {
      if (screen.availHeight < screen.availWidth) {
        alert("Please use portrait!");
      }
    });
  } else {
    // Also present in the CSS file, but has compatibility issues.
    $(".text-container:has(.container-content)").css("top", "40%");
  }
});
