<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let scrolled = false;
  let shown = false;

  onMount(() => {
    setTimeout(() => {
      if (!scrolled) {
        shown = true;
      }
    }, 3000);
  });

  let scroll = () => {
    scrolled = true;
    shown = false;
  };
</script>

<svelte:window on:scroll={scroll} />

{#if shown}
  <div class="container" transition:fade>
    <div class="indicator">
      <span class="material-icons"> keyboard_double_arrow_down </span>
      Scroll
    </div>
  </div>
{/if}

<style>
  @keyframes bob {
    0% {
      transform: translateY(-0.1rem);
    }
    100% {
      transform: translateY(0.1rem);
    }
  }

  .container {
    position: fixed;
    bottom: 1rem;
    right: 0;
    left: 0;
    display: grid;
    place-items: center;
    z-index: 100;
  }

  .indicator {
    padding: 0.5rem 0.75rem 0.5rem 0.5rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .material-icons {
    animation: infinite bob 0.75s ease-in-out alternate;
  }
</style>
