<script lang="ts">
	import type { Question } from '$lib/server/db/schema';
	import { Chart } from 'chart.js/auto';

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
					backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8']
				}]
			},
			options: {}
		});
		return {
			destroy: () => c.destroy()
		};
	}
</script>

<h1>{question.question}</h1>
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