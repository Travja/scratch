<!--suppress CssUnresolvedCustomProperty -->
<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  export let src: string;
  export let alt = "";
  export let caption = "";
  export let author = "";
  export let maxWidth = 200;
  export let maxHeight = 200;

  let x: number;
  let y: number;
  let height: number;
  let width: number;
  let rotation: number;

  let totalUsableWidth = 0;
  let totalUsableHeight = 0;

  let isVideo = false;
  let loaded = false;

  onMount(() => {
    if (src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg") || src.endsWith(".mov")) {
      // It's a video
      if (maxWidth > maxHeight) {
        width = Math.min(maxWidth / 2, 400);
        height = width * 0.75;
      } else {
        height = Math.min(maxHeight / 2, 400);
        width = height * 0.75;
      }

      totalUsableWidth = maxWidth - (width / 2);
      totalUsableHeight = maxHeight - (height / 2);
      x = Math.random() * totalUsableWidth - width / 3;
      y = Math.random() * totalUsableHeight - height / 3;
      rotation = Math.random() * 90 - 45;
      isVideo = true;
      loaded = true;
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      let adjustment = Math.random() * 0.2 + 0.9;
      if (img.height > img.width || maxWidth / maxHeight < 1.5) {
        height = Math.min(img.height, Math.max(maxHeight / 2.5, 200)) * adjustment;
        const ratio = height / img.height;
        width = img.width * ratio;
      } else {
        width = Math.min(img.width, Math.max(maxWidth / 4, 200)) * adjustment;
        const ratio = width / img.width;
        height = img.height * ratio;
      }

      totalUsableWidth = maxWidth - (width / 2);
      totalUsableHeight = maxHeight - (height / 2);
      x = Math.random() * totalUsableWidth - width / 3;
      y = Math.random() * totalUsableHeight - height / 3;
      rotation = Math.random() * 90 - 45;

      loaded = true;
    };
  });
</script>

<div
  out:fly={{ y: 100, duration: 300 }}
  class:loaded
  class="polaroid"
  style:--x="{x}px"
  style:--y="{y}px"
  style:--rotation="{rotation}deg"
  style:--height="{height}px"
  style:--width="{width}px"
>
  {#if isVideo}
    <video autoplay loop muted playsinline {src}></video>
  {:else}
    <img {src} {alt} />
  {/if}
  <div class="caption">
    {caption || ''}
  </div>
</div>

<style>
  @keyframes fall {
    0% {
      transform: translateZ(500px);
    }
    100% {
      transform: translateZ(0);
    }
  }

  .polaroid {
    --back-color: #e8e6e6;

    display: inline-flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    opacity: 0;
    position: absolute;
    background: var(--back-color);
    border: 0.5rem solid var(--back-color);
    border-radius: 0.25em;
    color: black;
    width: min-content;

    box-shadow: 0 0 0.5rem black;

    rotate: var(--rotation);
    left: var(--x);
    top: var(--y);
    transition: opacity 0.5s ease-in-out;
  }

  .loaded {
    opacity: 1;
    animation: fall 1s ease-in;
  }

  img, video {
    max-height: var(--height, auto);
    max-width: var(--width, auto);
  }

  .caption {
    position: relative;
    flex: 1;
    min-height: 2.5rem;
    white-space: normal;

    margin-top: 0.5rem;
    font-family: 'Indie Flower', cursive;
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
    padding: 0.5rem;
  }
</style>