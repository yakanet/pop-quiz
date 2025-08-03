<script lang="ts">
	import PrepareQuestionState from './PrepareQuestionState.svelte';
	import QuestionState from './QuestionState.svelte';
	import { source } from 'sveltekit-sse';
	import type { Readable } from 'svelte/store';
	import type { QuizState } from '$lib/quiz.model';
	import { invalidateAll } from '$app/navigation';
	import AnswerState from './AnswerState.svelte';

	let { data } = $props();
	let state = $derived(data.state);
	const newState: Readable<QuizState> = source(`/${data.pool.id}/status`).select('message').json();

	$effect(() => {
		if (!$newState) {
			return;
		}
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
	{#if state.state === 'PREPARE_QUESTION'}
		<PrepareQuestionState />
	{:else if state.state === 'QUESTION' && data.question}
		<QuestionState question={data.question} items={data.question.items} />
	{:else if state.state === 'ANSWERED' && data.question}
		<AnswerState question={data.question} />
	{:else if state.state === 'FINISHED'}
		<h1>Fermé</h1>
	{:else if state.state === 'UNKNOWN'}
		<h1>État inconnu ({state.raw})</h1>
		<pre>{JSON.stringify(data, null, 2)}</pre>
	{:else}
		<hr />
		<pre>{JSON.stringify(data, null, 2)}</pre>
	{/if}
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
  }
</style>
