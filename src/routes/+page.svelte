<script lang="ts">
	import PendingState from './PendingState.svelte';
	import QuestionState from './QuestionState.svelte';
	import { source } from 'sveltekit-sse';
	import type { Readable } from 'svelte/store';
	import type { QuizState } from '$lib/quiz.model';

	let { data } = $props();
	let state = $derived(data.state);
	const value = source('/api/quiz/status').select('message').json() as Readable<QuizState>;
	$effect(() => {
		if ($value) {
			state = $value;
		}
	});
</script>

{#if state.state === 'PENDING'}
	<PendingState />
{:else if state.state === 'QUESTION'}
	<QuestionState id={state.id} />
{/if}
{JSON.stringify(state)}