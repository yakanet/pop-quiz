<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import editIcon from 'virtual:icons/material-symbols:edit-outline.svg';
  import deleteIcon from 'virtual:icons/material-symbols:delete-outline.svg';
  import addIcon from 'virtual:icons/material-symbols:add-2.svg';

  import Icon from '$lib/components/Icon.svelte';

  let { data } = $props();
  const handleDelete: SubmitFunction = async ({ cancel }) => {
    if (!confirm(`Voulez-vous supprimer cette question ?`)) {
      cancel();
    }
  };
</script>

<main>
  <div class="top-action-bar">
    <form action="?/add" method="post">
      <button type="submit" class="btn btn-primary" formaction="?/add">
        <Icon icon={addIcon} size={16} />
        Nouvelle question
      </button>
    </form>
  </div>
  <table>
    <thead>
      <tr>
        <th>Question</th>
        <th class="number">Propositions</th>
        <th style="width: 0">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each data.questions as question (question.id)}
        <tr>
          <td>{question.question}</td>
          <td class="number">{question.items.length}</td>
          <td>
            <div class="actions">
              <a href="/admin/questions/{question.id}" class="btn btn-primary">
                <Icon icon={editIcon} size={16} />
                Edit
              </a>
              <form use:enhance={handleDelete} action="?/delete" method="POST">
                <button type="submit" name="id" value={question.id} class="btn btn-danger">
                  <Icon icon={deleteIcon} size={16} />
                  Delete
                </button>
              </form>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style lang="scss">
  .top-action-bar {
    display: flex;
    justify-content: end;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--color-primary-200);
  }

  .number {
    text-align: right;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }
</style>
