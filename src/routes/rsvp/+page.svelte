<script lang="ts">
  import { slide } from "svelte/transition";
  import { api }   from "../../api/api";

  let attending = false;
  let numGuests = 1;

</script>

<form id="rsvp" action="{api.getBaseUrl()}/rsvp" method="post">
  <h1 class="heading">Want an announcement?</h1>

  <div class="info">All the information is already on this website,
    but if you would like a physical announcement, please fill out this form.
  </div>

  <input type="email" class="email" placeholder="Email"/>
  <input type="text" class="address" placeholder="Street Address"/>
  <input type="text" class="city" placeholder="City"/>
  <input type="text" class="state" placeholder="State"/>
  <input type="text" class="zip" placeholder="Zip"/>

  <hr/>

  <div class="attending">
    <h2 class="heading">Planning on coming?</h2>
    <div class="info">To get an accurate head-count, please check the box below and indicate
      how many people are expected in your party. No need for emailed/texted/called-in RSVPs.
      We'll just catch that info right here!
    </div>

    <div class="container">
      <input type="checkbox" id="attending" name="attending" value="yes" bind:checked={attending}/>
      <label for="attending">
        Attending
      </label>
    </div>

    {#if attending}
      <label transition:slide for="guests">
        Number of Guests
      </label>
      <input transition:slide
             bind:value={numGuests}
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

  <button type="submit">Confirm</button>
</form>

<style>

    .heading {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 2rem;
        text-decoration: underline;
    }

    h2.heading {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    #rsvp, .attending {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 0 auto;
        gap: 0.2rem;

        text-align: center;
    }

    #rsvp {
        max-width: 40%;
    }

    .attending {
        padding: 0.5rem;
        border-radius: 0.5rem;
        background: linear-gradient(140deg, #b60985 0%, #2153a9 60%);
        border: 2px solid #ccc;

        margin-bottom: 0.5rem;
    }

    input, button {
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

    hr {
        margin-inline: 2rem;
    }

</style>