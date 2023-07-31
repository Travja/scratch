<script>
  import Pattern from '$lib/Pattern.svelte';
</script>

<div>
  <h1>Help us decorate!</h1>
  <p>Pick a pattern! Fold! Hang it on the tree!</p>
  <hr />
  <Pattern img='/patterns/crane.png' label='Crane'
  meaning='Happiness & Luck'/>
  <hr />
  <Pattern img='/patterns/butterfly.avif' label='Butterfly'
  meaning='Marital Joy'/>
  <hr />
  <Pattern img='/patterns/rabbit.jpg' label='Rabbit'
  meaning='Good Luck'/>
  <hr />
  <Pattern img='/patterns/swan.jpg' label='Swan'
  meaning='Harmony, Peace, Patience, Eternal Love'/>
  <hr />
  <Pattern img='/patterns/heart.jpg' label='Heart'
  meaning='Love'/>
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