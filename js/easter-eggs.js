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
  let tapCount = 0;
  let resetTimer;
  const iframeYT = $(
    '<iframe style="width: 100%; height: 100%; z-index: 100; position: fixed; top: 0; left: 0;" src="https://www.youtube.com/embed/KdaD5K67kAE?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=0&autoplay=1" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe>'
  );
  const secretWord = "magic".split("");
  let arrowSequenceIndex = 0;

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

  function payload() {
    $("body").append(iframeYT);
    openFullscreen(iframeYT);

    $(window).on("fullscreenchange", () => {
      if (
        !(
          (screen.availHeight || screen.height - 30) <= window.innerHeight &&
          document.fullscreenElement
        )
      ) {
        iframeYT.remove();
      }
    });
  }

  function generateRandomArrowSequence() {
    const arrowChoices = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    const sequenceLength = Math.floor(Math.random() * 6) + 5; // random length between 5 and 10
    const sequence = [];

    for (let i = 0; i < sequenceLength; i++) {
      sequence.push(choose(arrowChoices));
    }

    return sequence;
  }

  function showEasterEggs() {
    const scrollMsg = $(".user-scroll-message");
    $(".title").attr("title", "Double click me");

    scrollMsg.text('Try to type "magic" :)');
    scrollMsg.fadeIn(250, () => {
      setTimeout(() => {
        scrollMsg.fadeOut(250);
      }, 10000);
    });
  }

  const ARROW_SEQUENCE = generateRandomArrowSequence();
  console.log(
    "%cHey there!",
    "color: #5215fc; font-family: monospace; font-size: 3rem; font-weight: bold"
  );
  console.log(
    "%cIf you're here it probably means you want to cheat the easter eggs, so I'm making your life easier :)\n\nHere's the current arrow keys combination:",
    "color: #885fff; font-family: monospace; font-size: 1.3rem;"
  );
  console.log(
    `%c${ARROW_SEQUENCE.map((str) => `> ${str.split("Arrow")[1]}`).join("\n")}`,
    "font-family: monospace; font-size: 1rem;"
  );

  $(window).on("touchstart", () => {
    tapCount++;

    clearTimeout(resetTimer);

    resetTimer = setTimeout(() => {
      tapCount = 0;
    }, 1500);

    if (tapCount === 10) {
      payload();
      tapCount = 0;
      clearTimeout(resetTimer);
    }
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === ARROW_SEQUENCE[arrowSequenceIndex]) {
      arrowSequenceIndex++;
      if (arrowSequenceIndex === ARROW_SEQUENCE.length) {
        showEasterEggs();
        arrowSequenceIndex = 0;
      }
    } else {
      arrowSequenceIndex = 0;
    }

    if (e.key === secretWord[0] || e.key === secretWord[0].toUpperCase()) {
      let input = "";
      const keyPressHandler = function (e) {
        input += e.key;
        if (input === secretWord.join("")) {
          payload();
          window.removeEventListener("keypress", keyPressHandler);
        }
      };
      window.addEventListener("keypress", keyPressHandler);
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
