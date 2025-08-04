<script lang="ts">
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>

<h1>{question.question}</h1>
<p>Peut être un petit speech du présentateur ici</p>