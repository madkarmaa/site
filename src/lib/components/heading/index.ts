import type { SpecialTargetValues } from '@/types';

// https://stackoverflow.com/a/68241571
export { default as Heading } from './Heading.svelte';
export { default as Link } from './Link.svelte';
export type LinkTarget = SpecialTargetValues | `${SpecialTargetValues}`;
