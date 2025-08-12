<script lang="ts">

interface Prop {
    title: string;
}

let { title }: Prop = $props();
</script>

<h1>{@html title}</h1>