<script lang="ts">
	interface Prop {
		id: number
	}
	let {id}: Prop = $props();
</script>

<h1>Question {id}</h1>