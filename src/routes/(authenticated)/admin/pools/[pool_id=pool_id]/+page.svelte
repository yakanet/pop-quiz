<script lang="ts">
  import { enhance } from '$app/forms';

  let { data } = $props();
</script>

<main>
  <form action="?/state" use:enhance method="POST">
    <button name="state" class:selected={data.state.state === 'NOT_STARTED'} value="NOT_STARTED">
      Non démarré
    </button>
    <button name="state" class:selected={data.state.state === 'QUESTION'} value="QUESTION_1">
      Question 1
    </button>
    <button name="state" class:selected={data.state.state === 'FINISHED'} value="FINISHED">
      Fermer
    </button>
  </form>

  <pre>{JSON.stringify(data.pool, null, 2)}</pre>
  <pre>{JSON.stringify(data.questions, null, 2)}</pre>

</main>

<style lang="scss">
  button.selected {
    border-color: var(--color-primary-500);
  }
</style>
