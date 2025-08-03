<script lang="ts">
  import { stateToString } from '$lib/state.js';
  import { enhance } from '$app/forms';

  let { data } = $props();
</script>

<main>
  <h2>Actuel = {stateToString(data.state)}</h2>
  <p>Prochain état = {data.nextState ? stateToString(data.nextState) : 'Aucun'}</p>
  <form action="?/state" use:enhance method="post">
    <button name="state" type="submit" value="NOT_STARTED">Reset</button>
    {#if data.nextState}
      <button name="state" type="submit" value={stateToString(data.nextState)}>
        {stateToString(data.nextState)}
      </button>
    {/if}
  </form>
</main>
