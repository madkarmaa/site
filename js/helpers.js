var isMobile = false;
isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
  navigator.userAgent
);

document.title = window.location.href.slice(window.location.origin.length);

// https://codepen.io/Coding_Journey/pen/BEMgbX
class TypingAnimation {
  constructor(typedTextSpan, textArray, newTextDelay) {
    if (!typedTextSpan || !textArray || !newTextDelay) {
      throw new Error('TypingAnimation: Missing required constructor parameters!');
    }

    this.typedTextSpan = typedTextSpan;
    this.textArray = textArray;
    this.newTextDelay = newTextDelay;

    this.typingDelay = 200;
    this.erasingDelay = 100;
    this.textArrayIndex = 0;
    this.charIndex = 0;

    this.createCursorStyle();

    this.cursorSpan = document.createElement('span');
    this.cursorSpan.classList.add('cursor');
    this.cursorSpan.innerHTML = '&nbsp;';

    // Append cursorSpan adjacent to typedTextSpan
    if (this.typedTextSpan.nextSibling) {
      this.typedTextSpan.parentNode.insertBefore(this.cursorSpan, this.typedTextSpan.nextSibling);
    } else {
      this.typedTextSpan.parentNode.appendChild(this.cursorSpan);
    }
  }

  createCursorStyle() {
    if (!document.querySelector('style.TypingAnimation')) {
      const styleTag = document.createElement('style');
      styleTag.classList.add('TypingAnimation');
      styleTag.textContent = `
.cursor {
  display: inline-block;
  background-color: #ccc;
  margin-left: 0.1rem;
  width: 3px;
  animation: blink 1s infinite;
}

.cursor.typing {
  animation: none;
}

@keyframes blink {
  0% {
    background-color: #ccc;
  }
  49% {
    background-color: #ccc;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
  100% {
    background-color: #ccc;
  }
}

@-webkit-keyframes blink {
  0% {
    background-color: #ccc;
  }
  49% {
    background-color: #ccc;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
  100% {
    background-color: #ccc;
  }
}
`;
      document.head.appendChild(styleTag);
      console.log('%cTypingAnimation CSS inserted', 'font-family: monospace; color: #00ff00; font-size: 22px;');
    }
  }

  type() {
    if (this.charIndex < this.textArray[this.textArrayIndex].length) {
      if (!this.cursorSpan.classList.contains('typing')) this.cursorSpan.classList.add('typing');
      this.typedTextSpan.textContent += this.textArray[this.textArrayIndex].charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.type(), this.typingDelay);
    } else {
      this.cursorSpan.classList.remove('typing');
      setTimeout(() => this.erase(), this.newTextDelay);
    }
  }

  erase() {
    if (this.charIndex > 0) {
      if (!this.cursorSpan.classList.contains('typing')) this.cursorSpan.classList.add('typing');
      this.typedTextSpan.textContent = this.textArray[this.textArrayIndex].substring(0, this.charIndex - 1);
      this.charIndex--;
      setTimeout(() => this.erase(), this.erasingDelay);
    } else {
      this.cursorSpan.classList.remove('typing');
      this.textArrayIndex++;
      if (this.textArrayIndex >= this.textArray.length) this.textArrayIndex = 0;
      setTimeout(() => this.type(), this.typingDelay + 1100);
    }
  }

  startAnimation() {
    if (this.textArray.length) setTimeout(() => this.type(), this.newTextDelay + 250);
  }
}

function refreshLinks() {
  document.querySelectorAll('a').forEach((link) => {
    if (link.target !== '_blank') link.target = '_blank';
  });
}

async function fetchGitHubRepoData(username, repo) {
  const apiUrl = `https://api.github.com/repos/${username}/${repo}`;
  const response = await fetch(apiUrl);

  if (!response.ok) throw new Error('Failed to fetch GitHub repository data');

  const data = await response.json();
  const { stargazers_count, forks_count, contributors_url, html_url, owner, name, description, topics } = data;

  const contributorsResponse = await fetch(contributors_url);
  const contributorsData = await contributorsResponse.json();
  const contributors = contributorsData.map((contributor) => contributor.login);

  return {
    stars: stargazers_count,
    forks: forks_count,
    contributors: contributors,
    url: html_url,
    creator: owner.login,
    repoName: name,
    about: description,
    topics: topics,
  };
}

async function fetchGitHubProfileData(username) {
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
