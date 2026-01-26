<script lang="ts">
	import type { PageProps } from './$types';

	type Props = {} & PageProps;
	let { data }: Props = $props();

	$inspect(data);
</script>
