"use strict";

$(() => {
  if (isMobile) {
    $(".settings-menu").css("width", "100%");
    $(".title").css("font-size", "7vmax");
    $('label[for="custom-cursor"]').hide();
    $('div[id="custom-cursor"]').hide();
    // $(".text-container:has(.container-content)").css("top", "50%");
  }
});
