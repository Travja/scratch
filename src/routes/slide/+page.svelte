<script lang="ts">
</script>

<div id="carousel-container">
  <div id="carousel">
    <div class="strip">
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/200" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/200" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/200" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/200" alt="" />
      </div>
    </div>
    <div class="strip">
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/200" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/250" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/200" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/250" alt="" />
      </div>
    </div>
    <div class="strip">
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/200" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/200" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/200" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/200" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/400/300" alt="" />
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50.1%);
    }
  }
  @keyframes scroll-inverse {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(50.1%);
    }
  }

  #carousel-container {
    width: 100%;
    height: 100vh;
    padding: 0.5rem;
  }

  #carousel {
    position: relative;
    max-height: 100%;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
  }

  .strip {
    position: relative;
    height: 100%;
    width: min-content;
    margin: 0.4rem 0;

    height: 5px;
    flex: 1;

    /*display: inline-flex;*/
    /*flex-direction: row;*/
    /*flex-wrap: nowrap;*/
    white-space: nowrap;

    transform: translateX(-0%);
  }

  .strip:nth-child(1) {
    animation: scroll 30s linear infinite;
  }

  .strip:nth-child(2) {
    flex: 1.5;
    align-self: flex-end;
    animation: scroll-inverse 40s linear infinite;
  }

  .strip:nth-child(3) {
    animation: scroll 25s linear infinite;
  }

  .carousel-item {
    height: 100%;

    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    margin-inline: 0.4rem;
    box-shadow: 0 0 10px black;

    transition: transform 0.5s ease-in-out;
  }

  .strip:hover {
    z-index: 10;
  }

  .carousel-item:hover {
    z-index: 10;
    transform: scale(1.1);
  }

  .carousel-item img {
    flex: 1;
    height: 100%;
  }
</style>
