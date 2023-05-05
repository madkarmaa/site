"use strict";

let displayCursor = true;
let pageScrolling = false;

function enableCustomCursor() {
  const cursorFollow = $(".cursor-follow");
  const cursor = $(".cursor");
  const actionElements = $('[class*="action"]');

  $("body *").each(function () {
    $(this).css("cursor", "none");
  });

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

  actionElements
    .on("mouseenter", () => {
      cursorFollow.finish().animate({ height: "40px", width: "40px" }, 250);
    })
    .on("mouseleave", () => {
      cursorFollow.finish().animate({ height: "25px", width: "25px" }, 250);
    });
}

function enableDefaultCursor() {
  const cursorFollow = $(".cursor-follow");
  const cursor = $(".cursor");

  if (
    cursor.css("display") != "none" &&
    cursorFollow.css("display") != "none"
  ) {
    cursor.fadeOut(250);
    cursorFollow.fadeOut(250);
  }

  $(document).off("mousemove mouseenter mouseleave");
  $('[class*="action"]').off("mouseenter mouseleave");

  $("body *").each(function () {
    $(this).css("cursor", "");
  });
}

$(function settingsCursor() {
  const cursorToggle = $(".toggle input.for-cursor");
  const storedDisplayCursor = JSON.parse(localStorage.getItem("displayCursor"));

  if (storedDisplayCursor != null) {
    displayCursor = storedDisplayCursor;
  } else {
    localStorage.setItem("displayCursor", displayCursor);
  }

  function cursorCheck() {
    if (!isMobile && displayCursor) {
      enableCustomCursor();
    } else {
      enableDefaultCursor();
    }
  }

  cursorToggle
    .on("change", function () {
      displayCursor = $(this).is(":checked");
      localStorage.setItem("displayCursor", displayCursor);

      cursorCheck();
    })
    .prop("checked", displayCursor);

  cursorCheck();
});

$(function settingsScrolling() {
  const scrollingToggle = $(".toggle input.for-scrolling");
  const storedScrolling = JSON.parse(localStorage.getItem("pageScrolling"));

  if (storedScrolling != null) {
    pageScrolling = storedScrolling;
  } else {
    localStorage.setItem("pageScrolling", pageScrolling);
  }

  function scrollingCheck() {
    if (pageScrolling) {
      $("html").css("overflow-y", "visible");
      scrollingMessageCheck(pageScrolling);
    } else {
      $("html").css("overflow-y", "hidden");
      scrollingMessageCheck(pageScrolling);
    }
  }

  scrollingToggle
    .on("change", function () {
      pageScrolling = $(this).is(":checked");
      localStorage.setItem("pageScrolling", pageScrolling);

      scrollingCheck();
    })
    .prop("checked", pageScrolling);

  scrollingCheck();
});
