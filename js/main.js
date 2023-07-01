let isMobile = false;
isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
  navigator.userAgent
);

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// https://stackoverflow.com/questions/45576748/how-can-i-detect-rendering-support-for-emoji-in-javascript
function supportsEmoji() {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.canvas.width = ctx.canvas.height = 1;
  ctx.fillText('😗', -4, 4);
  return ctx.getImageData(0, 0, 1, 1).data[3] > 0; // Not a transparent pixel
}

async function getGitHubRepoData(username, repo) {
  const apiUrl = `https://api.github.com/repos/${username}/${repo}`;
  const response = await fetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    const { stargazers_count, forks_count, contributors_url, html_url, owner, name, description } = data;

    const contributorsResponse = await fetch(contributors_url);
    const contributorsData = await contributorsResponse.json();
    const contributors = contributorsData.map((contributor) => contributor.login);

    return {
      stars: stargazers_count,
      forks: forks_count,
      contributors,
      url: html_url,
      creator: owner.login,
      repoName: name,
      about: description,
    };
  } else {
    throw new Error('Failed to fetch GitHub repository data');
  }
}

async function fetchGitHubProfile(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const profile = {
      username: data.login,
      displayName: data.name,
      profilePictureUrl: data.avatar_url,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      repositories: data.public_repos,
    };

    return profile;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw error;
  }
}

function skulls() {
  if (supportsEmoji()) {
    var triggerElements = document.querySelectorAll('.censor');

    if (triggerElements.length > 0) {
      triggerElements.forEach(function (element) {
        if ('skull' in element.dataset && element.dataset.skull === 'true') {
          return;
        }

        $(element).on('click', function () {
          var skullEmoji = $('<span class="skull-emoji">💀</span>');
          var windowWidth = $(window).width();
          var windowHeight = $(window).height();

          var posX = Math.random() * windowWidth;
          var posY = Math.random() * windowHeight;

          skullEmoji.css({ top: posY, left: posX });
          skullEmoji.appendTo('body').fadeIn(500);

          setTimeout(function () {
            skullEmoji.fadeOut(500, function () {
              skullEmoji.remove();
            });
          }, 1000);
        });

        element.dataset.skull = 'true';
      });
    }
  }
}

getGitHubRepoData('madkarmaa', 'automatic-chatgpt-dan')
  .then((data) => {
    const repoInfoContainer = document.createElement('div');
    repoInfoContainer.classList.add('repo-info');

    const repoName = document.createElement('p');
    repoName.innerHTML = `<strong>Repository:</strong> ${data.repoName}`;
    repoInfoContainer.appendChild(repoName);

    const about = document.createElement('p');
    about.innerHTML = `<em>${data.about}</em>`;
    repoInfoContainer.appendChild(about);

    const creator = document.createElement('p');
    creator.innerHTML = `by <strong>${data.creator}</strong> ${
      data.creator == 'madkarmaa' ? '<span class="censor">(me lol)</span>' : ''
    }`;
    repoInfoContainer.appendChild(creator);

    const cont = document.createElement('p');
    cont.style = 'display: flex; flex-direction: row; gap: 25px;';
    repoInfoContainer.appendChild(cont);

    const stars = document.createElement('div');
    stars.innerHTML = `<span class="material-symbols-outlined">star</span> ${data.stars}`;
    stars.style = 'display: flex; flex-direction: row; align-items: center; gap: 5px;';
    stars.title = 'Stars';
    cont.appendChild(stars);

    const forks = document.createElement('div');
    forks.innerHTML = `<span class="material-symbols-outlined">fork_right</span> ${data.forks}`;
    forks.style = 'display: flex; flex-direction: row; align-items: center; gap: 5px;';
    forks.title = 'Forks';
    cont.appendChild(forks);

    const contributors = document.createElement('p');
    contributors.innerHTML = '<strong>Contributors:</strong>';
    repoInfoContainer.appendChild(contributors);

    const contributorsList = document.createElement('ul');
    contributorsList.id = 'contributors';
    repoInfoContainer.appendChild(contributorsList);

    const url = document.createElement('p');
    const urlLink = document.createElement('a');
    urlLink.href = data.url;
    urlLink.target = '_blank';
    urlLink.textContent = 'Click me';
    url.innerHTML = `<strong>Check it out!</strong> `;
    url.appendChild(urlLink);
    repoInfoContainer.appendChild(url);

    const appendTo = document.querySelectorAll('.content');
    appendTo[2].appendChild(repoInfoContainer);

    data.contributors.forEach((contributor) => {
      const contributorListItem = document.createElement('li');
      contributorListItem.title = contributor;
      const contributorLink = document.createElement('a');
      contributorLink.href = `https://github.com/${contributor}`;
      contributorLink.target = '_blank';
      const contributorImage = document.createElement('img');
      contributorImage.src = `https://github.com/${contributor}.png?size=64`;
      contributorImage.alt = contributor;
      contributorLink.appendChild(contributorImage);
      contributorListItem.appendChild(contributorLink);
      contributorsList.appendChild(contributorListItem);
    });

    skulls();
  })
  .catch((error) => console.error(error));

