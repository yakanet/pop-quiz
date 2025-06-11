<script lang="ts">
	import '../styles/main.scss';
	import Header from './Header.svelte';

	let { children } = $props();
</script>

<Header />

{@render children()}
