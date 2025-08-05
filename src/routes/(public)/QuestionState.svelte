<script lang="ts">
	import type { Question, QuestionItem } from '$lib/server/db/schema';
	import { enhance }                     from '$app/forms';
	import type { SubmitFunction }         from '@sveltejs/kit';
	import { itemsColors } from '$lib/colors';

	interface Prop {
		question: Question;
		items: QuestionItem[];
	}

	let { question, items }: Prop = $props();

	const handleSubmit: SubmitFunction = async ({ cancel }) => {
		if (!confirm(`Voulez-vous voter pour cette question ?`)) {
			cancel();
		}
	};
</script>

<h1>{question.question}</h1>
<form method="post" action="?/answer" use:enhance={handleSubmit}>
	<ul data-size={items.length}>
		{#each items as item, i (item.id)}
			<li>
				<button name="item_id" type="submit" value={item.id} style:--color={itemsColors[i]}>
					{item.title}
				</button>
			</li>
		{/each}
	</ul>
</form>

<style lang="scss">
  form {
    display: contents;
  }

  ul {
    margin: 0;
    margin-block-start: 1rem;
    flex: 1;
    list-style: none;
    padding: 0;
    display: grid;
    gap: 1rem;
  }

  li {
    display: contents;
  }

  ul[data-size="1"], ul[data-size="2"] {
    grid-template-columns: 1fr;
  }

  ul[data-size="3"] {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;

    li:last-child button {
      grid-column: span 2;
    }
  }

  ul[data-size="4"] {
    grid-template-columns: 1fr 1fr;
  }

  ul[data-size="5"] {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 2fr 1fr;

    li:last-child button {
      grid-column: span 2;
    }
  }

  button {
    appearance: none;
    background: var(--color);
		font-size: 1.2rem;
		border-radius: 4px;
    border: 2px solid hsl(from var(--color) h s calc(l - 10));
		cursor: pointer;
  }

</style>