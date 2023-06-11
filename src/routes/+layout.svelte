<script lang='ts'>
  import '../app.css';
  import { page }                      from '$app/stores';
  import Logo                          from '$lib/ui/Logo.svelte';
  import { fade, fly, slide }          from 'svelte/transition';
  import { activeImage, scrollHeight } from '../api/api';

  let menuOpen    = false;
  let pageName    = 'Home';
  let windowWidth = 0;

  $: if ($page.url.pathname === '/') {
    pageName = 'Home';
  } else if ($page.url.pathname === '/rsvp') {
    pageName = 'RSVP';
  } else {
    pageName = $page.url.pathname.slice(1, 2).toUpperCase() +
      $page.url.pathname.slice(2).toLowerCase();
  }

  let main: HTMLElement;

  let scroll = () => {
    scrollHeight.set(window.scrollY - main.offsetTop);
  };

  let keypressModal = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === 'Escape') {
      activeImage.set(undefined);
    }
  };
</script>

<svelte:head>
  <title>StellarMelodies - {pageName}</title>
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} on:scroll={scroll} />

<Logo phone height='2rem' />
<nav>
  <Logo desktop height='2rem' />
  {#if windowWidth < 750}
    <div class='menu-button'
         on:click={() => menuOpen = !menuOpen}
         on:keypress={(event) => {
          if (event.key === 'Enter') {
            menuOpen = !menuOpen;
            }
        }}>
      Menu
    </div>
  {/if}
  {#if menuOpen || windowWidth >= 750}
    <div transition:slide
         class:shown={menuOpen} id='menu-items'>
      <a href='/'
         on:click={() => menuOpen = false}
         class:active={$page.url.pathname === '/'}>Home</a>
      <a href='/info'
         on:click={() => menuOpen = false}
         class:active={$page.url.pathname === '/info'}>Info</a>
      <a href='/rsvp'
         on:click={() => menuOpen = false}
         class:active={$page.url.pathname === '/rsvp'}>RSVP</a>
      <a href='/gallery'
         on:click={() => menuOpen = false}
         class:active={$page.url.pathname === '/gallery'}>Gallery</a>
    </div>
  {/if}
</nav>

<main bind:this={main}>
  <slot />
  <footer>
    &copy;
    {new Date().getFullYear()} StellarMelodies
  </footer>
</main>

{#if $activeImage}
  <div class='modal'
       transition:fade={{ duration: 300 }}
       on:keypress={keypressModal}
       on:click={() => activeImage.set(undefined)}>
    <div class='close-button' on:click={() => activeImage.set(undefined)}
         on:keypress={(e) => {
           if (e.key === "Enter") {
             activeImage.set(undefined);
           }
         }}>
      <span class='material-symbols-outlined'>
        close
      </span>
    </div>
    <div transition:fly={{ y: 100, duration: 300 }}
         class='modal-content'>
      <img src={$activeImage.download_url} alt={$activeImage.author} />
    </div>
  </div>
{/if}

<style>
    nav {
        position: sticky;
        top: 0;
        z-index: 50;

        background-color: #333;
    }

    nav a, .menu-button {
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
        z-index: 1;
    }

    .menu-button:hover {
        cursor: pointer;
    }

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        z-index: 200;
        inset: 0;

        max-width: 100dvw;
        max-height: 100dvh;
        padding: 1rem;

        background: rgba(0, 0, 0, 0.6);
    }

    .modal img {
        /*display: none;*/
        object-fit: contain;
        height: 100%;
        width: auto;
        max-width: 100%;
        max-height: 100%;
    }

    .modal div:not(.close-button) {
        position: relative;
        height: 200px;
        min-height: 100%;
        width: 100%;
        text-align: center;
    }

    .modal .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;

        width: 3.5rem;
        aspect-ratio: 1;

        display: grid;
        place-items: center;

        font-size: 2rem;
        font-weight: bold;
        background: black;
        border: 1px solid white;
        border-radius: 50%;
    }

    .close-button:hover {
        cursor: pointer;
    }

    @media (min-width: 750px) {
        .modal {
            padding: 3rem;
        }
    }
</style>