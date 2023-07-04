<script lang="ts">
  let photoType = "bridals";
  let photos: FileList;

  let inputElm: HTMLInputElement;
  let previewPhotos: string[] = [];
  let photoForm: HTMLFormElement;

  $: if (photos && inputElm) {
    previewPhotos.forEach((file) => URL.revokeObjectURL(file));

    previewPhotos = [];
    console.log(inputElm.files);
    for (let photo of photos) {
      previewPhotos.push(URL.createObjectURL(photo));
    }
    console.log(previewPhotos);
  }
</script>

<content>
  <form id="photoForm" enctype="multipart/form-data" method="post" bind:this={photoForm}>
    <h1>Share your memories with us!</h1>
    <p>Upload your photos/videos to be displayed and saved in our memory book.</p>
    <select id="uploadType" name="uploadType" bind:value={photoType}>
      <option value="engagements">Engagements</option>
      <option value="bridals">Bridals</option>
      <option value="temple">Temple</option>
      <option value="reception">Reception</option>
    </select>
    <input
      id="files"
      type="file"
      name="photos"
      multiple
      accept="image/*,video/mp4,video/ogg,video/webm,video/mov"
      bind:files={photos}
      bind:this={inputElm}
    />
    <button type="button"
            id="select"
            on:click={() => inputElm.click()}
            on:keypress={(e) => {
            if (e.key === 'Enter') {
              inputElm.click();
            }
          }}
    >
      Select Media
    </button>
  </form>

  {#if photos}
    <h2>Preview</h2>
    <div class="preview-images">
      {#each previewPhotos as photo, i}
        {#if photos[i].type.includes("video")}
          <video
            src={photo}
            class="preview"
            on:loadstart={() => URL.revokeObjectURL(photo)}
            controls
          />
        {:else}
          <img
            src={photo}
            class="preview"
            on:load={() => URL.revokeObjectURL(photo)}
            alt={photos[i].name}
          />
        {/if}
      {/each}
    </div>
    <button type="button" id="upload" on:click={() => photoForm.submit()}>Upload</button>
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
    flex-wrap: wrap;
    justify-content: center;
    margin-block: 1rem;
    gap: 1rem;

    max-width: 90%;
    margin-inline: auto;
  }

  h2 {
    max-width: 90%;
    margin-inline: auto;
  }

  .preview {
    max-height: 200px;
  }

  #uploadType {
    display: none;
  }

  #files {
    display: none;
  }

  #select, #upload {
    display: block;
    width: 70%;
    padding: 1rem;
    margin-block: 1rem;
    margin-inline: auto;
    text-align: center;
    font-size: 1rem;
    color: white;
    background-color: #444;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }

  #upload {
    background-color: #49a84f;
  }

  content {
    text-align: center;
  }
</style>
