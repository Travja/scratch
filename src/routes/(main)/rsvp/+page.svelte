<script lang='ts'>
  import { slide } from 'svelte/transition';
  import { type EventInfo, type EventRsvp, events, formatDateTime, type RsvpInfo } from '../../../api/api';
  import CalendarEvent from '$lib/ui/CalendarEvent.svelte';
  import { onMount } from 'svelte';

  /** @type {import('../../../../.svelte-kit/types/src/routes').ActionData} */
  export let form: { success?: boolean; message?: string; firstName?: string };

  let detailsShown: { [key: string]: boolean } = {};

  let info: RsvpInfo = {
    firstName: '',
    lastName: '',
    events: []
  };

  onMount(() => {
    for (let event of events) {
      info.events.push({
        ev: event,
        event: event.id,
        numGuests: 0
      });

      detailsShown[event.id] = false;
    }

    info.events = [...info.events];
  });
</script>

{#if form}
  {#if form.success}
    <div class='thank-you'>
      Thank you, {form.firstName}! Your information has been recorded. We look forward to partying with you soon!
      <br />
      <br />
      Remember to add the event to your calendar! <strong>May 23rd, 6-9pm</strong>
      at the
      <a href='https://goo.gl/maps/EqUCmGdbToYN73fi7' title='Granite Tabernacle'
      >Granite Tabernacle</a
      >
      in Salt Lake City.
    </div>

    <CalendarEvent />
  {:else}
    <div class='message'>{form.message}</div>
  {/if}
{/if}

{#if !form || !form.success}
  <form id='rsvp' method='post'>
    <h1 class='heading'>Planning on coming?</h1>

    <div class='info mb'>
      To get an accurate head-count, please indicate how many people from your party are planning
      to attend each event. If you are not attending, please leave the number of guests as 0.
    </div>

    <div class='info mb'>
      Remember, the reception is on <strong>May 23rd, 6-9pm</strong> at the
      <a href='https://goo.gl/maps/EqUCmGdbToYN73fi7' title='Granite Tabernacle'>Granite Tabernacle</a>
      in Salt Lake City.
    </div>

    <span class='mb flex'>
      <CalendarEvent />
    </span>

    <div class='beside'>
      <input
        required
        bind:value={info.firstName}
        name='firstName'
        class='name firstName'
        placeholder='First Name'
      />
      <input
        required
        bind:value={info.lastName}
        name='lastName'
        class='name lastName'
        placeholder='Last Name'
      />
    </div>

    <div id='events'>
      {#each info.events as event (event.event)}
        <div class='event'>
          <label class='event-label' for='events-{event.event}'>
            <span>{event.ev?.name}</span>
            <span class='material-symbols-outlined info-btn'
                  role='button'
                  tabindex='0'
                  aria-label='Toggle event details'
                  aria-expanded={detailsShown[event.event]}
                  on:click={() => (detailsShown[event.event] = !!detailsShown[event.event])}
                  on:keypress={() => (detailsShown[event.event] = !!detailsShown[event.event])}
            >info</span>
          </label>
          <input
            class='hidden'
            type='checkbox'
            id='events-{event.event}'
            name='events-{event.event}'
            bind:checked={detailsShown[event.event]}
          />

          {#if detailsShown[event.event]}
            <div class='details' transition:slide|global>
              <div class='info mb'>
                { formatDateTime(event.ev?.date) }
                <br />
                {#if event.ev?.mapsLink}
                  <a href={event.ev?.mapsLink} target='_blank' rel='noopener noreferrer'>
                    { event.ev?.location }
                  </a>
                {:else}
                  { event.ev?.location }
                {/if}
              </div>
            </div>
          {/if}
          <input required type='number' name='events-{event.event}' value={event.numGuests} />

          {#if event.ev?.outside}
            <div class='outside'>
              <label class='no-bold block small'>
                <input type='checkbox' id='outside-{event.event}' name='outside-{event.event}'
                       bind:checked={event.outside} />
                I'll be waiting outside for pictures (~4:30PM)
              </label>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <button type='submit' disabled={!info.firstName || !info.lastName}>Confirm</button>
  </form>
{/if}

<style>
  #events {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    gap: 1rem;

    & .event {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      padding: 1rem;
      gap: 0.5rem;
      border-radius: 0.5rem;
      background: var(--color-primary);
      color: var(--color-p-text);
    }

    & label:not(.no-bold) {
      font-size: 1.2rem;
      font-weight: bold;

      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    & input {
      text-align: center;
    }

    & .info {
      text-align: center;
    }
  }

  .info-btn {
    user-select: none;
    cursor: pointer;

    color: white;
    text-shadow: 0 0 0.25rem #111;
  }

  #rsvp,
  .message,
  .thank-you {
    padding: 1rem;
  }

  .thank-you {
    text-align: center;
  }

  .heading {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
  }

  .name {
    margin-bottom: 1rem;
  }

  .info, .thank-you {
    text-wrap: balance;
    text-align: center;
  }

  .mb {
    margin-bottom: 0.5rem;
  }

  .flex {
    display: flex;
    flex-direction: column;
  }

  #rsvp, .event {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  #rsvp {
    flex: 1;
    flex-basis: 40%;
    max-width: 100%;
    margin: 0 auto;
  }

  @media (min-width: 750px) {
    #rsvp {
      min-width: 600px;
      max-width: 70%;
    }
  }

  .event {
    min-width: 40ch;
    flex: 1;
    padding: 1rem;
    border-radius: 0.5rem;
    background: linear-gradient(160deg, var(--color-primary) 10%, var(--color-tertiary) 70%, var(--color-secondary) 80%);
    color: var(--color-p-text);
  }

  input:not([type='checkbox']),
  button {
    position: relative;
    min-width: 5rem;
    text-align: left;
    font-family: sans-serif;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #444;
    color: white;
  }

  input::placeholder {
    color: #bbb;
  }

  button {
    background-color: #3d7ac2;
    outline: none;
    border: 2px solid #103473;
    padding-inline: 2rem;
    align-self: center;
    margin-top: 1rem;

    transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
  }

  button:disabled {
    background-color: #444;
    border: 2px solid #111;
    color: #aaa;
  }

  button:disabled:hover {
    cursor: not-allowed;
  }

  button:hover {
    cursor: pointer;
  }

  button:focus {
    outline: 1px solid white;
  }

  label {
    font-size: 1rem;
    padding: 0.5rem;
    text-align: left;
  }

  .beside {
    display: flex;
    gap: 0.3rem;
    justify-content: center;
  }


  .small {
    white-space: wrap;
    max-width: 25ch;
  }

  @keyframes rotate {
    0% {
      transform: translateY(-50%) rotate(0deg);
    }
    100% {
      transform: translateY(-50%) rotate(360deg);
    }
  }
</style>