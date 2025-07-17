<script lang="ts">
	let {data} = $props();
</script>

<main>
	<pre>{JSON.stringify(data, null, 2)}</pre>

</main>
