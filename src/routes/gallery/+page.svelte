<script lang="ts">
</script>

<content>
  <a class="card" href="/gallery/engagements" style:background-image="url('us.jpg')">
    <h1 class="cursive">Engagements</h1>
  </a>
  <a class="card" href="/gallery/bridals" style:background-image="url('us.jpg')">
    <h1 class="cursive">Bridals</h1>
  </a>
  <a class="card" href="/gallery/temple" style:background-image="url('/temple.webp')">
    <h1 class="cursive">Temple</h1>
  </a>
  <a
    class="card"
    href="/gallery/reception"
    style:background-image="url('https://source.unsplash.com/1600x900/?wedding')"
  >
    <h1 class="cursive">Reception</h1>
  </a>
</content>

<style>
  content {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    overflow: hidden;
    flex-grow: 1;
  }

  .card {
    background-position: center;
    background-size: cover;
    border-radius: 3rem;
    overflow: hidden;
    box-shadow: 0 0 1rem #111;

    color: white;
    text-decoration: none;
    font-weight: normal;

    display: grid;
    place-items: center;
    position: relative;
    transition: transform 0.3s ease-in-out;
  }

  .card:hover {
    z-index: 10;
    transform: scale(106%);
    cursor: pointer;
  }

  h1 {
    margin: unset;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    padding: 5rem;
    padding-block: 10rem;
    text-align: center;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.3);

    text-shadow: -1px -1px 5px #111, 1px -1px 5px #111, -1px 1px 5px #111, 1px 1px 5px #111;
  }

  @media (min-width: 750px) {
    content {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
