<script lang="ts">
  import { stateToString } from '$lib/state.js';
  import { enhance } from '$app/forms';

  let { data } = $props();
</script>

<main>
 
  
  <form action="?/state" use:enhance method="post">
    <button name="state" type="submit" value="NOT_STARTED">Reset</button><br/><br/><br/>
    <h2>Actuel = {stateToString(data.state)}</h2> 
    {#if data.nextState}
      <!--<p>Prochain état = {data.nextState ? stateToString(data.nextState) : 'Aucun'}</p>-->
      <button name="state" type="submit" value={stateToString(data.nextState)}>
        >>> {stateToString(data.nextState)}
      </button>
    {/if}
  </form>
</main>
