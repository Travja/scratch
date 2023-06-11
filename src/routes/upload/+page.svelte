<script lang='ts'>

  let photoType: string;
  let photos: FileList;

  let inputElm: HTMLInputElement;
  let previewPhotos: string[] = [];

  $: if (photos && inputElm) {
    previewPhotos.forEach(file => URL.revokeObjectURL(file));

    previewPhotos = [];
    console.log(inputElm.files);
    for (let photo: File of photos) {
      previewPhotos.push(URL.createObjectURL(photo));
    }
    console.log(previewPhotos);
  }

</script>

<content>
  <form enctype='multipart/form-data' method='post'>
    <select name='uploadType' bind:value={photoType}>
      <option value='engagements'>Engagements</option>
      <option value='bridals'>Bridals</option>
      <option value='temple'>Temple</option>
      <option value='reception'>Reception</option>
    </select>
    <input type='file' name='photos' multiple accept='image/*' bind:files={photos} bind:this={inputElm}>

    <button type='submit'>Upload</button>
  </form>

  {#if photos}
    <div class='preview-images'>
      {#each previewPhotos as photo, i}
        <img src='{photo}'
             class='preview'
             on:load={() => URL.revokeObjectURL(photo)} alt='{photos[i].name}' />
      {/each}
    </div>
  {/if}
</content>

<style>
    content {
        display: block;
        padding: 1rem;
    }

    .preview-images {
        display: flex;
        flex-direction: row;
        margin-block: 1rem;
        gap: 1rem;
    }

    .preview {
        max-height: 200px;
    }
</style>