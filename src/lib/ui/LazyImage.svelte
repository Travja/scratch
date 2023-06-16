<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { quadIn } from "svelte/easing";

  export let src: string;
  export let alt = "";

  let loaded = false;

  onMount(async () => {
    let image = new Image();
    image.src = src;
    image.onload = () => loaded = true;
  });
</script>

{#if loaded}
  <img in:fade={{duration: 1000, easing: quadIn}}
       {src} {alt} on:click on:keypress loading="lazy" decoding="async" />
{/if}