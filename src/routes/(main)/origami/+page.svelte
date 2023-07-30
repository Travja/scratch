<script>
  import Pattern from '$lib/Pattern.svelte';
</script>

<div>
  <h1>Help us decorate!</h1>
  <p>Pick a pattern! Fold! Hang it on the tree!</p>
  <hr />
  <Pattern img='/patterns/crane.png' label='Crane' />
  <hr />
  <Pattern img='/patterns/butterfly.avif' label='Butterfly' />
  <hr />
  <Pattern img='/patterns/rabbit.jpg' label='Rabbit' />
  <hr />
  <Pattern img='/patterns/swan.jpg' label='Swan' />
  <hr />
  <Pattern img='/patterns/heart.jpg' label='Heart' />
</div>

<style>
  div {
    margin: 1rem;
  }

  h1, p {
    display: block;
    text-align: center;
  }
</style>