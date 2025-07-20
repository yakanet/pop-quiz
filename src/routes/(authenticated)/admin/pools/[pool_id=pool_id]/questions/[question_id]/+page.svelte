<script lang="ts">
  import { enhance } from '$app/forms';
  import deleteIcon  from 'virtual:icons/material-symbols:delete-outline.svg';
  import addIcon     from 'virtual:icons/material-symbols:add-2.svg';
  import Icon        from '$lib/components/Icon.svelte';

	let { data } = $props();
	let items = $state<{ id?: number; title: string }[]>([...data.question.items])
  let newItem = $state('');

  function handleDelete(item: { id?: number; title: string }) {
    if (!item.id) {
      items = items.filter((i) => i.title !== item.title);
    } else {
      item.id *= -1;
    }
  }

  function handleAdd() {
    if (!newItem) {
      return;
    }
    items = [...items, { title: newItem }];
    newItem = '';
  }
</script>

<main>
  <form method="POST" use:enhance>
    <div class="question-form">
      <label>
        Type de question:
        <select name="questionType" bind:value={data.question.questionType}>
          <option value="SINGLE">Choix unique</option>
        </select>
      </label>

      <label>
        Question:
        <input type="text" name="question" value={data.question.question} />
      </label>

      <div class="items">
        <h3>Propositions:</h3>
        {#each items as item, index (index)}
          {#if (item.id ?? 0) >= 0}
            <div class="item">
              <input type="text" name="items[{item.id}]" bind:value={item.title} />
              <button
                class="btn btn-danger"
                type="button"
                aria-label="Supprimer"
                onclick={() => handleDelete(item)}
              >
                <Icon icon={deleteIcon} size={16} />
              </button>
            </div>
          {:else}
            <input type="hidden" name="items[{item.id}]" bind:value={item.title} />
          {/if}
        {/each}

        <hr />
        <div class="item">
          <input type="text" bind:value={newItem} placeholder="Nouvel item" />
          <button
            class="btn btn-secondary"
            type="button"
            aria-label="Ajouter"
            onclick={() => handleAdd()}
          >
            <Icon icon={addIcon} size={16} />
          </button>
        </div>
      </div>

      <button class="btn btn-primary" type="submit">Enregistrer</button>
    </div>
  </form>
</main>

<style lang="scss">
  .question-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .item {
    display: flex;
    gap: 0.5rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  input,
  select {
    padding: 0.5rem;
    width: 100%;
  }
</style>
