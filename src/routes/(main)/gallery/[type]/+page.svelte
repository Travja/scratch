<script lang="ts">
  import Gallery from '$lib/ui/Gallery.svelte';
  import type { UploadData } from '../../../../api/api';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  export let data: { images: UploadData[] };
  let title = '';

  onMount(() => (title = $page.params.type.charAt(0).toUpperCase() + $page.params.type.slice(1)));
</script>

<svelte:head>
  <title>Gallery | {title}</title>
</svelte:head>

<content>
  <h1 class="cursive">{title}</h1>
  <Gallery imageData={data.images} />
</content>

<style>
  content {
    padding-inline: 1rem;
    padding-bottom: 1rem;
  }
</style>
