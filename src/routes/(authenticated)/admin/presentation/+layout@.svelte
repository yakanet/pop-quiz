<script lang="ts">
  //import '../../styles/main.scss';
  import Header from '$lib/components/Header.svelte';
  let { children, data } = $props();
</script>

<Header homeLink="/admin">
 
</Header>
{@render children()}



