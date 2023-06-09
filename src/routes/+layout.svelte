<script lang="ts">
  import "../app.css";
  import { page }         from "$app/stores";
  import Logo             from "$lib/ui/Logo.svelte";
  import { slide }        from "svelte/transition";
  import { scrollHeight } from "../api/api";

  let menuOpen    = false;
  let pageName    = "Home";
  let windowWidth = 0;

  $: if ($page.url.pathname === '/') {
    pageName = 'Home'
  } else if ($page.url.pathname === '/rsvp') {
    pageName = 'RSVP'
  } else {
    pageName = $page.url.pathname.slice(1, 2).toUpperCase() +
      $page.url.pathname.slice(2).toLowerCase();
  }

  let main: HTMLElement;

  let scroll = () => {
    scrollHeight.set(main.scrollTop);
  };
</script>

<svelte:head>
  <title>StellarMelodies - {pageName}</title>
</svelte:head>

<svelte:window bind:innerWidth={windowWidth}/>

<nav>
  <Logo height="2rem"/>
  {#if windowWidth < 750}
    <div class="menu-button"
         on:click={() => menuOpen = !menuOpen}
         on:keypress={() => {
          if (event.key === 'Enter') {
            menuOpen = !menuOpen;
            }
        }}>
      Menu
    </div>
  {/if}
  {#if menuOpen || windowWidth >= 750}
    <div transition:slide
         class:shown={menuOpen} id="menu-items">
      <a href="/"
         on:click={() => menuOpen = false}
         class:active={$page.url.pathname === '/'}>Home</a>
      <a href="/rsvp"
         on:click={() => menuOpen = false}
         class:active={$page.url.pathname === '/rsvp'}>RSVP</a>
      <a href="/gallery"
         on:click={() => menuOpen = false}
         class:active={$page.url.pathname === '/gallery'}>Gallery</a>
    </div>
  {/if}
</nav>

<main on:scroll={scroll} bind:this={main}>
  <slot/>
  <div class="spacer"></div>
  <footer>
    &copy;
    {new Date().getFullYear()} StellarMelodies
  </footer>
</main>


<style>
    nav {
        position: relative;
        background-color: #333;
    }

    nav a, .menu-button {
        display: grid;
        place-items: center;
        text-align: center;
        color: #ddd;
        text-decoration: none;
        padding: 1rem;

        transition: background-color 0.3s ease;
    }

    nav :global(.logo) {
        background: #222;
        display: grid;
    }

    nav a:hover {
        background-color: #222;
    }

    nav a.active {
        background-color: #3d7ac2;
    }


    @media (min-width: 750px) {
        nav {
            display: flex;
            justify-content: flex-start;
            align-items: stretch;

            position: sticky;
            top: 0;
            z-index: 1;
        }

        nav > :global(*) {
            flex-grow: 1;
        }

        nav :global(.logo) {
            background: unset;
            flex-grow: 0;
            display: inline-grid;
            margin-inline: 0.5rem;
        }

        #menu-items {
            display: inline-flex;
            flex-direction: row;
            gap: 1rem;
        }
    }

    footer {
        background-color: #333;
        color: #eee;
        padding: 0.5rem;
        font-size: 0.8rem;
    }

    main {
        /*max-height: 100dvh;*/
        /*flex-grow: 1;*/
        display: flex;
        flex-direction: column;

        height: 10%;
        flex-grow: 1;
        overflow: auto;
    }

    .menu-button:hover {
        cursor: pointer;
    }

    .spacer {
        flex: 1;
    }
</style>