<script lang='ts'>
  import { onDestroy, onMount } from 'svelte';
  import type { UploadData } from '../../../api/api';
  import Polaroid from '$lib/ui/Polaroid.svelte';
  import { page } from '$app/stores';

  let main: HTMLElement;
  let photoPool: UploadData[] = [];
  let photos: UploadData[] = [];

  let height = 0;
  let width = 0;
  let timeout: number;
  let iterations = 0;

  const setDimensions = () => {
    height = main?.getBoundingClientRect().height;
    width = main?.getBoundingClientRect().width;
  };

  onMount(() => {
    setDimensions();

    loadPhotos();
  });

  onDestroy(() => clearTimeout(timeout));

  const loadPhotos = () => {
    let url = '/api/images/getAll';
    if ($page.url.searchParams.has('type')) {
      url += `?type=${$page.url.searchParams.get('type')}`;
    }

    fetch(url)
      .then(raw => raw.json())
      .then((data: UploadData[]) => {
        photoPool = data;
        runNewPhoto();
      });
  };

  const runNewPhoto = () => {
    let randomPhoto = photoPool[Math.floor(Math.random() * photoPool.length)];
    randomPhoto.id = {};
    photoPool = photoPool.filter(photo => photo.id !== randomPhoto.id);

    photos.push(randomPhoto);
    photos = photos.slice(Math.max(0, photos.length - 12));
    photos = [...photos];

    clearTimeout(timeout);
    // Call recursively after random amount of time between 2 and 7 seconds
    timeout = setTimeout(() => {
      // if (iterations < 10) {
      runNewPhoto();
      iterations++;
      // }
    }, Math.random() * 5000 + 2000) as unknown as number;
  };
</script>

<svelte:window on:resize={setDimensions}></svelte:window>
<svelte:head><title>StellarMelodies | Slides</title></svelte:head>

<main>
  <div class='container' bind:this={main}>
    {#each photos as photo (photo.id)}
      <Polaroid src='{photo.location}'
                maxWidth='{width}'
                maxHeight='{height}'
                caption='{photo.message}'
                author='{photo.author}' />
    {/each}
  </div>
</main>

<img id='qr-code' src='/upload.png' alt='qr-code' />

<style>
  main {
    background-image: url('/wood_back.jpg');
    background-size: cover;
    min-height: 100dvh;
    height: 100dvh;
    min-width: 100dvw;
    width: 100dvw;
    position: relative;
    overflow: hidden;
    padding: 1rem;
  }

  .container {
    position: relative;
    height: 100%;
    width: 100%;

    transform-style: preserve-3d;
    perspective: 1000px;
  }

  #qr-code {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 8rem;
    aspect-ratio: 1;
    opacity: 0.8;
    border-top-left-radius: 1rem;
  }
</style>