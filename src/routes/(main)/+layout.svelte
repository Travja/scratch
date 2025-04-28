<script lang='ts'>
  import { run } from 'svelte/legacy';

  import '../../app.css';
  import { page } from '$app/stores';
  import Logo from '$lib/ui/Logo.svelte';
  import { slide } from 'svelte/transition';
  import { isSafari, scrollHeight } from '../../api/api';
  import { onMount } from 'svelte';

  interface Props {
    data: { isSafari: boolean };
    children?: import('svelte').Snippet;
  }

  let { data, children }: Props = $props();

  let menuOpen = $state(false);
  let pageName = $state('Home');
  let windowWidth = $state(0);

  onMount(() => isSafari.set(data.isSafari));

  run(() => {
    if ($page.url.pathname === '/') {
      pageName = 'Home';
    } else if ($page.url.pathname === '/rsvp') {
      pageName = 'RSVP';
    } else {
      pageName =
        $page.url.pathname.slice(1, 2).toUpperCase() + $page.url.pathname.slice(2).toLowerCase();
    }
  });

  let main: HTMLElement | undefined = $state();

  let scroll = () => scrollHeight.set(window.scrollY - (main?.offsetTop ?? 0));
</script>

<svelte:head>
  {#if !$page.url.pathname.includes("gallery/")}
    <title>SavAndWes | {pageName}</title>
    <meta content='SavAndWes - {pageName}' property='og:title' />
  {/if}
  <meta content='Savannah and Wesley are getting married. Join us for the celebration!' name='og:description' />
  <meta content='https://savandwes.rsvp' property='og:url' />
  <meta content='https://savandwes.rsvp/embed-image.jpg' property='og:image' />
  <meta content='#A1FDE8' data-react-helmet='true' name='theme-color' />
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} onscroll={scroll} />

<Logo height='2rem' phone />
<nav>
  <Logo desktop height='2rem' />
  {#if windowWidth < 750}
    <div
      role='button'
      tabindex='0'
      class='menu-button'
      onclick={() => (menuOpen = !menuOpen)}
      onkeydown={(event) => {
        if (event.key === 'Enter') {
          menuOpen = !menuOpen;
        }
      }}
    >
      Menu
    </div>
  {/if}
  {#if menuOpen || windowWidth >= 750}
    <div transition:slide|global class:shown={menuOpen} id='menu-items'>
      <a href='/' onclick={() => (menuOpen = false)} class:active={$page.url.pathname === '/'}
      >Home</a
      >
      <a
        href='/rsvp'
        onclick={() => (menuOpen = false)}
        class:active={$page.url.pathname === '/rsvp'}>RSVP</a
      >
      <a
        href='/gallery'
        onclick={() => (menuOpen = false)}
        class:active={$page.url.pathname === '/gallery'}>Gallery</a
      >
    </div>
  {/if}
</nav>
<!--<div id='announce'>Thank you! to everyone that was able to attend! Please enjoy pictures of the event!</div>-->

<main bind:this={main}>
  {@render children?.()}
  <footer>
    &copy;
    {new Date().getFullYear()} Travis Eggett
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

    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .menu-button {
    display: block;
    position: relative;
    z-index: 5;
    background: var(--color-secondary);
    box-shadow: 0 0 0.5rem #111;
  }

  nav :global(.logo) {
    background: #222;
  }

  nav a:hover {
    background-color: #222;
  }

  nav a.active {
    background-color: var(--color-primary);
    color: var(--color-p-text);
    text-shadow: none;
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

  .menu-button:hover {
    cursor: pointer;
  }

  /*#announce {*/
  /*  text-align: center;*/
  /*  padding: 1rem 0.5rem;*/
  /*  background-color: var(--color-secondary);*/
  /*  font-weight: bold;*/
  /*  text-shadow: 0 0 0.5rem #111;*/
  /*}*/
</style>
