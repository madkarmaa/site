<script lang="ts">
	import type { IconFamily, IconVariant } from '.';

	type Family = IconFamily | `${IconFamily}`;
	type Variant = IconVariant | `${IconVariant}`;

	type IconOptions =
		| { brands: true }
		| {
				brands?: never;
				family: Family;
				variant: Variant;
		  };

	type Props = { name: string; color?: string; size?: string; options?: IconOptions };
	let {
		name,
		color = 'currentColor',
		size = 'inherit',
		options = { family: 'classic', variant: 'solid' }
	}: Props = $props();

	const classes: string[] = [`fa-${name}`];

	if (options.brands) classes.push('fa-brands');
	else Object.values(options).forEach((option) => classes.push(`fa-${option}`));
</script>

<!-- prettier-ignore -->
<i class="{classes.join(' ')} mr-2 justify-center items-center inline-flex" style="color: {color}; font-size: {size};"></i>
