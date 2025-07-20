<script lang="ts">
  let { data } = $props();
</script>

<main>
  <pre>{JSON.stringify(data.question, null, 2)}</pre>
</main>
