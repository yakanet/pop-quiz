<script lang="ts">
	import PrepareQuestionState from './PrepareQuestionState.svelte';
	import QuestionState from './QuestionState.svelte';
	import { source } from 'sveltekit-sse';
	import type { Readable } from 'svelte/store';
	import type { QuizState } from '$lib/quiz.model';
	import { invalidateAll } from '$app/navigation';
	import AnswerState from './AnswerState.svelte';
	import ClosedState from './ClosedState.svelte';
	import FinishedState from './FinishedState.svelte';
	import NotStartedState from './NotStartedState.svelte';

	let { data } = $props();
	let state = $derived(data.state);
	const newState: Readable<QuizState> = source(`/status`).select('message').json();

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
	{:else if state.state === 'CLOSED_QUESTION'}
		<ClosedState />
	{:else if state.state === 'NOT_STARTED'}
		<NotStartedState />
	{:else if state.state === 'FINISHED'}
		<FinishedState />
	{:else}
		<h1>État inconnu</h1>
		<pre>{JSON.stringify(data, null, 2)}</pre>
	{/if}
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
  }
</style>
