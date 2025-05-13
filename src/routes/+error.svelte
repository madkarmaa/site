<script>
	import { page } from '$app/state';
</script>

<div class="error-container flex items-center justify-center flex-col min-h-screen gap-8">
	<h1 class="error-heading text-6xl text-primary">Oops!</h1>

	<p class="error-message text-xl">
		{page.error?.message || 'Something went wrong'}
	</p>

	<button
		onclick={() => window.history.back()}
		class="back-button bg-accent p-3 rounded-lg cursor-pointer hover:bg-primary transition-all hover:text-background"
	>
		Go Back
	</button>
</div>
