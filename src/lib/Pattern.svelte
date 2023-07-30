<script lang='ts'>
  export let label: string;
  export let img: string;
</script>

<h2>{label}</h2>

<img src={img} alt='{label}'/>

<style>
  h2, img {
    display: block;
    max-width: 80%;
    margin-inline: auto;
  }

  img {
    margin-bottom: 2rem;
  }
</style>