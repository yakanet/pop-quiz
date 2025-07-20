<script lang="ts">

  let { data } = $props();
</script>

<main>
  <pre>{JSON.stringify(data.pool, null, 2)}</pre>
  <pre>{JSON.stringify(data.questions, null, 2)}</pre>
</main>
