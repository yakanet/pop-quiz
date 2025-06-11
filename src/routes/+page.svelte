<script lang="ts">
	import PendingState from './PendingState.svelte';
	import QuestionState from './QuestionState.svelte';
	import { source } from 'sveltekit-sse';
	import type { Readable } from 'svelte/store';
	import type { QuizState } from '$lib/quiz.model';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	let state = $derived(data.pool.quiz_state!);
	const newState = source('/api/quiz/status').select('message').json() as Readable<QuizState>;
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

{#if state.state === 'PENDING'}
	<PendingState />
{:else if state.state === 'QUESTION'}
	<QuestionState id={state.id} />
{:else}
	<h1>Statut inconnu</h1>
{/if}
<hr>
<pre>{JSON.stringify(data.pool, null, 2)}</pre>
