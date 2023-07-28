<script lang='ts'>
  import { onDestroy, onMount } from 'svelte';
  import type { UploadData } from '../../../api/api';
  import { MediaType } from '../../../api/api';
  import Polaroid from '$lib/ui/Polaroid.svelte';
  import { page } from '$app/stores';

  let main: HTMLElement;
  let photoPool: { [key: string]: UploadData[] } = {};
  let photoType: MediaType;
  let activePhotos: UploadData[] = [];

  let height = 0;
  let width = 0;
  let looping = true;
  let givenType: MediaType | undefined;

  const setDimensions = () => {
    height = main?.getBoundingClientRect().height;
    width = main?.getBoundingClientRect().width;
  };

  onMount(() => {
    setDimensions();

    loadPhotos().then(async () => {
      do {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 2000));
        runNewPhoto();
      } while (looping);
    });
  });

  onDestroy(() => {
    looping = false;
  });

  const getNextMediaType = (): MediaType => {
    if (givenType) return givenType;

    let types = Object.values(MediaType);
    let nextType = types.indexOf(photoType) + 1;
    if (nextType >= types.length) {
      nextType = 0;
    }

    return types[nextType];
  };

  const loadPhotos = (type?: MediaType): Promise<void> => {
    let url = '/api/images/getAll';
    let loadType: string | undefined | null = type;
    if ($page.url.searchParams.has('type')) {
      loadType = $page.url.searchParams.get('type');
      photoType = loadType as MediaType;
      givenType = photoType;
    }

    if (loadType) {
      url += `?type=${loadType}`;
    }

    return fetch(url)
      .then(raw => raw.json())
      .then(async (data: UploadData[]) => {
        // Sort data by type
        let bridals = data.filter(photo => photo.type === MediaType.BRIDALS);
        let engagements = data.filter(photo => photo.type === MediaType.ENGAGEMENTS);
        let temple = data.filter(photo => photo.type === MediaType.TEMPLE);
        let reception = data.filter(photo => photo.type === MediaType.RECEPTION);
        let childhood = data.filter(photo => photo.type === MediaType.CHILDHOOD);

        if (bridals.length !== 0) {
          photoPool[MediaType.BRIDALS] = bridals;
        }
        if (engagements.length !== 0) {
          photoPool[MediaType.ENGAGEMENTS] = engagements;
        }
        if (temple.length !== 0) {
          photoPool[MediaType.TEMPLE] = temple;
        }
        if (reception.length !== 0) {
          photoPool[MediaType.RECEPTION] = reception;
        }
        if (childhood.length !== 0) {
          photoPool[MediaType.CHILDHOOD] = childhood;
        }

        console.log(photoPool);
      });
  };

  const runNewPhoto = () => {
    let iters = 0;
    do {
      photoType = getNextMediaType();
      iters++;
    } while ((!photoPool[photoType] || photoPool[photoType].length === 0) && iters < 10);

    if (iters == 10) {
      console.log('No photos found');
      return;
    }

    let pool = photoPool[photoType];
    let randomPhoto = pool[Math.floor(Math.random() * pool.length)];
    randomPhoto.id = {};
    photoPool[photoType] = pool.filter(photo => photo.id !== randomPhoto.id);
    console.log(photoType + ' pool:', photoPool[photoType].length);
    if (photoPool[photoType].length === 0) {
      loadPhotos(photoType);
    }

    activePhotos.push(randomPhoto);
    activePhotos = activePhotos.slice(Math.max(0, activePhotos.length - 12));
    activePhotos = [...activePhotos];
  };
</script>

<svelte:window on:resize={setDimensions}></svelte:window>
<svelte:head><title>StellarMelodies | Slides</title></svelte:head>

<main>
  <div class='container' bind:this={main}>
    {#each activePhotos as photo (photo.id)}
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