<script lang='ts'>
  export let label: string;
  export let meaning: string;
  export let img: string;
</script>

<div class='header'>
  <h2>
    {label}
  </h2>
  {#if meaning}
    <span class='meaning'>{meaning}</span>
  {/if}
</div>

<img src={img} alt='{label}' />

<style>
  .header, img {
    display: block;
    max-width: 80%;
    font-family: Lobster, sans-serif;
    margin-inline: auto;
    margin-bottom: 1rem;
    text-align: center;
  }

  h2 {
    font-size: 3rem;
    margin: 0;
  }

  .meaning {
    font-size: 1.5rem;
    font-weight: normal;
    font-family: Arial, sans-serif;
    font-style: italic;
  }

  img {
    margin-bottom: 2rem;
  }
</style>