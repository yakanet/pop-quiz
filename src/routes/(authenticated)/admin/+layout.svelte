<script lang="ts">
  import { page } from '$app/state';

  let { children } = $props();
</script>

<div class="admin">
  <nav>
    <ul>
      <li aria-current={page.url.pathname === '/admin/pools/1' ? 'page' : undefined}>
        <a href="/admin/pools/1">Pools</a>
      </li>
      <li aria-current={page.url.pathname === '/admin/remote' ? 'page' : undefined}>
        <a href="/admin/remote">Télécommande</a>
      </li>
      <li aria-current={page.url.pathname === '/admin/presentation' ? 'page' : undefined}>
        <a href="/admin/presentation">Présentation</a>
      </li>
    </ul>
  </nav>
  {@render children()}
</div>

<style lang="scss">
  nav {
    border-bottom: 1px solid var(--color-primary-200);
  }

  ul {
    max-width: 1200px;
    margin: 0 auto;
    padding-inline: 1rem;
    display: flex;
    list-style: none;
    gap: 1rem;
  }

  a {
    display: block;
    text-decoration: none;
    padding-block: 1rem;
    color: var(--color-primary-500);
  }

  li[aria-current='page'] a {
    color: red;
  }
</style>
