<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { quadIn } from "svelte/easing";

  interface Props {
    src: string;
    alt?: string;
  }

  let { src, alt = "" }: Props = $props();

  let isVideo = $state(false);
  let loaded = $state(false);

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
    <video in:fade|global={{duration: 1000, easing: quadIn}}
           {src} onclick={bubble('click')} onkeypress={bubble('keypress')}></video>
  {:else}
    <img in:fade|global={{duration: 1000, easing: quadIn}}
         {src} {alt} onclick={bubble('click')} onkeypress={bubble('keypress')} loading="lazy" decoding="async" />
  {/if}
{/if}