<script lang='ts'>
  import { run } from 'svelte/legacy';

  import { MediaType } from '../../../api/api';
  import { fly } from 'svelte/transition';

  interface Props {
    form: { success?: boolean, message?: string };
    data: { type?: MediaType };
  }

  let { form, data }: Props = $props();

  let photoType: MediaType = $state(data?.type || MediaType.RECEPTION);
  let photos: FileList | undefined = $state();

  let inputElm: HTMLInputElement | undefined = $state();
  let previewPhotos: string[] = $state([]);
  let photoForm: HTMLFormElement | undefined = $state();

  let submitting = $state(false);

  run(() => {
    if (photos && inputElm) {
      previewPhotos.forEach((file) => URL.revokeObjectURL(file));

      previewPhotos = [];
      for (let photo of photos) {
        previewPhotos.push(URL.createObjectURL(photo));
      }
    }
  });
</script>

<div class='main-content'>
  <form bind:this={photoForm} enctype='multipart/form-data' id='photoForm' method='post'>
    {#if form?.success}
      <div>Thanks for sharing with us! Upload more media?</div>
    {:else if form?.message}
      <div>Failed to upload files: {form.message}</div>
    {/if}
    <h1>Share your memories with us!</h1>
    <p>Upload your photos/videos to be displayed and saved in our memory book.</p>
    <div class='content'>
      <select bind:value={photoType}
              id='uploadType'
              name='uploadType'>
        {#each Object.values(MediaType) as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
      <input
        accept='image/*,video/mp4,video/ogg,video/webm,video/mov'
        bind:files={photos}
        bind:this={inputElm}
        id='files'
        multiple
        name='photos'
        type='file'
      />
      <input name='author' placeholder='Name (Optional)' type='text' />
      <div class='name'>*This will be displayed with your media on the slideshow</div>
      <button id='select'
              onclick={() => inputElm?.click()}
              onkeydown={(e) => {
                if (e.key === 'Enter') {
                  inputElm?.click();
                }
              }}
              type='button'
      >
        Select Media
      </button>
    </div>

    {#if photos?.length ?? 0 > 0}
      <div class='preview-wrapper'>
        <h2>Preview</h2>
        <div class='preview-images'>
          {#each previewPhotos as photo, i}
            <div class='item'>
              {#if photos?.[i].type.includes("video")}
                <video
                  src={photo}
                  class='preview'
                  onloadstart={() => URL.revokeObjectURL(photo)}
                  controls
                ></video>
              {:else}
                <img
                  src={photo}
                  class='preview'
                  onload={() => URL.revokeObjectURL(photo)}
                  alt={photos?.item(i)?.name ?? 'Image'}
                />
              {/if}
              <input type='text' name='comment-{i}' placeholder='Caption (Optional)' />
            </div>
          {/each}
        </div>
      </div>
      <button type='button'
              id='upload'
              disabled={submitting}
              onclick={() => {
                submitting = true;
                photoForm?.submit();
              }}
              onkeydown={(e) => {
                if (e.key === 'Enter') {
                  submitting = true;
                  photoForm?.submit();
                }
              }}
              transition:fly|global={{ y: 100, duration: 500 }}
      >Upload
      </button>
    {/if}
  </form>
</div>

{#if submitting}
  <div class='overlay'>
    <div class='modal-content'>
      <div class='spinner'></div>
      <div class='upload-info'>If you're uploading a lot of files, this may take a minute. Hold tight!</div>
    </div>
  </div>
{/if}

<style>
  .main-content {
    display: block;
    padding: 1rem;
  }

  .preview-wrapper {
    background: linear-gradient(160deg, var(--color-primary) 10%, var(--color-tertiary) 70%, var(--color-secondary) 90%);
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
    color: var(--color-p-text);
  }

  .content {
    padding: 1rem;
    width: fit-content;
    max-width: 90%;
    margin: 1rem auto;
    border-radius: 0.5rem;
    color: var(--color-p-text);
    background: linear-gradient(160deg, var(--color-primary) 10%, var(--color-tertiary) 70%, var(--color-secondary) 90%);
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

  .main-content {
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

  .modal-content {
    display: grid;
    place-items: center;
    gap: 1rem;
  }

  .spinner {
    border: 16px solid transparent;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  .upload-info {
    background: rgba(52, 152, 219, 0.5);
    color: white;
    padding: 1rem;
    border-radius: 100vw;
  }
</style>
