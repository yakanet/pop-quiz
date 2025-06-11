<script lang="ts">
  import '../../styles/main.scss';
  import Header from '$lib/components/Header.svelte';
  import icon_user from 'virtual:icons/mdi:user-outline.svg';
  import Icon from '$lib/components/Icon.svelte';
  let { children, data } = $props();
</script>

<Header homeLink="/admin">
  <a href="/admin/logout" data-sveltekit-preload-data="off">
    <Icon icon={icon_user} />
    {data.user?.username}
  </a>
</Header>
{@render children()}

<style lang="scss">
  a {
    color: black;
    text-decoration: none;
    display: flex;
  }
</style>
