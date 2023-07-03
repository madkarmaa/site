var converter = new showdown.Converter();

async function getMarkdownText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch the .md file.');
    }

    const markdownContent = await response.text();
    return markdownContent;
  } catch (error) {
    console.error(error);
  }
}

getMarkdownText('https://raw.githubusercontent.com/madkarmaa/automatic-chatgpt-dan/master/README.md').then((data) => {
  html = converter.makeHtml(data);
  $('.container').append($(html));
  $('.container > p > a:contains("Back to top")').remove();
  $('img[alt*="screenshot"]').toArray()[0].style = 'margin: 0 auto; display: block;';
  $('a')
    .toArray()
    .forEach((a) => {
      a.target = '_blank';
    });
});
