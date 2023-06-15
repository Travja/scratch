<!--suppress ALL -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { BROWSER_ENUM, detectBrowser } from '../../browser';

  let card: HTMLElement;

  let shadow = true;
  let active = false;
  let distance = 50;

  onMount(() => {
    const BROWSER = detectBrowser();
    shadow = BROWSER !== BROWSER_ENUM.SAFARI;
  });

  const trackMouse = (e: MouseEvent | TouchEvent) => {
    active = true;
    let x;
    let y;

    if (e instanceof MouseEvent) {
      x = e.x;
      y = e.y;
    } else {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }
    // Get center of frontCard
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Get distance from center
    const distanceX = x - centerX;
    const distanceY = y - centerY;
    // Get percentage of distance from center
    let percentX = distanceX / (rect.width / 2);
    let percentY = distanceY / (rect.height / 2);

    const maxPerspective = 2;
    // Clamp percents to maxPerspective
    if (percentX > maxPerspective) percentX = maxPerspective;
    if (percentX < -maxPerspective) percentX = -maxPerspective;
    if (percentY > maxPerspective) percentY = maxPerspective;
    if (percentY < -maxPerspective) percentY = -maxPerspective;

    distance = percentX * -80 + percentY * 50;

    // Rotate frontCard based on percentage of distance from center
    card.style.transform = `rotateX(${-percentY * 10}deg) rotateY(${percentX * 10}deg)`;
  };

  const resetCard = () => {
    card.style.transform = '';
    distance = 50;
    active = false;
  };
</script>

<div
  class="card-container"
  style:--distance="{distance}%"
  on:mousemove={trackMouse}
  on:touchmove={trackMouse}
  on:mouseout={resetCard}
  on:blur={resetCard}
  on:touchend={resetCard}
>
  <div class="card" bind:this={card} class:active class:shadow>
    <div class="content">
      <img src="/us.jpg" alt="us" />
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

  .card {
    --border-thickness: 2.5vmin;

    max-width: 80%;
    max-height: 90%;
    width: fit-content;
    position: relative;
    flex: 0;

    background-color: #ccc;
    padding: var(--border-thickness);
    padding-bottom: calc(var(--border-thickness) * 3.3333);
    border-radius: 5px;

    transition: transform 0.5s ease;
    transform-style: preserve-3d;
  }

  @media screen and (min-width: 600px) {
    .card-container {
      padding: 1rem 5rem;
    }
  }

  @media screen and (min-height: 400px) {
    .card {
      max-width: unset;
      max-height: unset;
    }
  }

  .content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    overflow: hidden;
  }

  .card .content::before {
    content: '';
    inset: 0;
    z-index: 1;
    position: absolute;
    box-shadow: inset 0 0 2rem black;
  }

  .card .content::after {
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

  .active .content::after {
    transition: none;
  }

  .card img {
    max-height: calc(90vh - var(--border-thickness) * 2 - calc(var(--border-thickness) * 3.3333));
    max-width: calc(80vw - var(--border-thickness) * 2);
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .card.shadow::before {
    content: '';
    pointer-events: none;

    position: absolute;
    z-index: -1;
    inset: -6%;

    transform: translateZ(-100px);
    border-radius: 10px;
    filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.5);

    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .card.active {
    transition: none;
  }
</style>
