// https://realtimecolors.com/
var isDarkMode = false; // TODO: add toggle
const themes = [
  {
    light: {
      '--text': '#050505',
      '--background': '#fafafa',
      '--primary': '#8fb3ff',
      '--secondary': '#ccdbff',
      '--accent': '#e11e72',
    },
    dark: {
      '--text': '#fafafa',
      '--background': '#050505',
      '--primary': '#8fb3ff',
      '--secondary': '#000f33',
      '--accent': '#ed78ab',
    },
  },
  {
    light: {
      '--text': '#050505',
      '--background': '#fafafa',
      '--primary': '#dc9e9f',
      '--secondary': '#f1dada',
      '--accent': '#bc4345',
    },
    dark: {
      '--text': '#fafafa',
      '--background': '#050505',
      '--primary': '#dc9e9f',
      '--secondary': '#250e0e',
      '--accent': '#d78e8f',
    },
  },
  {
    light: {
      '--text': '#050505',
      '--background': '#fafafa',
      '--primary': '#520571',
      '--secondary': '#f0cefd',
      '--accent': '#b20af5',
    },
    dark: {
      '--text': '#fafafa',
      '--background': '#050505',
      '--primary': '#520571',
      '--secondary': '#240231',
      '--accent': '#d16cf9',
    },
  },
  {
    light: {
      '--text': '#050505',
      '--background': '#fafafa',
      '--primary': '#7f12b5',
      '--secondary': '#fbd0df',
      '--accent': '#a217e8',
    },
    dark: {
      '--text': '#fafafa',
      '--background': '#050505',
      '--primary': '#7f12b5',
      '--secondary': '#2f0413',
      '--accent': '#c774f1',
    },
  },
  {
    light: {
      '--text': '#050505',
      '--background': '#fafafa',
      '--primary': '#e8b0e5',
      '--secondary': '#f3d8e4',
      '--accent': '#c53a79',
    },
    dark: {
      '--text': '#fafafa',
      '--background': '#050505',
      '--primary': '#e8b0e5',
      '--secondary': '#270c18',
      '--accent': '#dc89ae',
    },
  },
];

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

const theme = choose(themes);
const themeMode = theme[isDarkMode ? 'dark' : 'light'];
for (const key in themeMode) document.documentElement.style.setProperty(key, themeMode[key]);
