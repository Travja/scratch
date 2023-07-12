<script lang="ts">
  import Gallery from "$lib/ui/Gallery.svelte";
  import type { UploadData } from "../../../../api/api";

  export let data: { images: UploadData[], title: string };
</script>

<svelte:head>
  <title>Gallery | {data.title}</title>
  <meta content="StellarMelodies - Gallery - {data.title}" property="og:title" />
</svelte:head>

<content>
  <h1 class="cursive">{data.title}</h1>
  {#if data.title === 'Bridals'}
    <p>A <strong>HUGE</strong> thanks goes out to <a href="https://kianabatesphoto.com">Kiana</a> for these photos!</p>
  {/if}
  <Gallery imageData={data.images} />
</content>

<style>
  content {
    padding-inline: 1rem;
    padding-bottom: 1rem;
  }
</style>
