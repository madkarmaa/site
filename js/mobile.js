"use strict";

$(() => {
  if (isMobile) {
    $(".settings-menu").css("width", "100%");
    $(".title").css("font-size", "7vmax");
    $('label[for="custom-cursor"]').hide();
    $('div[id="custom-cursor"]').hide();
    $(".profile-card").css("width", "100%"); // FIXME: css property not being set
  }
});
