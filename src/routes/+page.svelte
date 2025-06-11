<script lang="ts">
	import PendingState from './PendingState.svelte';
	import QuestionState from './QuestionState.svelte';
	import { source } from 'sveltekit-sse';
	import type { Readable } from 'svelte/store';
	import type { QuizState } from '$lib/quiz.model';
	import { tick } from 'svelte';

	let { data } = $props();
	let state = $derived(data.state);
	const value = source('/api/quiz/status').select('message').json() as Readable<QuizState>;
	$effect(() => {
		if ($value) {
			console.log({ value: $value });
			if (!document.startViewTransition) {
				state = $value;
			} else {
				document.startViewTransition(async () => {
					state = $value;
					await tick();
				});
			}
		}
	});
</script>

{#if state.state === 'PENDING'}
	<PendingState />
{:else if state.state === 'QUESTION'}
	<QuestionState id={state.id} />
{:else}
	<h1>Statut inconnu</h1>
	<pre>{JSON.stringify(state)}</pre>
{/if}
<hr>
<pre>{JSON.stringify(data.pool, null, 2)}</pre>
