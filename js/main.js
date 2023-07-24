console.clear();
document.documentElement.style.setProperty('--easter-egg', '#0f0');

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

const particleNumber = 50;
// https://particles.js.org/
tsParticles
  .load('tsparticles', {
    background: {
      color: {
        value: '#000',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        // onClick: {
        //   enable: !isMobile,
        //   mode: 'push',
        // },
        onHover: {
          enable: !isMobile,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: document.documentElement.style.getPropertyValue('--easter-egg'),
      },
      links: {
        color: document.documentElement.style.getPropertyValue('--easter-egg'),
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: particleNumber,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  })
  .then((container) => {
    console.log('%ctsParticles loaded', 'font-family: monospace; color: #00ff00; font-size: 22px;');
  })
  .catch((error) => {
    console.error('tsParticles\n\n' + error);
  });
const tsParticlesContainer = tsParticles.domItem(0);

// https://scrollrevealjs.org/api/reveal.html
ScrollReveal().reveal('.content', { duration: 1250 });

// https://anseki.github.io/leader-line/
const landingTitle = document.querySelector('.title');
const comment1 = document.querySelector('.comment1');
const comment2 = document.querySelector('.comment2');
const comment3 = document.querySelector('.comment3');
const lineStyle = {
  size: 2,
  startPlug: 'behind',
  endPlug: 'behind',
  color: 'var(--easter-egg)',
  path: 'straight',
  hide: true,
};

const line1 = new LeaderLine(
  LeaderLine.pointAnchor(comment1, { x: isMobile ? '50%' : '100%', y: '100%' }),
  LeaderLine.pointAnchor(landingTitle, { x: isMobile ? '25%' : '20%', y: 0 }),
  lineStyle
);
const line2 = new LeaderLine(
  LeaderLine.pointAnchor(comment2, { x: isMobile ? '20%' : 0, y: 0 }),
  LeaderLine.pointAnchor(landingTitle, { x: '45%', y: '100%' }),
  lineStyle
);
const line3 = new LeaderLine(
  LeaderLine.pointAnchor(comment3, {
    x: isMobile ? '35%' : 0,
    y: isMobile ? '100%' : '50%',
  }),
  LeaderLine.pointAnchor(landingTitle, { x: isMobile ? '80%' : '90%', y: 0 }),
  lineStyle
);

const lines = [
  { line: line1, shown: false },
  { line: line2, shown: false },
  { line: line3, shown: false },
];

const username = document.querySelector('.title > .username');
const options = {
  ...GlitchedWriter.presets.encrypted,
  steps: [3, 8],
  letterize: true,
};

// https://github.com/thetarnav/glitched-writer#cdn
const writer = GlitchedWriter.create(username, options),
  defaultTime = 3500;
// https://github.com/thetarnav/glitched-writer#queue-writing
writer.queueWrite(['madkarma', 'mk_', 'madkarma_', 'madkarmaa', 'mkk___'], defaultTime, true);

var holdTimeout;
var timeoutRunned = false;
const toShake = [landingTitle, comment1, comment2, comment3, ...document.querySelectorAll('.leader-line')];

[comment1, comment2, comment3].forEach((comment, idx) => {
  comment.addEventListener('click', () => {
    lines[idx].shown ? lines[idx].line.hide('draw') : lines[idx].line.show('draw');
    lines[idx].shown = !lines[idx].shown;
  });
  ['mousedown', 'touchstart'].forEach((ev) => {
    comment.addEventListener(ev, () => {
      holdTimeout = setTimeout(() => {
        document.documentElement.style.setProperty('--easter-egg', '#f00');
        timeoutRunned = true;

        toShake.forEach((element) => {
          element.classList.add('glitching');
        });

        writer.pause();
        writer.endless(true);
        writer.write('madkarma');
        writer.play();

        // https://github.com/matteobruni/tsparticles/issues/195#issuecomment-757562810
        tsParticlesContainer.options.load({
          particles: {
            color: {
              value: document.documentElement.style.getPropertyValue('--easter-egg'),
            },
            links: {
              color: {
                value: document.documentElement.style.getPropertyValue('--easter-egg'),
              },
            },
            move: {
              speed: 12,
            },
          },
        });

        tsParticlesContainer.refresh();
      }, 1500);
    });
  });
  ['mouseup', 'touchend'].forEach((ev) => {
    comment.addEventListener(ev, () => {
      clearTimeout(holdTimeout);

      if (timeoutRunned) {
        document.documentElement.style.setProperty('--easter-egg', '#0f0');

        toShake.forEach((element) => {
          element.classList.remove('glitching');
        });

        writer.pause();
        writer.endless(false);
        writer.queueWrite(['madkarma', 'mk_', 'madkarma_', 'madkarmaa', 'mkk___'], defaultTime, true);
        writer.play();

        tsParticlesContainer.options.load({
          particles: {
            color: {
              value: document.documentElement.style.getPropertyValue('--easter-egg'),
            },
            links: {
              color: {
                value: document.documentElement.style.getPropertyValue('--easter-egg'),
              },
            },
            move: {
              speed: 3,
            },
          },
        });

        tsParticlesContainer.refresh();
        timeoutRunned = false;
      }
    });
  });
  ['mouseleave', 'touchmove', 'touchcancel'].forEach((ev) => {
    comment.addEventListener(ev, () => {
      clearTimeout(holdTimeout);

      if (timeoutRunned) {
        document.documentElement.style.setProperty('--easter-egg', '#0f0');

        toShake.forEach((element) => {
          element.classList.remove('glitching');
        });

        writer.pause();
        writer.endless(false);
        writer.queueWrite(['madkarma', 'mk_', 'madkarma_', 'madkarmaa', 'mkk___'], defaultTime, true);
        writer.play();

        tsParticlesContainer.options.load({
          particles: {
            color: {
              value: document.documentElement.style.getPropertyValue('--easter-egg'),
            },
            links: {
              color: {
                value: document.documentElement.style.getPropertyValue('--easter-egg'),
              },
            },
            move: {
              speed: 3,
            },
          },
        });

        tsParticlesContainer.refresh();
        timeoutRunned = false;
      }
    });
  });
});

var observer = new MutationObserver((mutations) => {
  for (const line of lines) if (line.shown) line.line.position();
});

observer.observe(username, { characterData: false, childList: true, attributes: true });

const contentContainers = document.querySelectorAll('section > .content');

fetchGitHubProfileData('madkarmaa').then((data) => {
  console.log(data);
  contentContainers[0].innerHTML = `
<div class="profile-container">
  <h2>
    <i class="fa-regular fa-face-smile-wink"></i>
    What's up?
  </h2>
  <div class="profile">
    <div class="profile-presentation">
      <h3>Who am I?</h3>
      <p>I'm a random guy, still a student, who happens to <i style="color: var(--easter-egg);">love</i> Information Technology.</p>
      <p>I have a passion for coding, I'm a seriously dedicated <i style="color: var(--easter-egg);">gym rat</i>, and gaming is
      my favorite method of spending my free time.</p>
      <h3>What do I do?</h3>
      <p>I usually spend most of my time working on coding projects which automate time-consuming tasks.</p>
      <p><i style="color: var(--easter-egg);">Why?</i> Because nobody likes to waste their time repeating the same actions over and over again.</p>
    </div>
    <div class="profile-data">
      <h3>GitHub profile details</h3>
      <div class="profile-details-container">
        <div class="top-details">
          <img style="border-radius: 100%; width: 110px;" src="${data.profilePictureUrl}">
          <div style="display: flex; flex-direction: column; justify-content: space-evenly;">
            <h2>${data.displayName}</h2>
            <p style="margin-left: 5px;">
              <a href="https://github.com/${data.username}"><span style="color: var(--easter-egg);">@</span>${data.username}</a>
            </p>
          </div>
        </div>
        <p><i>"${data.bio}"</i></p>
        
        <div class="info-container">
          <div class="followers">
            <i class="fa-solid fa-user-group" style="color: var(--easter-egg);"></i>
            <a href="https://github.com/${data.username}?tab=followers">${data.followers} Followers</a>
          </div>
          <div class="following">
            <i class="fa-solid fa-user-plus" style="color: var(--easter-egg);"></i>
            <a href="https://github.com/${data.username}?tab=following">${data.following} Following</a>
          </div>
          <div class="repositories">
            <i class="fa-solid fa-code" style="color: var(--easter-egg);"></i>
            <a href="https://github.com/${data.username}?tab=repositories">${data.repositories} Repositories</a>
          </div>
        </div>

      </div>
      <h3>My socials</h3>

        <div class="social">
          <i class="fa-brands fa-discord"></i>
          <a href="https://discord.com/users/826489186327724095"><span style="color: var(--easter-egg);">@</span>madkarma_</a>
        </div>
        <div class="social">
          <i class="fa-brands fa-instagram"></i>
          <a href="https://www.instagram.com/fk.mk__/"><span style="color: var(--easter-egg);">@</span>fk.mk__</a>
        </div>
        <div class="social">
          <i class="fa-brands fa-tiktok"></i>
          <a href="https://www.tiktok.com/@madk__"><span style="color: var(--easter-egg);">@</span>madk__</a>
        </div>

    </div>
  </div>
</div>
`;
  refreshLinks();
});

// <img src="https://github-readme-stats.vercel.app/api/pin/?username=madkarmaa&repo=automatic-chatgpt-dan&show_owner=true&title_color=0f0&text_color=fff&border_color=0f0&bg_color=000&icon_color=0f0">
fetchGitHubRepoData('madkarmaa', 'automatic-chatgpt-dan').then((data) => {
  contentContainers[1].innerHTML = `
<div class="repo-container">
  <h2>
    <i class="fa-regular fa-folder-open"></i>
    <a href="https://github.com/${data.creator}">${data.creator}</a>/<a href="${data.url}">${data.repoName}</a>
  </h2>
  <div class="repo">
    <div class="repo-presentation">
      <h3>What is it?</h3>
      <p class="repo-best">
        <i class="fa-solid fa-ranking-star"></i>
        <span>My best project (so far)!</span>
      </p>
      <p>Simply, a ${data.about.charAt(0).toLowerCase() + data.about.slice(1)}.</p>
      <h3>Why?</h3>
      <p>Because I got annoyed with copy-pasting the prompts to ChatGPT and searching through my browsing history
      to find the websites I was getting the prompts from, so I created this userscript to simplify my own life, but
      it seems that a lot of people like it, not just me.</p>
    </div>
    <div class="repo-data">
      <h3>Repo details</h3>

      <div class="info-container">
        <div class="repo-stars">
          <i class="fa-regular fa-star" style="color: var(--easter-egg);"></i>
          <a href="${data.url}/stargazers">${data.stars} Stars</a>
        </div>
        <div class="repo-forks">
          <i class="fa-solid fa-code-fork" style="color: var(--easter-egg);"></i>
          <a href="${
            data.url
          }/forks?include=active%2Carchived%2Cinactive%2Cnetwork&page=1&period=2y&sort_by=stargazer_counts">
            ${data.forks} Forks
          </a>
        </div>
      </div>

      <h3>Contributors</h3>
      <p style="display: flex; flex-direction: row; gap: 10px;">
        ${data.contributors
          .map(
            (contributor) => `<a href="https://github.com/${contributor}" title="@${contributor}">
            <img style="border-radius: 100%; width: 75px;" src="https://github.com/${contributor}.png?size=256">
          </a>`
          )
          .join('')}
      </p>
      <h3>Tags</h3>
      <p>${data.topics
        .slice(0, 6)
        .map(
          (topic) =>
            `<a href="https://github.com/topics/${topic}"><span style="color: var(--easter-egg);">#</span>${topic}</a>`
        )
        .join(' ')}
        <a href="${data.url}" style="color: var(--easter-egg);">...</a>
      </p>
    </div>
  </div>
</div>
`;
  refreshLinks();
});
