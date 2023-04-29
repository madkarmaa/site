"use strict";

$(() => {
  const pages = $('section[id^="section"]').toArray();

  for (let i = 1; i < pages.length; i++) {
    const page = pages[i];
    $(page).append('<div class="bg-container"></div>');
  }
});

$(() => {
  const cards = $(".bg-container").toArray();

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    sr.reveal(card, {
      duration: 1000,
      origin: "bottom",
      distance: "300px",
      delay: 300,
    });
  }
});

$(() => {
  const settingsButton = $(".settings-button");
  const settingsMenu = $(".settings-menu");
  const settingsButtonSpan = $(".settings-button span");
  let wasScrolled = true;

  $(window).on("scroll", () => {
    if ($(this).scrollTop() > 0 && !wasScrolled) {
      wasScrolled = true;

      settingsMenu.hide("slide", { direction: "right" }, 250, () => {
        settingsButton.prop("disabled", false);
      });

      settingsButtonSpan.fadeOut(250, () => {
        settingsButtonSpan
          .text(
            $(settingsButtonSpan).text().trim() === "settings"
              ? "close"
              : "settings"
          )
          .fadeIn(250);
      });
    }
  });

  settingsButton.on("click", () => {
    settingsButton.prop("disabled", true);

    settingsMenu.toggle("slide", { direction: "right" }, 250, () => {
      settingsButton.prop("disabled", false);
    });

    settingsButtonSpan.fadeOut(250, () => {
      settingsButtonSpan
        .text(
          $(settingsButtonSpan).text().trim() === "settings"
            ? "close"
            : "settings"
        )
        .fadeIn(250, () => {
          wasScrolled = $(settingsButtonSpan).text().trim() === "settings";
        });
    });
  });
});
