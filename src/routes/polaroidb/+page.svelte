<!--suppress ALL -->
<script lang="ts">
  import { onMount }                     from "svelte";
  import { BROWSER_ENUM, detectBrowser } from "../../browser";

  let card: HTMLElement;

  let shadow   = true;
  let active   = false;
  let distance = 50;

  onMount(() => {
    const BROWSER = detectBrowser();
    shadow        = BROWSER !== BROWSER_ENUM.SAFARI;
  })

  const trackMouse = (e: MouseEvent | TouchEvent) => {
    let x;
    let y;

    if (e instanceof MouseEvent) {
      x = e.x;
      y = e.y;
    } else {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }

    active = true;

    // Get center of frontCard
    const rect      = card.getBoundingClientRect();
    const centerX   = rect.left + rect.width / 2;
    const centerY   = rect.top + rect.height / 2;
    // Get distance from center
    const distanceX = x - centerX;
    const distanceY = y - centerY;
    // Get percentage of distance from center
    let percentX    = distanceX / (rect.width / 2);
    let percentY    = distanceY / (rect.height / 2);

    const maxPerspective = 2;
    // Clamp percents to maxPerspective
    if (percentX > maxPerspective) percentX = maxPerspective;
    if (percentX < -maxPerspective) percentX = -maxPerspective;
    if (percentY > maxPerspective) percentY = maxPerspective;
    if (percentY < -maxPerspective) percentY = -maxPerspective;

    distance = percentX * -80 + percentY * 50;

    // Rotate frontCard based on percentage of distance from center
    card.style.transform = `rotateX(${-percentY * 20}deg) rotateY(${percentX * 20}deg)`;
  };

  const resetCard = () => {
    card.style.transform = "";
    distance             = 50;
    active               = false;
  }

</script>

<div class="card-container"
     on:mousemove={trackMouse}
     on:touchmove={trackMouse}
     on:mouseleave={resetCard}
     on:blur={resetCard}
     on:touchend={resetCard}>
  <div class="card"
       bind:this={card}
       class:shadow
       class:active>
    <div class="content" style:--distance="{distance}%">
      <div class="img-container">
        <img src="/falls.jpg" alt="Falls">
      </div>
      <img src="/layer2.png" alt="Us" class="layer2">
    </div>
  </div>
</div>

<style>
    .card-container {
        height: 100%;
        width: fit-content;
        margin: 0 auto;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transform-style: preserve-3d;
        position: relative;
        perspective: 1000px;
        padding: 0.5rem;

        user-select: none;
    }

    @media screen and (min-width: 600px){
        .card-container {
            padding: 1rem 5rem;
        }
    }


    .card {
        --border-thickness: 2.5vmin;

        max-width: 80vw;
        max-height: 90vh;
        position: relative;
        flex: 0;

        /*background-color: #ccc;*/
        /*padding: 1.5rem;*/
        /*padding-bottom: 5rem;*/
        border-radius: 5px;

        transition: transform 0.5s ease;
        transform-style: preserve-3d;
    }

    .content {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border: var(--border-thickness) solid white;
        border-bottom: calc(var(--border-thickness) * 3.3333) solid white;
        border-radius: 5px;
        box-shadow: inset 0 0 1rem black;

        transform-style: preserve-3d;
    }

    .img-container {
        position: relative;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        transform: translateZ(-50px) scale(1.05);
    }

    .card img {
        display: block;
        position: relative;
    }

    .card img.layer2 {
        position: absolute;
        inset: 0;
        height: 100%;
        left: 50%;
        z-index: 2;

        transform: translate3d(-50%, 0, 0px);
    }

    .card .img-container::before {
        content: '';
        inset: 0;
        z-index: 1;
        position: absolute;
        box-shadow: inset 0 0 2rem black;
    }

    .card .img-container::after {
        content: '';
        height: 10%;
        width: 400%;
        z-index: 2;
        bottom: 50%;
        left: -100%;
        position: absolute;
        backdrop-filter: blur(1px);
        background: rgba(255, 255, 255, 0.4);
        box-shadow: 0 0 1rem 3px rgba(255, 255, 255, 0.4);
        transform: translateX(var(--distance)) rotate(45deg);
        transition: transform 0.2s linear;
    }

    .active .img-container::after {
        transition: none;
    }

    .card img {
        max-height: 90vh;
        max-width: 80vw;
        height: 100%;
        /*object-fit: contain;*/
    }

    .card.shadow::before {
        content: "";
        pointer-events: none;

        position: absolute;
        z-index: -1;
        inset: -6%;

        transform: translateZ(-100px);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        border-radius: 10px;
        filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.5);

        opacity: 1;
        transition: opacity 0.5s ease;
    }

    .card.active {
        transition: none;
    }
</style>