<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { quadIn } from "svelte/easing";

  export let src: string;
  export let alt = "";

  let isVideo = false;
  let loaded = false;

  onMount(async () => {
    if (src.endsWith("webm") || src.endsWith("mp4") || src.endsWith("ogg") || src.endsWith("mov")) {
      isVideo = true;
      loaded = true;
      return;
    }

    let image = new Image();
    image.src = src;
    image.onload = () => loaded = true;
  });
</script>

{#if loaded}
  {#if isVideo}
    <video in:fade={{duration: 1000, easing: quadIn}}
           {src} on:click on:keypress/>
  {:else}
    <img in:fade={{duration: 1000, easing: quadIn}}
         {src} {alt} on:click on:keypress loading="lazy" decoding="async" />
  {/if}
{/if}