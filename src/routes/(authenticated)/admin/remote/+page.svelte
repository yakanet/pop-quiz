<script lang="ts">
	import { stateToString } from '$lib/state.js';
	import { enhance }                 from '$app/forms';

	let { data } = $props();
</script>

<p>Current = {JSON.stringify(data.state)}</p>
<p>Next = {JSON.stringify(data.nextState)}</p>
<form action="?/state" use:enhance method="post">
	<button name="state" type="submit" value="NOT_STARTED">Reset</button>
	{#if (data.nextState)}
		<button name="state" type="submit" value={stateToString(data.nextState)}>{stateToString(data.nextState)}</button>
	{/if}
</form>
