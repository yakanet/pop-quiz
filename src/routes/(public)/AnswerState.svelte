<script lang="ts">
	import type { Question } from '$lib/server/db/schema';

	interface Prop {
		question: Question;
	}

	let { question }: Prop = $props();
</script>
<h1>Vous avez déjà répondu à cette question</h1>
