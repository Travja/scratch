<script lang="ts">
  import { onDestroy } from 'svelte';
  import { makeIcsFile, makeOutlookInvite } from '../../api/calendar';
  import { fly } from 'svelte/transition';
  import { amazonLink, venmoUsername } from '../../api/api';

  export let centered = false;

  let shown = false;
  let addEvent: HTMLElement;
  const date = {
    start: new Date('2023/08/06 00:00:00 UTC'),
    end: new Date('2023/08/06 02:30:00 UTC')
  };
  const title = "Dorothy + Travis' Wedding Reception";
  const description = `Come celebrate with us!\n\nGift Info\nRegistered on Amazon: ${amazonLink}\nVenmo: @${venmoUsername}\nWebsite: https://stellarmelodies.com`;
  const address = '2005 S 900 E, Salt Lake City, UT, United States';

  let icsFile: string = makeIcsFile(
    date,
    title,
    description.replaceAll('\n', '\\n'),
    address.replaceAll(',', '\\,')
  );
  let outlookLink = makeOutlookInvite(false, date, title, description, address);
  let officeLink = makeOutlookInvite(true, date, title, description, address);

  onDestroy(() => {
    if (icsFile) URL.revokeObjectURL(icsFile);
  });

  const checkOut = (e: MouseEvent) => {
    // Check if target is child of addLinks
    if (e.relatedTarget == addEvent || addEvent.contains(e.relatedTarget as Node)) {
      return;
    }

    shown = false;
  };
</script>

<div
  class="add-event"
  bind:this={addEvent}
  on:click={() => (shown = true)}
  on:keypress={() => (shown = true)}
  on:mouseout={checkOut}
  on:blur={() => (shown = false)}
  class:centered
>
  <span class="material-symbols-outlined"> calendar_add_on </span>
  Add To Calendar
  {#if shown}
    <div
      class="add-links"
      transition:fly={{ y: -20, duration: 100 }}
      on:mouseout|stopPropagation={checkOut}
      on:blur={() => (shown = false)}
      on:click|stopPropagation
      on:keypress
    >
      <a
        href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NHB2MWkzNm8ybnVqbGdlamJ0a3BjdThvaDkgYjBjNGNkMzI4NjcxNzFkOTdhZjc5NzZhMzBhMTBhYWE2NDIxMTNmOWM4M2MyNmU5ZjBhMzM3YTU5NTEzM2UyOEBn&tmsrc=b0c4cd32867171d97af7976a30a10aaa642113f9c83c26e9f0a337a595133e28%40group.calendar.google.com"
        target="_blank"
        class="invite"
      >
        <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" /> Google
      </a>
      <a href={icsFile} download="invite.ics" class="invite">
        <img src="https://www.svgrepo.com/show/303110/apple-black-logo.svg" alt="Apple" /> Apple
      </a>
      <a href={outlookLink} target="_blank" class="invite">
        <img src="https://www.svgrepo.com/show/373951/outlook.svg" alt="Outlook" /> Outlook
      </a>
      <a href={officeLink} target="_blank" class="invite">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiNlNjRhMTkiIGQ9Ik03IDEyTDI5IDQgNDEgNyA0MSA0MSAyOSA0NCA3IDM2IDI5IDM5IDI5IDEwIDE1IDEzIDE1IDMzIDcgMzZ6Ii8+PC9zdmc+"
          alt="365"
        /> 365
      </a>
    </div>
  {/if}
</div>

<style>
  .add-event {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    gap: 0.5rem;
    background: #444;
    padding: 0.5rem;
    font-weight: bold;
    color: white;
    user-select: none;

    border-radius: 0.5rem;
    border: 2px solid white;
    transition: background 0.2s ease-in-out;
  }

  .add-event:hover {
    cursor: pointer;
    background: #3d7ac2;
  }

  .add-links {
    position: absolute;
    background: #5a5a5a;
    border-radius: 0.5rem 0 0.5rem;
    overflow: hidden;
    z-index: 20;
    border: 1px solid white;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  }

  .invite {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.75rem;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    align-items: center;
    justify-content: start;
    color: white;
    text-decoration: none;

    transition: background 0.2s ease-in-out;
  }

  .invite:visited {
    color: white;
  }

  .invite:not(:last-child) {
    border-bottom: 1px solid white;
  }

  .invite:hover {
    background: #444;
  }

  .invite img {
    height: 2rem;
    background-color: white;
    border-radius: 50%;
    padding: 0.25rem;
  }
</style>
