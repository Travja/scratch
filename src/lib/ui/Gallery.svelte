<script lang='ts'>
  import { onMount }     from 'svelte';
  import { activeImage } from '../../api/api';

  export let source: string                                 = 'unknown';
  let imageData: [{ download_url: string, author: string }] = [];

  onMount(async () => {
    const res  = await fetch('https://picsum.photos/v2/list?limit=10');
    const data = await res.json();
    imageData  = data;
  });
</script>

{#if source !== "engagements"}
  <h1>No pictures yet!</h1>
{:else}
  <div class='gallery'>
    {#each imageData as image, i}
      <img src={image.download_url}
           alt={image.author}
           class:featured={i % 3 == 0}
           on:click={() => activeImage.set(image)}
           on:keypress={(e) => {
				 	 if (e.key === 'Enter') {
				 	 	 activeImage.set(image);
				 	 }
				 }} />
    {/each}
  </div>
{/if}

<style>
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 0.75rem;
    }

    .gallery img {
        width: 100%;
        height: 100%;
        flex: 1;
        object-fit: cover;
    }

    .gallery img:hover {
        cursor: pointer;
    }

    img.featured {
        grid-column: span 2;
    }
</style>