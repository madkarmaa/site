<script lang="ts">
	import QRCode from 'qrcode';

	let canvas: HTMLCanvasElement;
	let showQr: boolean = $state(false);

	const generateQRCode = async (e: SubmitEvent) => {
		e.preventDefault();

		const data = new FormData(e.target as HTMLFormElement);
		const url = data.get('url') as string;

		if (!URL.canParse(url)) return;
		await QRCode.toCanvas(canvas, url, { scale: 10 }).catch((err) => alert(err));

		showQr = true;
	};
</script>

<main class="min-h-screen p-4 flex items-center justify-center flex-col gap-4">
	<form onsubmit={generateQRCode} class="flex w-full">
		<input
			type="url"
			name="url"
			id="url"
			placeholder="https://youtube.com"
			required
			class="flex-1 transition-all rounded-lg"
		/>
	</form>

	<canvas bind:this={canvas} class:hidden={!showQr}></canvas>
</main>

<style>
	form > input {
		border: 2px solid var(--accent);
		outline: none !important;
		box-shadow: none !important;
		background: none;
	}

	form > input::placeholder {
		color: var(--text);
		opacity: 0.5;
	}

	form > input:hover,
	form > input:focus,
	form > input:active {
		border: 2px solid var(--primary);
	}
</style>
