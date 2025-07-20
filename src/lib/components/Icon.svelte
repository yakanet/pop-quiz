<script lang="ts">
  interface Props {
    icon: { width: number; height: number; body: string };
    size?: number;
  }
  let { icon, size = 24 }: Props = $props();
</script>

<svg
  viewBox="0 0 {icon.width} {icon.height}"
  width={size}
  height={size}
  style="min-width: {size}"
  aria-hidden="true"
>
  <!-- eslint-disable svelte/no-at-html-tags-->
  {@html icon.body}
</svg>
