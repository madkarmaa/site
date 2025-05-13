<script lang="ts">
	import { pwshObfuscate } from './obfuscator';
	import { MarkdownParser } from '@/components/markdown-parser';
	import Button from '@/components/Button.svelte';

	const placeholder = 'Enter PowerShell code to obfuscate';
	let input: string = $state('');
	let obfuscatedCode: string = $state('');
	let markdownContent: string = $state('');

	const obfuscateCode = () => {
		if (input) {
			obfuscatedCode = pwshObfuscate(input);
			markdownContent = `\`\`\`powershell\n${obfuscatedCode}\n\`\`\``;
		} else {
			obfuscatedCode = '';
			markdownContent = `\`\`\`powershell\n# ${placeholder}\n\`\`\``;
		}
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		obfuscateCode();
	};

	const handleClick = async () => {
		await navigator.clipboard.writeText(obfuscatedCode);
	};

	obfuscateCode();
</script>

<div class="flex flex-col gap-6 w-full p-4">
	<h1>PowerShell Obfuscator</h1>

	<div class="input section">
		<h2>Input</h2>
		<form onsubmit={handleSubmit} class="flex flex-col w-full gap-2">
			<input
				type="text"
				name="code"
				id="code"
				bind:value={input}
				{placeholder}
				class="hljs w-full p-4 font-mono rounded-lg"
			/>
			<Button text="Convert" textOnClick="Done!" type="submit" class="self-center" />
		</form>
	</div>

	<div class="output section">
		<h2>Output</h2>
		<MarkdownParser input={markdownContent} />
		<Button
			text="Copy"
			textOnClick="Copied!"
			type="button"
			class="self-center"
			onclick={handleClick}
		/>
	</div>
</div>

<style>
	.section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
