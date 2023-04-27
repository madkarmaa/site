"use strict";

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
  const colors = ["#885fff", "#5215fc", "#410ed3"];

  $('[class*="card"]')
    .toArray()
    .forEach((card) => {
      const color = choose(colors);

      $(card)
        .css({
          border: `1px solid ${color}`,
          boxShadow: `0 3px 15px 2px ${color}`,
        })
        .on("mouseover", () => {
          $(card).finish().animate({ backgroundColor: color }, 250);
        })
        .on("mouseleave", () => {
          $(card).finish().animate({ backgroundColor: "transparent" }, 250);
        });
    });
});

$(() => {
  ScrollReveal({ reset: true });
  const cards = $('[class*="card"]').toArray();

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    ScrollReveal().reveal(card, { duration: 1000, delay: 200 * i });
  }
});

$(() => {
  $('footer[class="action noselect"]').on("click", () => {
    window.open("https://github.com/madkarmaa", "_blank");
  });
});
