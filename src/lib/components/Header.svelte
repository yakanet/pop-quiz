<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    homeLink: string;
  }
  let { children = undefined, homeLink }: Props = $props();
</script>

<header>
  
    <img src="https://pezenasentransition.org/site/images/logoFB13.png" alt="Logo" />
 
  {#if children}
    <div class="right">
      {@render children()}
    </div>
  {/if}
</header>

<style lang="scss">
  header {
    background: var(--color-primary-500);
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 2rem;
  }

  @media (max-width: 768px) {
    header {
      height: 60px;
      justify-content: center;
    }
  }

  img {
    height: 100%;
  }

  .right {
    display: flex;
    align-items: center;
  }
</style>
