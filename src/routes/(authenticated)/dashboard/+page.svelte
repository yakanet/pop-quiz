<script lang="ts">
	let { data } = $props();
</script>

<main>

	<h1>List des pools de quizz</h1>
	<ul>
		{#each data.pools as pool}
			<li>
				<a href="/dashboard/{pool.id}">
					{pool.name} - {pool.state}
				</a>
			</li>
		{/each}
	</ul>
</main>
