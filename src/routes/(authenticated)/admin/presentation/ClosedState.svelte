<script lang="ts">
	import type { Question } from '$lib/server/db/schema';
	import { Chart } from 'chart.js/auto';
	import { itemsColors } from '$lib/colors';
    import QuestionTitle from '$lib/components/QuestionTitle.svelte';

	interface Prop {
		question: Question;
		votes: {
			id: number
			label: string
			count: number
		}[];
	}

	let { question, votes }: Prop = $props();

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
</script>

<QuestionTitle title={question.question} />
<div class="chart-wrapper">
	<canvas use:chart></canvas>
</div>

<style lang="scss">
  .chart-wrapper {
    display: flex;
    justify-content: center;
    height: 500px;
  }
</style>