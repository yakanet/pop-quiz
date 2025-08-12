<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question, QuestionItem } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
		items: QuestionItem[];
		maxVoting: number;
		currentVoting: number;
	}

	let { question, maxVoting, currentVoting }: Prop = $props();
</script>
<div class="question-state">
	<QuestionTitle title={question.question} />
	<p>
		<strong>Votes : </strong>
		{currentVoting ?? 0} / {maxVoting ?? 0}
	</p>
</div>

<style lang="scss">
  .question-state {
    text-align: center;
  }
</style>