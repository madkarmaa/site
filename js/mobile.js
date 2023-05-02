"use strict";

$(() => {
  if (isMobile) {
    $(".noselect.settings-menu").css("width", "100%");
    $(".title").css("font-size", "7vmax");
    $('label[for="custom-cursor"]').hide();
    $('div[id="custom-cursor"]').hide();
    $(".text-container").css("top", "27.5%");
  }
});