fetchGitHubProfile('madkarmaa')
  .then((profile) => {
    const profileContainer = document.createElement('div');
    profileContainer.className = 'profile-container';

    const profilePicture = document.createElement('img');
    profilePicture.src = profile.profilePictureUrl;
    profilePicture.alt = 'Profile Picture';
    profilePicture.style = 'pointer-events: none';
    profileContainer.appendChild(profilePicture);

    const displayName = document.createElement('h2');
    displayName.innerHTML = `<strong>${profile.displayName}</strong>`;
    profileContainer.appendChild(displayName);

    const usernameElement = document.createElement('p');
    usernameElement.innerHTML = `<a href="https://github.com/${profile.username}" target="_blank"><strong>@${profile.username}</strong></a>`;
    profileContainer.appendChild(usernameElement);

    const bio = document.createElement('p');
    bio.innerHTML = `<em>${profile.bio}</em>`;
    profileContainer.appendChild(bio);

    const cont = document.createElement('p');
    cont.style = 'display: flex; flex-direction: row; gap: 25px;';
    profileContainer.appendChild(cont);

    const followers = document.createElement('p');
    followers.innerHTML = `<span class="material-symbols-outlined">person_add</span> ${profile.followers}`;
    followers.style = 'display: flex; flex-direction: row; align-items: center; gap: 10px;';
    followers.title = 'Followers';
    cont.appendChild(followers);

    const following = document.createElement('p');
    following.innerHTML = `<span class="material-symbols-outlined">person</span> ${profile.following}`;
    following.style = 'display: flex; flex-direction: row; align-items: center; gap: 10px;';
    following.title = 'Following';
    cont.appendChild(following);

    const repositories = document.createElement('p');
    repositories.innerHTML = `<span class="material-symbols-outlined">book</span> ${profile.repositories}`;
    repositories.style = 'display: flex; flex-direction: row; align-items: center; gap: 10px;';
    repositories.title = 'Repositories';
    cont.appendChild(repositories);

    const appendTo = document.querySelectorAll('.content');
    appendTo[1].appendChild(profileContainer);

    skulls();
  })
  .catch((error) => console.error(error));

(() => {
  ScrollReveal().reveal('.parallax > h1');
  skulls();

  var name = document.querySelector('.parallax-1 > h1 > span');
  name.addEventListener('click', () => {
    name.textContent = choose(['mk_', 'madkarma_', 'madkarmaa', 'mkk___']);
  });

  var thoughts = document.querySelectorAll('.thoughts');
  thoughts.forEach((t) => {
    t.textContent = '"' + t.textContent + '"';
  });
})();
