<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Logo from "$lib/ui/Logo.svelte";
  import { slide } from "svelte/transition";

  let menuOpen = false;
  let windowWidth = 0;
</script>

<svelte:head>
  <title>StellarMelodies | {$page.error?.message || 'Error'}</title>
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />

<Logo phone height="2rem" />
<nav>
  <Logo desktop height="2rem" />
  {#if windowWidth < 750}
    <div
      class="menu-button"
      on:click={() => (menuOpen = !menuOpen)}
      on:keypress={(event) => {
        if (event.key === 'Enter') {
          menuOpen = !menuOpen;
        }
      }}
    >
      Menu
    </div>
  {/if}
  {#if menuOpen || windowWidth >= 750}
    <div transition:slide class:shown={menuOpen} id="menu-items">
      <a href="/" on:click={() => (menuOpen = false)} class:active={$page.url.pathname === '/'}
      >Home</a
      >
      <a
        href="/info"
        on:click={() => (menuOpen = false)}
        class:active={$page.url.pathname === '/info'}>Info</a
      >
      <a
        href="/rsvp"
        on:click={() => (menuOpen = false)}
        class:active={$page.url.pathname === '/rsvp'}>RSVP</a
      >
      <a
        href="/gallery"
        on:click={() => (menuOpen = false)}
        class:active={$page.url.pathname === '/gallery'}>Gallery</a
      >
    </div>
  {/if}
</nav>

<main>
  <div class="content">
    <h1>{$page.status} - {$page.error?.message || 'Error'}</h1>
    {#if $page.status == 404}
      <div>Sorry! This page couldn't be found. It may have been removed.</div>
    {:else}
      <div>Sorry! Something went wrong. If you're seeing this page, you probably shouldn't be.</div>
      <div>Please let Travis know this is broken and how you got here!</div>
    {/if}
  </div>
  <footer>
    &copy;
    {new Date().getFullYear()} StellarMelodies
  </footer>
</main>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 50;

    background-color: #333;
  }

  nav a,
  .menu-button {
    display: grid;
    place-items: center;
    text-align: center;
    color: #eff8e2;
    text-shadow: 0 0 0.5rem #111;
    text-decoration: none;
    padding: 1rem;

    transition: background-color 0.3s ease;
  }

  .menu-button {
    display: block;
    position: relative;
    z-index: 5;
    background: #ef626c;
    box-shadow: 0 0 0.5rem #111;
  }

  nav :global(.logo) {
    background: #222;
  }

  nav a:hover {
    background-color: #222;
  }

  nav a.active {
    background-color: #3d7ac2;
  }

  #menu-items {
    position: absolute;
    background-color: #333;
    left: 0;
    right: 0;
  }

  @media (min-width: 750px) {
    nav {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      box-shadow: 0 0 0.5rem #111;
    }

    nav > :global(*) {
      flex-grow: 1;
    }

    nav :global(.logo) {
      background: unset;
      flex-grow: 0;
      display: inline-grid;
      padding-inline: 1rem;
    }

    #menu-items {
      position: relative;
      display: inline-flex;
      flex-direction: row;
      gap: 1rem;
    }

    .menu-button {
      display: none;
    }
  }

  footer {
    background-color: #333;
    color: #eee;
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: space-between;
  }

  .content {
    padding: 1rem;
    flex-grow: 1;
  }

  .menu-button:hover {
    cursor: pointer;
  }
</style>
