"use strict";

let isMobile;
window.sr = ScrollReveal({ reset: true });

$(() => {
  isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    );
});

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

$(() => {
  $("footer").on("click", () => {
    window.open("https://github.com/madkarmaa", "_blank");
  });
});

$(() => {
  const pageArrows = [];

  $('section[id^="section"]').each(function () {
    pageArrows.push($(this).find('a[class*="next-page"]'));
  });

  pageArrows.forEach((el, index) => {
    const redirectTo = "#section" + (index + 2).toString().padStart(2, "0");

    $(el).on("click", () => {
      if (index == pageArrows.length - 1) {
        window.location.href = "#section01";
      } else {
        window.location.href = redirectTo;
      }
    });
  });
});

async function fetchGitHubUserData(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch GitHub data for user ${username}: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}

$(() => {
  const username = "madkarmaa";

  function profileCardBuilder(data) {
    const card = $(`
<div class="profile-card">
    <div class="profile-image">
        <img src="${data.avatar_url}" alt="${data.login}'s avatar" />
    </div>

    <div class="profile-info">
        <div class="profile-name">${data.name || data.login}</div>
        <div class="profile-username action" onclick='window.open("${
          data.html_url
        }", "_blank")'>@${data.login}</div>
        <div class="profile-bio">${data.bio || "No bio provided."}</div>

        <div class="profile-stats">
            <div>
                <div class="stat-title">Repositories</div>
                <div class="stat-value">${data.public_repos}</div>
            </div>

            <div>
                <div class="stat-title">Followers</div>
                <div class="stat-value">${data.followers}</div>
            </div>
        </div>
    </div>
</div>`);

    $(".text-container").append(card);
  }

  fetchGitHubUserData(username).then((data) => {
    // console.log(data);
    profileCardBuilder(data);
  });
});
