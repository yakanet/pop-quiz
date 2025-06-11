<script lang="ts">
  import '../../styles/main.scss';
  import Header from '$lib/components/Header.svelte';

  let { children } = $props();
</script>

<Header homeLink="/" />

{@render children()}
