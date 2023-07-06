<script lang="ts">
  /** @type {import("../../../../.svelte-kit/types/src/routes").ActionData} */
  export let form: { success?: boolean, message?: string };

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
    {#if form?.success}
      <div>Thanks for sharing with us! Upload more media?</div>
    {:else if form?.message}
      <div>Failed to upload files: {form.message}</div>
    {/if}
    <h1>Share your memories with us!</h1>
    <p>Upload your photos/videos to be displayed and saved in our memory book.</p>
    <div class="content">
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
      <input type="text" name="author" placeholder="Name (Optional)" />
      <input type="text" name="message" placeholder="Leave us a message (Optional)" />
      <div class="name">*These will be displayed with your media on the slideshow</div>
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
    </div>
  </form>

  {#if photos}
    <div class="preview-wrapper">
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
    </div>
  {/if}
</content>

<style>
  content {
    display: block;
    padding: 1rem;
  }

  .preview-wrapper {
    background: linear-gradient(160deg, #103473 10%, #3d7ac2 70%, #ef626c 90%);
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid white;
  }

  .preview-images {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    overflow-x: auto;

    max-width: 100%;
    margin-block: 1rem;
    margin-inline: auto;
    padding: 0.5rem;

    background: rgba(0,0,0, 0.5);
  }

  h1 {
    font-weight: bold;
  }

  h2 {
    max-width: 90%;
    margin-inline: auto;
  }

  .content {
    padding: 1rem;
    width: fit-content;
    max-width: 90%;
    margin: 1rem auto;
    border-radius: 0.5rem;
    background: linear-gradient(160deg, #103473 10%, #3d7ac2 70%, #ef626c 90%);
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

  input {
    background: #444;
    color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5rem;
  }

  .name {
    font-size: 0.8rem;
    margin-block: 0.5rem;
  }
</style>
