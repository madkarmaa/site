<script lang="ts">
	export type Props = { label: string; icon: typeof import('~icons/*').default };
	let { label, icon: Icon }: Props = $props();
</script>

<div class="flex flex-col items-center justify-center gap-4 rounded-md bg-background-100 p-4">
	<Icon class="h-20 w-20 text-secondary-900" />
	<p class="jetbrains-mono-600 text-xl text-text-700">{label}</p>
</div>
