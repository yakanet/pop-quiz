<script lang="ts">
	import PendingState from './PendingState.svelte';
	import QuestionState from './QuestionState.svelte';
	import { source } from 'sveltekit-sse';
	import type { Readable } from 'svelte/store';
	import type { QuizState } from '$lib/quiz.model';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	let state = $derived(data.state);
	const newState: Readable<QuizState> = source(`/${data.pool.id}/status`)
		.select('message')
		.json();

	$effect(() => {
		if (!$newState) {
			return;
		}
		console.log({ newState: $newState });
		if (!document.startViewTransition) {
			invalidateAll();
		} else {
			document.startViewTransition(async () => {
				await invalidateAll();
			});
		}
	});
</script>

<main>
	{#if state.state === 'PENDING'}
		<PendingState />
	{:else if state.state === 'QUESTION'}
		<QuestionState id={Number(state.id)} />
	{:else if state.state === 'FINISHED'}
		<h1>Fermé</h1>
	{:else if state.state === 'UNKNOWN'}
		<h1>État inconnu ({state.raw})</h1>
	{/if}
	<hr>
	<pre>{JSON.stringify(data, null, 2)}</pre>
</main>
