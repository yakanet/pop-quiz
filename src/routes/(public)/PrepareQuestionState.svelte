<script lang="ts">
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>
<div style="display: flex; justify-content: center; margin-bottom: 10px;">
	<img src="chapitre{question.id}.png" alt="Chapitre {question.id}" style="width: 90%;" />
</div>
<h2 style="text-align: center;">
	Soyez attentif !<br/>
	Dans quelques minutes,<br/>c’est vous qui aurez la parole !
	
</h2>



