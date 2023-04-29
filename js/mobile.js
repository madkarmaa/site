"use strict";

$(() => {
  const settingsMenu = $(".settings-menu");

  if (isMobile) {
    $(document).on("touchmove", (e) => {
      e.preventDefault();
    });

    settingsMenu.css("width", "100%");
    $('label[for="custom-cursor"]').hide();
    $('div[id="custom-cursor"]').hide();
  }
});
