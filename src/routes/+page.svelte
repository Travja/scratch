<script lang="ts">
  import BlockEntry from "$lib/ui/BlockEntry.svelte";
</script>

<div id="main-content">
  <BlockEntry>
    <h1>Each of us has a <span class="cursive">song</span> within us</h1>
  </BlockEntry>
  <BlockEntry background="#305060" shadow="0 0 20px 2px #000">
    <h1>A subtle <span class="cursive">melody</span> that only certain few can pick up on</h1>
  </BlockEntry>
  <BlockEntry background="url('https://source.unsplash.com/featured/1920x1081')">
    <h1>When two of these unique individuals find each other, the <span class="cursive">universe</span> opens up</h1>
  </BlockEntry>
  <BlockEntry background="#305060" shadow="0 0 20px 2px #000">
    <h1>Doors&mdash;once closed&mdash;are <span class="cursive">opened</span></h1>
  </BlockEntry>
  <BlockEntry background="url('https://source.unsplash.com/featured/1920x1082')">
    <h1>Hearts are <span class="cursive">softened</span></h1>
  </BlockEntry>
  <BlockEntry background="#305060" shadow="0 0 20px 2px #000">
    <h1><span class="cursive">Stars</span> shine brighter</h1>
  </BlockEntry>
  <BlockEntry background="url('https://source.unsplash.com/featured/1920x1083')">
    <h1>And the <span class="cursive">world</span> is never the same</h1>
  </BlockEntry>
</div>

<style>
    #main-content {
        text-align: center;
    }

    h1 {
        display: block;
        padding: 1rem;
        /*backdrop-filter: blur(5px);*/
        /*background: rgba(0, 0, 0, 0.2);*/
        text-shadow: -1px -1px 5px #000,
        1px -1px 5px #000,
        -1px 1px 5px #000,
        1px 1px 5px #000;
        font-weight: bold;
    }

    .cursive {
        font-size: 1.7em;
    }
</style>