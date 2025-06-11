<script lang="ts">
  import '../../styles/main.scss';
  import Header from '$lib/components/Header.svelte';
  let { children, data } = $props();
</script>

<Header homeLink="/admin">
  {data.user?.username}
</Header>
{@render children()}
