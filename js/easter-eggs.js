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
          // function openFullscreen(el) {
          //   var el = document.documentElement,
          //     rfs = // for newer Webkit and Firefox
          //       el.requestFullscreen ||
          //       el.webkitRequestFullScreen ||
          //       el.mozRequestFullScreen ||
          //       el.msRequestFullscreen;
          //   if (typeof rfs != "undefined" && rfs) {
          //     rfs.call(el);
          //   } else if (typeof window.ActiveXObject != "undefined") {
          //     // for Internet Explorer
          //     var wscript = new ActiveXObject("WScript.Shell");
          //     if (wscript != null) {
          //       wscript.SendKeys("{F11}");
          //     }
          //   }
          // }
          // $("body").append(
          //   '<iframe style="display: none; width: 100%; height: 100%; z-index: 100;" class="centered" src="https://www.youtube.com/embed/xvFZjo5PgG0?controls=0?autoplay=1?mute=1" title="YouTube video player" frameborder="0" allowfullscreen></iframe>'
          // );
          // const YTvideo = document.querySelector(
          //   'iframe[title="YouTube video player"]'
          // );
          // $(YTvideo).css("display", "block");
          // openFullscreen(YTvideo);
          window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_self");
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
