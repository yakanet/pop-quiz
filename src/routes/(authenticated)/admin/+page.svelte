<script lang="ts">
  let { data } = $props();
</script>

<main>
  <h1>Liste des pools de quizz</h1>
  <ul>
    {#each data.pools as pool}
      <li>
        <a href="/admin/pools/{pool.id}">
          {pool.name} - {pool.state}
        </a>
      </li>
    {/each}
  </ul>
</main>
