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
