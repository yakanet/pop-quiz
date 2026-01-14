<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>

<div style="text-align:center;margin-top:2rem;">

<b><h1>Les votes sont<br/>terminés !</h1></b>
<br><br/>
Partageons ensemble les résultats sur la vidéo projection...
</div>