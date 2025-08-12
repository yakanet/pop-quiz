<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
		maxVoting: number;
	}

	let { question, maxVoting }: Prop = $props();
</script>

<QuestionTitle title={question.question} />
<p>Peut être un petit speech du présentateur ici</p>
<p>Max : {maxVoting}</p>