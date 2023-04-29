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
  $(window).on("keypress", function (e) {
    if (e.key === "m" || e.key === "M") {
      let input = e.key;
      $(window).on("keypress", function (e) {
        input += e.key;
        if (input === "magic") {
          alert("Hello there!");
        }
      });
    }
  });
});
