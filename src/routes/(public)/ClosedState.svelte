<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>

<div style="text-align:center;margin-top:2rem;">

<h1>Les votes sont<br/>terminés !</h1>
<br><br/>
<h2 style="color:#2e8d3b">Partageons ensemble les résultats sur l'écran</h2>

</div>