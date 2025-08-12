<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>
<QuestionTitle title={question.question} />
<p>Attendez un moment avant de pouvoir participer à cette question</p>
