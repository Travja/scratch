<script lang="ts">
  import { MediaType } from "../../../api/api";
  import { fly } from "svelte/transition";

  /** @type {import("../../../../.svelte-kit/types/src/routes").ActionData} */
  export let form: { success?: boolean, message?: string };
  export let data: { type?: MediaType };

  let photoType: MediaType = data?.type || MediaType.RECEPTION;
  let photos: FileList;

  let inputElm: HTMLInputElement;
  let previewPhotos: string[] = [];
  let photoForm: HTMLFormElement;

  let submitting = false;

  $: if (photos && inputElm) {
    previewPhotos.forEach((file) => URL.revokeObjectURL(file));

    previewPhotos = [];
    let index = 0;
    for (let photo of photos) {
      previewPhotos.push(URL.createObjectURL(photo));
    }
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
      <select id="uploadType"
              name="uploadType"
              bind:value={photoType}>
        {#each Object.values(MediaType) as type}
          <option value={type}>{type}</option>
        {/each}
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
      <div class="name">*This will be displayed with your media on the slideshow</div>
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

    {#if photos}
      <div class="preview-wrapper">
        <h2>Preview</h2>
        <div class="preview-images">
          {#each previewPhotos as photo, i}
            <div class="item">
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
              <input type="text" name="comment-{i}" placeholder="Caption (Optional)" />
            </div>
          {/each}
        </div>
      </div>
      <button type="button"
              id="upload"
              disabled={submitting}
              on:click={() => {
                submitting = true;
                photoForm.submit();
              }}
              on:keypress={(e) => {
            if (e.key === 'Enter') {
              submitting = true;
              photoForm.submit();
            }
          }}
              transition:fly={{ y: 100, duration: 500 }}
      >Upload
      </button>
    {/if}
  </form>
</content>

{#if submitting}
  <div class="overlay">
    <div class="spinner"></div>
  </div>
{/if}

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
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1rem;

    max-width: 100%;
    margin-block: 1rem;
    margin-inline: auto;
    padding: 0.5rem;
  }

  .preview {
    display: block;
    margin-bottom: 0.5rem;
    max-height: 250px;
    max-width: 100%;
  }

  .item {
    display: grid;
    place-items: center;
  }

  .item input {
    width: 100%;
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

  #uploadType {
    display: none;
  }

  #files {
    display: none;
  }

  #select {
    width: 70%;
  }

  #select, #upload {
    display: block;
    padding: 1rem;
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
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    margin: 0 auto;
    max-width: fit-content;
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
    font-size: 1rem;
  }

  .name {
    font-size: 0.8rem;
    margin-block: 0.5rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
  }

  .spinner {
    border: 16px solid transparent;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
</style>
