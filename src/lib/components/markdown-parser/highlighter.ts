import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js/lib/core';
import { type LanguageFn } from 'highlight.js';

// I couldn't figure out a better way to do this
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';
import kotlin from 'highlight.js/lib/languages/kotlin';
import typescript from 'highlight.js/lib/languages/typescript';
import csharp from 'highlight.js/lib/languages/csharp';
import markdown from 'highlight.js/lib/languages/markdown';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import powershell from 'highlight.js/lib/languages/powershell';
import scss from 'highlight.js/lib/languages/scss';
import sql from 'highlight.js/lib/languages/sql';
import plaintext from 'highlight.js/lib/languages/plaintext';

// languages I use
const languages: Record<string, LanguageFn> = {
	javascript,
	java,
	json,
	css,
	python,
	kotlin,
	typescript,
	csharp,
	markdown,
	yaml,
	xml,
	bash,
	powershell,
	scss,
	sql,
	plaintext
};

Object.entries(languages).forEach(([name, module]) => {
	hljs.registerLanguage(name, module);
});

const parser = new Marked().use(
	markedHighlight({
		emptyLangClass: 'hljs',
		langPrefix: 'hljs language-',
		highlight(code, lang, _) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	})
);

export default parser;
