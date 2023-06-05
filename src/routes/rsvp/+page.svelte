<script lang="ts">
  import { slide }               from "svelte/transition";
  import type { AttendanceInfo } from "../../api/api";
  import debounce                from "lodash/debounce";
  import Toggle                  from "../../ui/Toggle.svelte";

  /** @type {import('./$types').ActionData} */
  export let form: { success?: boolean, message?: string, firstName?: string };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let emailValid    = false;
  let checkingEmail = false;

  let info: AttendanceInfo = {
    firstName:    "",
    lastName:     "",
    email:        "",
    announcement: false,
    attending:    false,
    numGuests:    0,
  };

  $: {
    if (info.attending) {
      info.numGuests = Math.max(1, info.numGuests);
    } else {
      info.numGuests = 0;
    }
  }

  let warning: string | undefined;

  let checkEmail = () => {
    checkingEmail = true;
    emailValid    = false;

    if (!emailRegex.test(info.email)) {
      checkingEmail = false;
      return;
    }

    doRequest();
  };

  let doRequest = debounce(() => {
    if (!info.email || !emailRegex.test(info.email)) {
      checkingEmail = false;
      return;
    }

    fetch(`/api/checkemail/${info.email}`)
      .then(r => r.json())
      .then(r => {
        if (r.success) {
          warning    = undefined;
          emailValid = true;
        } else {
          warning    = "It looks like you've already filled this out! " +
            "Please let us know if you need to make any changes.";
          emailValid = false;
        }

        checkingEmail = false;
      });
  }, 500);

</script>

{#if form}
  {#if form.success}
    <div class="thank-you">Thank you, {form.firstName}! Your information has been recorded.
      An announcement will be sent to you soon!
    </div>
  {:else}
    <div class="message">{form.message}</div>
  {/if}
{/if}

{#if !form || !form.success}
  <div class="material-symbols-outlined">line_curve</div>
  <form id="rsvp" method="post">
    <h1 class="heading">Want an announcement?</h1>

    <div class="info">Though all the information is already on this website,
      if you'd like a direct announcement, please fill out the form below.
    </div>

    {#if !emailValid && warning}
      <div class="warning">{warning}</div>
    {/if}
    <div class="email">
      <input
              required
              bind:value={info.email}
              on:keyup={checkEmail}
              on:change={checkEmail}
              type="email"
              name="email"
              id="email"
              class:invalid={!emailValid}
              class:valid={emailValid}
              class:checking={checkingEmail}
              placeholder="Email"/>
    </div>
    <div class="beside">
      <input
              required
              bind:value={info.firstName}
              name="firstName"
              class="firstName"
              placeholder="First Name"/>
      <input
              required
              bind:value={info.lastName}
              name="lastName"
              class="lastName"
              placeholder="Last Name"/>
    </div>

    <div class="attending">
      <h2 class="heading">Planning on coming?</h2>
      <div class="info">To get an accurate head-count, please check the box below and indicate
        how many people are expected in your party. No need for emailed/texted/called-in RSVPs.
        We'll just catch that info right here!
      </div>

      <div class="container">
        <div class="announcement">
          <Toggle left="Not Attending" right="Attending" name="attending" bind:value={info.attending}/>
        </div>
      </div>

      {#if info.attending}
        <label transition:slide for="guests" class="guests-label">
          Number of Guests
        </label>
        <input
                required
                transition:slide
                bind:value={info.numGuests}
                id="guests"
                name="guests"
                type="number"
                inputmode="numeric"
                class="guests"
                placeholder="Number of Guests"
                min="1"
                max="20"/>
      {/if}
    </div>

    <h2 class="heading">How would you like your announcement?</h2>
    <div class="announcement">
      <Toggle left="Email" right="Snail Mail" name="announcement" bind:value={info.announcement}/>
    </div>
    {#if info.announcement}
      <div transition:slide class="address-info">
        <h2 class="heading">Please provide your address below</h2>
        <input
                required
                bind:value={info.address}
                name="address"
                type="text"
                class="address"
                placeholder="Street Address"/>
        <input
                required
                bind:value={info.city}
                name="city"
                type="text"
                class="city"
                placeholder="City"/>
        <input
                required
                bind:value={info.state}
                name="state"
                type="text"
                class="state"
                placeholder="State"/>
        <input
                required
                bind:value={info.zip}
                name="zip"
                type="text"
                class="zip"
                placeholder="Zip"/>
      </div>
    {/if}

    <button type="submit" disabled={checkingEmail || !emailValid}>Confirm</button>
  </form>
{/if}

<style>
    .thank-you {
        text-align: center;
    }

    .heading {
        font-size: 2.5rem;
        font-weight: bold;
        text-decoration: underline;
    }

    h2.heading {
        font-size: 1.5rem;
    }

    .heading + .info, .heading + div {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    #rsvp, .attending, .address-info {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.3rem;

        text-align: center;
    }

    #rsvp {
        flex: 1;
        flex-basis: 40%;
        max-width: 700px;
        margin: 0 auto;
    }

    .attending {
        padding: 0.5rem;
        border-radius: 0.5rem;
        background: linear-gradient(140deg, #b60985 0%, #2153a9 60%);
        border: 2px solid #ccc;

        margin-bottom: 0.5rem;
    }

    .announcement {
        max-width: 400px;
        margin-inline: auto;
    }

    .address-info {
        border: 2px solid #ccc;
        padding: 1rem;
        background: linear-gradient(140deg, #b60985 0%, #2153a9 60%);
        border-radius: 0.5rem;
    }

    input, button, .custom-input {
        position: relative;
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
        background-color: #2153a9;
        outline: none;
        border: 2px solid #103473;
        padding-inline: 2rem;
        align-self: center;

        transition: background-color 0.5s ease-in-out,
        color 0.5s ease-in-out;
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

    .container, label {
        font-size: 1rem;
        padding: 0.5rem;
    }

    label {
        text-align: left;
    }

    .beside {
        display: flex;
        gap: 0.3rem;
        justify-content: stretch;
    }

    .beside > * {
        flex: 1;
    }

    .guests-label {
        font-weight: bold;
    }

    .warning {
        color: red;
    }

    .email {
        position: relative;
    }

    .email > * {
        width: 100%;
    }

    /*.valid:not(:placeholder-shown) {*/
    /*    border: 2px solid #0f0;*/
    /*}*/

    /*.valid:focus:not(:placeholder-shown) {*/
    /*    outline: 1px solid #0f0;*/
    /*}*/

    .email:has(.valid:not(:placeholder-shown))::after {
        content: '✓';
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #0f0;
    }

    .invalid:not(:placeholder-shown) {
        border: 2px solid #f00;
    }

    .invalid:focus:not(:placeholder-shown) {
        outline: 1px solid #f00;
    }

    .email:has(.invalid:not(:placeholder-shown))::after {
        content: '✗';
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #f00;
    }

    /*.checking:valid:not(:placeholder-shown) {*/
    /*    border: 2px solid #f90;*/
    /*}*/

    /*.checking:focus:valid:not(:placeholder-shown) {*/
    /*    outline: 1px solid #f90;*/
    /*}*/

    .email:has(.checking:not(:placeholder-shown))::after {
        animation: rotate 1s linear infinite;

        font-family: 'Material Symbols Outlined';
        -webkit-font-feature-settings: 'liga';
        content: 'line_curve';
        position: absolute;

        transform-origin: bottom left;
        right: 1rem;
        top: 30%;
        font-size: 0.8rem;
        /*transform: translateY(-50%);*/
        color: #f90;
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