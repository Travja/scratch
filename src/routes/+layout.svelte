<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";

  let pageName = "Home";

  $: if ($page.url.pathname === '/') {
    pageName = 'Home'
  } else if ($page.url.pathname === '/rsvp') {
    pageName = 'RSVP'
  } else {
    pageName = $page.url.pathname.slice(1, 2).toUpperCase() +
      $page.url.pathname.slice(2).toLowerCase();
  }

</script>

<svelte.head>
  <title>StellarMelodies - {pageName}</title>
</svelte.head>

<nav>
  <a href="/" class:active={$page.url.pathname === '/'}>Home</a>
  <a href="/rsvp" class:active={$page.url.pathname === '/rsvp'}>RSVP</a>
  <a href="/gallery" class:active={$page.url.pathname === '/gallery'}>Gallery</a>
</nav>

<main>
  <slot/>
</main>

<footer>
  <p>Footer</p>
</footer>

<style>
    nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #333;
    }

    nav a {
        text-decoration: none;
        flex-basis: 10%;
        text-align: center;
        padding: 1rem;
        color: #ddd;

        transition: background-color 0.3s ease;
    }

    nav a:hover {
        background-color: #222;
    }

    nav a.active {
        background-color: #3d7ac2;
    }

    footer {
        background-color: #333;
        color: #eee;
        padding: 0.5rem;
    }

    main {
        padding: 1rem;
        flex-grow: 1;
    }

    @media (min-width: 750px) {
        main {
            padding: 1rem 2rem;
        }
    }
</style>