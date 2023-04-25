"use strict";

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

const cursorFollow = $(".cursor-follow");
const cursor = $(".cursor");
const title = $(".title");
const greetings = ["Hi", "Hello", "Hey", "Yo"];
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
    navigator.userAgent
  );

if (!isMobile) {
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
      cursor.fadeIn(250);
      cursorFollow.fadeIn(250);
    })
    .on("mouseleave", () => {
      cursor.fadeOut(250);
      cursorFollow.fadeOut(250);
    });

  $('[class*="action"]')
    .on("mouseenter", () => {
      cursorFollow.animate({ height: "40px", width: "40px" }, 250);
    })
    .on("mouseleave", () => {
      cursorFollow.animate({ height: "25px", width: "25px" }, 250);
    });
}

$(() => {
  title.fadeIn(800).on("dblclick", () => {
    title.fadeOut(250, () => {
      title.text(choose(greetings) + " :)").fadeIn(250);
    });
  });
});

// $(() => {
//   const colors = ["#885fff", "#5215fc", "#410ed3", "#280886", "#12043e"];
//   $('section[id*="section"]')
//     .toArray()
//     .forEach((element) => {
//       $(element).css({ backgroundColor: choose(colors) });
//     });
// });
