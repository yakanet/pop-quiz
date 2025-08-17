<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>
<img src="chapitre{question.id}.png" alt="Chapitre {question.id}" style="margin-bottom:30px" />
<h2 style="text-align: center;">
	Soyez attentif !<br/>
	Dans quelques minutes,<br/>c’est vous qui aurez la parole !
	
</h2>



