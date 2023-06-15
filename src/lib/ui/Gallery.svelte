<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import type { UploadData } from '../../api/api';

  export let imageData: Array<UploadData> = [];
  let activeIndex = -1;
</script>

{#if imageData.length === 0}
  <h1>No pictures yet!</h1>
{:else}
  <div class="gallery">
    {#each imageData as image, i}
      <div class="wrapper" class:featured={i % 3 == 0}>
        <img
          src={'/' + image?.location}
          alt={image?.author}
          loading="lazy"
          on:click={() => (activeIndex = i)}
          on:keypress={(e) => {
            if (e.key === 'Enter') {
              activeIndex = i;
            }
          }}
        />
      </div>
    {/each}
  </div>
{/if}

{#if activeIndex > -1}
  <div
    class="modal"
    transition:fade={{ duration: 300 }}
    on:keypress={(e) => {
      if (e.key === 'Escape') {
        activeIndex = -1;
      }
    }}
    on:click={() => (activeIndex = -1)}
  >
    <div transition:fly={{ y: 100, duration: 300 }} class="modal-content">
      <img src={'/' + imageData[activeIndex]?.location} alt={imageData[activeIndex]?.author} />
    </div>

    <div
      class="previous"
      on:click|stopPropagation={() =>
        (activeIndex = (activeIndex - 1 + imageData.length) % imageData.length)}
      on:keypress={(e) => {
        if (e.key === 'Enter') {
          activeIndex = (activeIndex - 1 + imageData.length) % imageData.length;
        }
      }}
    >
      <span class="material-symbols-outlined"> chevron_left </span>
    </div>
    <div
      class="next"
      on:click|stopPropagation={() => (activeIndex = (activeIndex + 1) % imageData.length)}
      on:keypress={(e) => {
        if (e.key === 'Enter') {
          activeIndex = (activeIndex + 1) % imageData.length;
        }
      }}
    >
      <span class="material-symbols-outlined"> chevron_right </span>
    </div>

    <div
      class="close-button"
      on:click={() => (activeIndex = -1)}
      on:keypress={(e) => {
        if (e.key === 'Enter') {
          activeIndex = -1;
        }
      }}
    >
      <span class="material-symbols-outlined"> close </span>
    </div>
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

  .gallery .wrapper {
    width: 10px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: calc(34% - var(--gap));
    overflow: hidden;
  }

  .gallery img {
    width: 100%;
    height: 100%;
    /*min-width: calc(34% - var(--gap));*/
    object-fit: cover;
    transition: transform 0.2s ease-in-out;
  }

  .gallery .wrapper.featured {
    flex-grow: 3;
    flex-basis: 60%;
    grid-column: span 2;
  }

  .gallery img:hover {
    cursor: pointer;
    transform: scale(1.05);
    z-index: 5;
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

    background: rgba(0, 0, 0, 0.6);
  }

  .modal-content {
    padding: 1rem;
  }

  .modal img {
    /*display: none;*/
    object-fit: contain;
    height: 100%;
    width: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .modal .modal-content {
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

    padding: 0.5rem;
    aspect-ratio: 1;
    overflow: hidden;

    display: grid;
    place-items: center;

    font-size: 2rem;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid white;
    border-radius: 50%;

    -webkit-user-select: none;
    user-select: none;
  }

  .close-button:hover {
    cursor: pointer;
  }

  .next,
  .previous {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;

    flex: 0;
    padding: 0.5rem;
    display: grid;
    place-items: center;

    font-weight: bold;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.6), transparent);

    -webkit-user-select: none;
    user-select: none;
  }

  .next:hover,
  .previous:hover {
    cursor: pointer;
  }

  .previous {
    right: unset;
    left: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6), transparent);
  }

  .next span,
  .previous span {
    font-size: 3rem;
  }

  @media (min-width: 900px) {
    .modal {
      padding: 2rem;
    }
  }

  @media (min-width: 750px) {
    .gallery .wrapper {
      flex-basis: calc(26% - var(--gap));
    }

    .gallery .wrapper.featured {
      flex-basis: calc(49% - var(--gap));
    }

    .gallery {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 900px) {
    .gallery .wrapper {
      flex-basis: calc(21% - var(--gap));
    }

    .gallery .wrapper.featured {
      flex-basis: calc(29% - var(--gap));
    }

    .gallery {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 1200px) {
    .gallery .wrapper {
      flex-basis: calc(16% - var(--gap));
    }

    .gallery .wrapper.featured {
      flex-basis: calc(21% - var(--gap));
    }

    .gallery {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>
