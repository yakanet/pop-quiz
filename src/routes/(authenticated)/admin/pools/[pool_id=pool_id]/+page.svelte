<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';

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
      <button type="submit" class="btn btn-primary" formaction="?/add">Nouvelle question</button>
    </form>
  </div>
  <table>
    <thead>
      <tr>
        <th>Question</th>
        <th class="number">Propositions</th>
        <th style="width: 0px">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each data.questions as question (question.id)}
        <tr>
          <td>{question.question}</td>
          <td class="number">{question.items.length}</td>
          <td>
            <div class="actions">
              <a href="/admin/pools/{data.pool.id}/questions/{question.id}" class="btn btn-primary">
                Edit
              </a>
              <form use:enhance={handleDelete} action="?/delete" method="POST">
                <button type="submit" name="id" value={question.id} class="btn btn-danger">
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

  .btn {
    appearance: none;
    padding: 0.5rem 1rem;
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-primary {
    background-color: var(--color-primary-500);

    &:hover {
      background-color: var(--color-primary-600);
    }
  }

  .btn-danger {
    background-color: #dc2626;

    &:hover {
      background-color: #b91c1c;
    }
  }
</style>
