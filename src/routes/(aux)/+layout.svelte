<script lang="ts">
  import "../../app.css";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

</script>

<svelte:head>
  <title>SavAndWes</title>
</svelte:head>

{@render children?.()}

<style>

</style>
