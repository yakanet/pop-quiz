<script lang="ts">
	interface Prop {
		id: string
	}
	let {id}: Prop = $props();
</script>

<h1>Question {id}</h1>