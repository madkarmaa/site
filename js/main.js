"use strict";

window.sr = ScrollReveal({ reset: true });

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
    navigator.userAgent
  );

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

function customCursor() {
  const cursorFollow = $(".cursor-follow");
  const cursor = $(".cursor");

  cursor.fadeIn(250);
  cursorFollow.fadeIn(250);

  $(document)
    .on("mousemove", (e) => {
      const x = e.pageX;
      const y = e.pageY;
      cursor.css({ left: x, top: y });
      setTimeout(() => {
        cursorFollow.css({ left: x, top: y });
      }, 100);
    })
    .on("mouseenter", () => {
      cursor.finish().fadeIn(250);
      cursorFollow.finish().fadeIn(250);
    })
    .on("mouseleave", () => {
      cursor.finish().fadeOut(250);
      cursorFollow.finish().fadeOut(250);
    });

  $('[class*="action"]')
    .on("mouseenter", () => {
      cursorFollow.finish().animate({ height: "40px", width: "40px" }, 250);
    })
    .on("mouseleave", () => {
      cursorFollow.finish().animate({ height: "25px", width: "25px" }, 250);
    });
}

if (!isMobile) {
  customCursor();
}

$(() => {
  const title = $(".title");
  const greetings = ["Hi", "Hello", "Hey", "Yo"];

  title.fadeIn(800).on("dblclick", () => {
    title.fadeOut(250, () => {
      title.text(choose(greetings) + " :)").fadeIn(250);
    });
  });
});

$(() => {
  $("footer").on("click", () => {
    window.open("https://github.com/madkarmaa", "_blank");
  });
});

$(() => {
  $(window).on("keypress", function (e) {
    if (e.key === "m" || e.key === "M") {
      let input = e.key;
      $(window).on("keypress", function (e) {
        input += e.key;
        if (input === "magic") {
          console.log("Hello there!");
        }
      });
    }
  });
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
