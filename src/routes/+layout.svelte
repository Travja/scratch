<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
</script>

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
</style>