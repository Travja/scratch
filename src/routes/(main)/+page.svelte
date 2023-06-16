<script lang="ts">
  import BlockEntry      from '$lib/ui/BlockEntry.svelte';
  import ScrollIndicator from '$lib/ui/ScrollIndicator.svelte';
</script>

<div id="main-content">
  <BlockEntry background="url('/api/images/random'), linear-gradient(160deg, #103473 10%, #3d7ac2 70%, #ef626c 90%)">
    <h1>Within each of us is a <span class="cursive">song</span></h1>
  </BlockEntry>
  <BlockEntry background="#103473" shadow="0 0 20px 2px #000">
    <h1>A subtle <span class="cursive">melody</span> that only certain few can pick up on</h1>
  </BlockEntry>
  <BlockEntry background="url('/api/images/random?1'), linear-gradient(160deg, #103473 10%, #3d7ac2 70%, #ef626c 90%)">
    <h1>
      When two of these unique individuals find each other, the <span class="cursive">universe</span
      > opens up
    </h1>
  </BlockEntry>
  <BlockEntry background="#ef626c" shadow="0 0 20px 2px #000">
    <h1>Doors&mdash;once closed&mdash;are <span class="cursive">opened</span></h1>
  </BlockEntry>
  <BlockEntry background="url('/api/images/random?2'), linear-gradient(160deg, #103473 10%, #3d7ac2 70%, #ef626c 90%)">
    <h1>Hearts are <span class="cursive">softened</span></h1>
  </BlockEntry>
  <BlockEntry background="#103473" shadow="0 0 20px 2px #000">
    <h1><span class="cursive">Stars</span> shine brighter</h1>
  </BlockEntry>
  <BlockEntry background="url('/api/images/random?3'), linear-gradient(160deg, #103473 10%, #3d7ac2 70%, #ef626c 90%)">
    <h1>And the <span class="cursive">world</span> is never the same</h1>
  </BlockEntry>
</div>

<ScrollIndicator />

<style>
  #main-content {
    text-align: center;
  }

  h1 {
    display: block;
    padding: 1rem;
    padding-inline: 2rem;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
    /*text-shadow: -1px -1px 5px #000, 1px -1px 5px #000, -1px 1px 5px #000, 1px 1px 5px #000;*/
    font-weight: bold;
    margin: unset;
  }

  .cursive {
    text-shadow: none;
    font-weight: bold;
    padding-inline: 0.2rem;
    font-size: 1.1em;
    background: -webkit-linear-gradient(45deg, #ef626c 35%, #3d7ac2 60%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
