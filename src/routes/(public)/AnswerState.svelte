<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>
<div style="text-align:center;margin-top:2rem;">

<h1>Merci d'avoir répondu<br/>à cette question !</h1> 
<br><br/>
<h2 style="color:#2e8d3b">Attendons ensemble les résultats ...</h2>
</div>
