<script lang='ts'>
  import { onDestroy, onMount } from 'svelte';
  import type { UploadData } from '../../../api/api';
  import { MediaType } from '../../../api/api';
  import Polaroid from '$lib/ui/Polaroid.svelte';
  import { page } from '$app/state';

  let main: HTMLElement | undefined = $state();
  let photoPool: { [key: string]: UploadData[] } = {};
  let newPhotos: UploadData[] = [];
  let photoType: MediaType;
  let photoNumber = 0;
  let activePhotos: UploadData[] = $state([]);

  let height = $state(0);
  let width = $state(0);
  let looping = true;
  let givenType: MediaType | undefined;
  let initializedReception = false;

  let lastUpdate: Date = new Date();

  const setDimensions = () => {
    height = main?.getBoundingClientRect().height ?? 0;
    width = main?.getBoundingClientRect().width ?? 0;
  };

  onMount(() => {
    setDimensions();

    loadPhotos().then(async () => {
      while (looping) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 2000));
        runNewPhoto();
      }
    });

    startPolling();
  });

  onDestroy(() => {
    looping = false;
  });

  const startPolling = async () => {
    while (looping) {
      await new Promise(resolve => setTimeout(resolve, 15000));
      pollForNewPhotos();
    }
  };

  const getNextMediaType = (): MediaType => {
    if (givenType) return givenType;

    let types = Object.values(MediaType);
    let nextType = types.indexOf(photoType) + 1;
    if (nextType >= types.length) {
      nextType = 0;
    }

    return types[nextType];
  };

  const loadPhotos = async (type?: MediaType): Promise<void> => {
    let url = '/api/images/getAll';
    let loadType: string | undefined | null = type;
    if (page.url.searchParams.has('type')) {
      loadType = page.url.searchParams.get('type');
      photoType = loadType as MediaType;
      givenType = photoType;
    }

    if (loadType) {
      url += `?type=${loadType}`;
    }

    return fetch(url)
      .then(raw => raw.json())
      .then(async (data: UploadData[]) => {
        data.sort(() => Math.random() - 0.5); // Shuffle the array
        // Sort data by type
        let bridals = data.filter(photo => photo.type === MediaType.BRIDALS);
        let engagements = data.filter(photo => photo.type === MediaType.ENGAGEMENTS);
        let temple = data.filter(photo => photo.type === MediaType.TEMPLE);
        let childhood = data.filter(photo => photo.type === MediaType.CHILDHOOD);
        let reception = data.filter(photo => {
          let isReception = photo.type === MediaType.RECEPTION;
          let isNew = !!newPhotos.find(newPhoto => newPhoto.location === photo.location);
          return isReception && !isNew;
        });

        if (bridals.length !== 0) {
          photoPool[MediaType.BRIDALS] = bridals;
        }
        if (engagements.length !== 0) {
          photoPool[MediaType.ENGAGEMENTS] = engagements;
        }
        if (temple.length !== 0) {
          photoPool[MediaType.TEMPLE] = temple;
        }
        if (childhood.length !== 0) {
          photoPool[MediaType.CHILDHOOD] = childhood;
        }
        if (reception.length !== 0) {
          photoPool[MediaType.RECEPTION] = reception;
        }
      });
  };

  const runNewPhoto = () => {
    if (newPhotos.length > 0 && photoNumber++ % 2 == 0) {
      let newPhoto = newPhotos.shift();
      if (newPhoto) {
        newPhoto.id = {};
        activePhotos.push(newPhoto);
        activePhotos = activePhotos.slice(Math.max(0, activePhotos.length - 12));
        activePhotos = [...activePhotos];

        if (!initializedReception) {
          initializedReception = true;
          loadPhotos(MediaType.RECEPTION);
        }
        return;
      }
    }

    let iterations = 0;
    do {
      photoType = getNextMediaType();
      iterations++;
    } while ((!photoPool[photoType] || photoPool[photoType].length === 0) && iterations < 10);

    if (iterations == 10) {
      return;
    }

    let pool = photoPool[photoType];
    let randomPhoto = pool.shift();
    if (photoPool[photoType].length === 0 || !randomPhoto) {
      loadPhotos(photoType);
    }

    if (!randomPhoto) return;

    randomPhoto.id = {};
    activePhotos.push(randomPhoto);
    activePhotos = activePhotos.slice(Math.max(0, activePhotos.length - 12));
    activePhotos = [...activePhotos];
  };

  const pollForNewPhotos = () => {
    console.log('Polling new photos');
    fetch(`/api/images/getAll?type=reception&since=${lastUpdate}`)
      .then(raw => raw.json())
      .then((data: UploadData[]) => {
        newPhotos.push(...data);

        lastUpdate = new Date();
      });
  };
</script>

<svelte:window onresize={setDimensions}></svelte:window>
<svelte:head><title>SavAndWes | Slides</title></svelte:head>

<main>
  <div bind:this={main} class='container'>
    {#each activePhotos as photo (photo.id)}
      <Polaroid src='{photo.location}'
                maxWidth='{width}'
                maxHeight='{height}'
                caption='{photo.message}'
                author='{photo.author}' />
    {/each}
  </div>
</main>

<div id='qr-code'>
  <div class='info'>Add Your Pictures</div>
  <img alt='qr-code' id='qr-img' src='/upload.svg' />
</div>

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 0;
    right: 0;
    opacity: 0.8;
    background: white;
    color: black;
    border-top-left-radius: 1rem;
  }

  #qr-img {
    width: 12rem;
    aspect-ratio: 1;
    border-top-left-radius: 1rem;
  }

  .info {
    margin: 0.5rem;
    margin-bottom: 0;
  }
</style>