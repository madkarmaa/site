import { writeFile } from 'node:fs/promises';
import { join, resolve, normalize } from 'node:path';
import * as z from 'zod';

const env = z
	.object({
		DATE: z.string().transform((val) => new Date(val))
	})
	.parse(process.env);

const relativeToMe = (meta: ImportMeta, ...paths: string[]) =>
	resolve(normalize(join(meta.dirname.replace('file://', ''), ...paths)));

const calculateAge = (dateOfBirth: Date): number => {
	const today = new Date();

	let age = today.getFullYear() - dateOfBirth.getFullYear();
	const monthDiff = today.getMonth() - dateOfBirth.getMonth();

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) age--;

	return age;
};

(async () => {
	console.clear();

	const meFile = relativeToMe(import.meta, '..', 'static', 'me.txt');

	const age = calculateAge(env.DATE);
	const today = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const stringToWrite = `
Hello there! I'm MadKarma :)

I'm a ${age}-year-old full stack developer who loves building cool stuff.

=== Tech Stack ===

Frontend:
  - JavaScript / TypeScript
  - HTML / CSS
  - Svelte / SvelteKit

Backend & More:
  - Node.js (Bun)
  - Python (UV)
  - C# / VB.NET
  - C++, Java, Kotlin, PHP

Data & Tools:
  - MySQL / SQLite
  - Git / GitHub
  - Linux / Windows

...and always learning more!

=== What I Love ===

I'm constantly learning new things and improving my skills. Every project is a chance
to grow as a developer.

Beyond coding, I'm passionate about photography and videography - there's something
special about capturing moments in time and telling stories through visuals.

=== Let's Connect! ===

You can find me on most social media platforms:
@madkarma, @madkarma_ or @madkarmaa

Hope you have a great day! :)

---
Last updated: ${today}, by ${process.env['GITHUB_ACTOR'] ?? 'me'}
`;

	await writeFile(meFile, stringToWrite.trim(), 'utf-8');
})();
