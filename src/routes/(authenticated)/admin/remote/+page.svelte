<script lang="ts">
  import { stateToString } from '$lib/state.js';
  import { enhance } from '$app/forms';

  let { data } = $props();
</script>

<main>
 
  
  <form action="?/state" use:enhance method="post">
    <button name="state" type="submit" value="NOT_STARTED" style="background-color:red;color:white;border:none;padding:10px 20px;cursor:pointer">RESET</button><br/><br/><br/>
    <h4>Etat actuel = {stateToString(data.state)}</h4>
    {#if data.nextState}
      <!--<p>Prochain état = {data.nextState ? stateToString(data.nextState) : 'Aucun'}</p>-->
      <button name="state" type="submit" value={stateToString(data.nextState)}  style="background-color:green;color:white;border:none;padding:10px 20px;cursor:pointer">
        >>> {stateToString(data.nextState)}
      </button>
    {/if}
  </form>
</main>
