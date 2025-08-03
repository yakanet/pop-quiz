<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Readable } from 'svelte/store';
	import type { QuizState } from '$lib/quiz.model';
	import { source } from 'sveltekit-sse';

	let { data } = $props();

	const newState: Readable<QuizState> = source(`/status`).select('message').json();

	$effect(() => {
		if (!$newState) {
			return;
		}
		invalidateAll();
	})
	$effect(() => {
		const timeoutId = setTimeout(() => {
			invalidateAll();
		}, 5_000);
		return () => clearTimeout(timeoutId);
	});
</script>

<main>
	<pre>{JSON.stringify(data, null, 2)}</pre>
</main>
