<script lang="ts">
  import { enhance } from '$app/forms';

  let { data } = $props();
</script>

<main>
  <form action="?/state" use:enhance method="POST">
    <button name="state" class:selected={data.state.state === 'PENDING'} value="PENDING">
      En attente
    </button>
    <button name="state" class:selected={data.state.state === 'QUESTION'} value="QUESTION_1">
      Question 1
    </button>
    <button name="state" class:selected={data.state.state === 'FINISHED'} value="FINISHED">
      Fermer
    </button>
  </form>

  <pre>{JSON.stringify(data.pool, null, 2)}</pre>
</main>

<style lang="scss">
  button.selected {
    border-color: var(--color-primary-500);
  }
</style>
