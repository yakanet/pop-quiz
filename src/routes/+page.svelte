<script lang="ts">
	import PendingState from './PendingState.svelte';
	import QuestionState from './QuestionState.svelte';

	let { data } = $props();
</script>

{#if data.state === 'PENDING'}
	<PendingState />
{:else if data.state === 'QUESTION'}
	<QuestionState id={data.id} />
{/if}
{data.state}