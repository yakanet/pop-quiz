<script lang="ts">
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>
<h1>{question.question}</h1>
<p>Attendez un moment avant de pouvoir participer à cette question</p>
