<script lang="ts">
	import type { Question } from '$lib/server/db/schema';
	import { Chart } from 'chart.js/auto';
	import { itemsColors } from '$lib/colors';

	interface Prop {
		question: Question;
		votes: {
			id: number
			label: string
			count: number
		}[];
	}

	let { question, votes }: Prop = $props();
	console.log(votes);

	/*
	function chart(element: HTMLCanvasElement) {
		const c = new Chart(element, {
			type: 'pie',
			data: {
				labels: votes.map(v => v.label),
				datasets: [{
					data: votes.map(v => v.count),
					backgroundColor: itemsColors.slice(0, votes.length),
				}]
			},
			options: {}
		});
		return {
			destroy: () => c.destroy()
		};
	}
	*/
</script>

<b style="text-align:center;margin:40px 0px"><h1>{question.question}</h1></b>
<hr>

{#each votes as vote, i (vote.id)}
		<div style="display: flex; gap: 1rem;">
			<div style="width: 30%; text-align:center; font-size:2em; font-weight:bold; display: flex; align-items: center; justify-content: center;color:#e009f3">
			{#if vote.count > 0}
				{Math.round((vote.count / votes.reduce((acc, v) => acc + v.count, 0)) * 100)}%
			{:else}
				0%
			{/if}
		</div>
		<div style="width: 70%; display: flex; align-items: center; padding: 1rem;">
			<span style="font-weight:bold;font-size:1.1em">{@html vote.label}</span>
		</div>
	</div>
	<hr/>
{/each}



<style lang="scss">
  .chart-wrapper {
    display: flex;
    justify-content: center;
    height: 500px;
  }
</style>