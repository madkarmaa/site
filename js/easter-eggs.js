$(() => {
  const title = $(".title");
  const greetings = ["Hi", "Hello", "Hey", "Yo"];

  title.fadeIn(800).on("dblclick", function () {
    $(this).fadeOut(250, function () {
      $(this)
        .text(choose(greetings) + " :)")
        .fadeIn(250);
    });
  });
});

$(() => {
  $(window).on("keypress", function (e) {
    if (e.key === "m" || e.key === "M") {
      let input = e.key;
      $(this).on("keypress", function (e) {
        input += e.key;
        if (input === "magic") {
          alert("Hello there!");
        }
      });
    }
  });
});

function scrollingMessageCheck(enable) {
  const scrollMsg = $(".user-scroll-message");
  let scrolling = false;

  if (!enable) {
    $(window).on("mousewheel touchmove", function () {
      if (!scrolling) {
        scrollMsg.fadeIn(250);
        scrolling = true;
      }

      clearTimeout($.data(this, "scrollCheck"));
      $.data(
        this,
        "scrollCheck",
        setTimeout(() => {
          scrollMsg.fadeOut(250);
          scrolling = false;
        }, 3000)
      );
    });
  } else {
    $(window).off("mousewheel touchmove");
  }
}

scrollingMessageCheck(pageScrolling);
