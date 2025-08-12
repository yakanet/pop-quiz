<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>

<QuestionTitle title={question.question} />
<p>Il n'y a plus le temps pour voter. Résultat en cours.</p>
