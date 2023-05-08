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
  $(window).on("touchstart", () => {
    console.log("tap");
  });

  $(window).on("keypress", function (e) {
    if (e.key === "m" || e.key === "M") {
      let input = e.key;
      $(this).on("keypress", function (e) {
        input += e.key;
        if (input === "magic") {
          function openFullscreen(el) {
            var el = document.documentElement,
              rfs = // for newer Webkit and Firefox
                el.requestFullscreen ||
                el.webkitRequestFullScreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullscreen;

            if (typeof rfs != "undefined" && rfs) {
              rfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
              // for Internet Explorer
              var wscript = new ActiveXObject("WScript.Shell");
              if (wscript != null) {
                wscript.SendKeys("{F11}");
              }
            }
          }

          const iframeYT = $(
            '<iframe style="width: 100%; height: 100%; z-index: 100; position: fixed; top: 0; left: 0;" src="https://www.youtube.com/embed/f8mL0_4GeV0?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=0&autoplay=1" title="YouTube video player" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe>'
          );

          $("body").append(iframeYT);
          openFullscreen(iframeYT);

          $(window).on("fullscreenchange", () => {
            if (
              !(
                (screen.availHeight || screen.height - 30) <=
                  window.innerHeight && document.fullscreenElement
              )
            ) {
              iframeYT.remove();
            }
          });
        }
      });
    }
  });
});

function scrollingMessageCheck(enable) {
  const scrollMsg = $(".user-scroll-message");
  let scrolling = false;

  if (!enable) {
    $(window).on("mousewheel wheel touchmove", function () {
      if (!scrolling) {
        if (!isMobile && Math.random() < 0.1) {
          scrollMsg.text('Try to type "magic" :)');
        } else {
          scrollMsg.text("Psst... use the arrow buttons :)");
        }
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
    $(window).off("mousewheel wheel touchmove");
  }
}

scrollingMessageCheck(pageScrolling);
