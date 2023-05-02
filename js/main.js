"use strict";

window.sr = ScrollReveal({ reset: true });

const isMobile = navigator.userAgentData.mobile;

(function animateTitle(title) {
  let i = 0;
  const intervalId = setInterval(function () {
    document.title = title.slice(0, i + 1);
    i++;
    if (i >= title.length) {
      clearInterval(intervalId);
      setTimeout(function () {
        animateTitle(title);
      }, 2000);
    }
  }, 300);
})("mk_");

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

$(() => {
  $("footer").on("click", () => {
    window.open("https://github.com/madkarmaa", "_blank");
  });
});

$(() => {
  const pageArrows = [];

  $('section[id^="section"]').each(function () {
    pageArrows.push($(this).find('a[class*="next-page"]'));
  });

  pageArrows.forEach((el, index) => {
    const redirectTo = "#section" + (index + 2).toString().padStart(2, "0");

    $(el).on("click", () => {
      if (index == pageArrows.length - 1) {
        window.location.href = "#section01";
      } else {
        window.location.href = redirectTo;
      }
    });
  });
});
