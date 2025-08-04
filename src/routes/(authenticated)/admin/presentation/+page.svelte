<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Readable } from 'svelte/store';
	import type { QuizState } from '$lib/quiz.model';
	import { source } from 'sveltekit-sse';
	import PrepareQuestionState from './PrepareQuestionState.svelte';
	import QuestionState from './QuestionState.svelte';
	import ClosedState from './ClosedState.svelte';
	import FinishedState from './FinishedState.svelte';
	import NotStartedState from './NotStartedState.svelte';

	let { data } = $props();
	let state = $derived(data.stats.state);
	const newState: Readable<QuizState> = source(`/status`).select('message').json();

	$effect(() => {
		if (!$newState) {
			return;
		}
		invalidateAll();
	});
	$effect(() => {
		const timeoutId = setInterval(() => {
			if (data.stats.state.state === 'QUESTION') {
				invalidateAll();
			}
		}, 5_000);
		return () => clearTimeout(timeoutId);
	});
</script>

<main>
	{#if state.state === 'PREPARE_QUESTION' && data.question}
		<PrepareQuestionState question={data.question} />
	{:else if state.state === 'QUESTION' && data.question}
		<QuestionState question={data.question}
									 maxVoting={data.stats.total_user}
									 currentVoting={data.stats.user_votes}
									 items={data.question.items} />
	{:else if state.state === 'CLOSED_QUESTION' && data.question}
		<ClosedState question={data.question}
								 votes={data.stats.votes}
		/>
	{:else if state.state === 'NOT_STARTED'}
		<NotStartedState />
	{:else if state.state === 'FINISHED'}
		<FinishedState />
	{:else}
		<h1>État inconnu</h1>
		<pre>{JSON.stringify(data, null, 2)}</pre>
	{/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;
    }
</style>
