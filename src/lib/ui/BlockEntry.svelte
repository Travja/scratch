<script lang="ts">
  import { scrollHeight }       from "../../api/api";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber }  from "svelte/store";

  export let background = "url('https://source.unsplash.com/featured/1920x1080')";
  export let shadow     = "none";

  let entry: HTMLElement;
  let top = 0;

  let scroll                        = 0;
  let sub: Unsubscriber | undefined = undefined;

  onMount(() => {
    sub = scrollHeight.subscribe((val) => {
      scroll = (val / -2) + (top / 2);
    })
  });

  onDestroy(() => {
    if (sub) {
      sub();
    }
  });

  let calcTop = () => {
    if (entry) {
      top = entry.offsetTop;
    }
  }

  onMount(calcTop);
</script>

<svelte:window on:resize={calcTop}/>

<div class="block-entry"
     style:--background="{background}"
     style:--offset="{scroll}px"
     style:--shadow="{shadow}"
     style:z-index="{shadow !== 'none' ? 2 : 0}"
     bind:this={entry}>


  <slot></slot>
</div>

<style>
    .block-entry {
        display: grid;
        place-items: center;
        position: relative;

        box-sizing: border-box;
        background: var(--background, "none");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position-y: var(--offset, 0px);

        box-shadow: var(--shadow, "none");

        overflow: auto;
        height: 100dvh;
        padding-inline: 0.5rem;
    }

    @media (min-width: 750px) {
        .block-entry {
            padding-inline: 1.5rem;
        }
    }
</style>