<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>
<div style="text-align:center;margin-top:2rem;">

	<b>"{question.question}"</b><br><br/>
<h1>Merci d'avoir répondu à cette question !</h1> 
<br><br/>
Attendons ensemble les résultats ...
</div>
