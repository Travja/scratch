<script lang='ts'>
  import { onMount }     from 'svelte';
  import { activeImage } from '../../api/api';

  export let source: string                                 = 'unknown';
  let imageData: [{ download_url: string, author: string }] = [];

  onMount(async () => {
    if (source === 'engagements') {
      const res  = await fetch('https://picsum.photos/v2/list?limit=13');
      const data = await res.json();
      imageData  = data;
      return;
    }
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
        --gap: 0.75rem;

        max-width: 100%;
        display: flex;
        flex-wrap: wrap;

        /*display: grid;*/
        grid-template-columns: repeat(2, 1fr);

        gap: var(--gap);
    }

    .gallery img {
        /*width: 100%;*/
        /*height: 100%;*/
        /*min-width: calc(34% - var(--gap));*/
        width: 10px;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: calc(34% - var(--gap));
        object-fit: cover;
        transition: transform 0.2s ease-in-out;
    }

    .gallery img.featured {
        flex-grow: 3;
        flex-basis: 60%;
        grid-column: span 2;
    }

    .gallery img:hover {
        cursor: pointer;
        transform: scale(1.05);
        z-index: 5;
    }

    @media (min-width: 750px) {
        .gallery img {
            flex-basis: calc(26% - var(--gap));
        }

        .gallery img.featured {
            flex-basis: calc(49% - var(--gap));
        }

        .gallery {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (min-width: 900px) {
        .gallery img {
            flex-basis: calc(21% - var(--gap));
        }

        .gallery img.featured {
            flex-basis: calc(29% - var(--gap));
        }

        .gallery {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (min-width: 1200px) {
        .gallery img {
            flex-basis: calc(16% - var(--gap));
        }

        .gallery img.featured {
            flex-basis: calc(21% - var(--gap));
        }

        .gallery {
            grid-template-columns: repeat(5, 1fr);
        }
    }
</style>