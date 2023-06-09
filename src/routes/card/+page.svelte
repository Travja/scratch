<!--suppress ALL -->
<script lang="ts">
  import { onMount }                     from "svelte";
  import { BROWSER_ENUM, detectBrowser } from "../../browser";

  let frontCard: HTMLElement;
  let backCard: HTMLElement;
  let card: HTMLElement | undefined;

  let shadow   = true;
  let flipped  = false;
  let flipping = false;
  let rotation = 0;

  onMount(() => {
    const BROWSER = detectBrowser();
    shadow        = BROWSER !== BROWSER_ENUM.SAFARI;
  })

  // Track the touch start and end to determine if the user is swiping across the screen
  let startX       = -1;
  const touchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    startX      = touch.clientX;
  }

  const trackMouse = (e: MouseEvent | TouchEvent) => {
    if (flipping) return;
    card = flipped ? backCard : frontCard;
    let x;
    let y;

    if (e instanceof MouseEvent) {
      x = e.x;
      y = e.y;
    } else {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;

      const diffX = x - startX;
      if (startX === -1) return false;
      if (diffX > 200 || diffX < -200) {
        let flipDirection = "left"
        if (diffX > 0) {
          flipDirection = "right";
        }

        // If the user swiped more than 200px in either direction, flip the card
        startX = -1;
        flip(e, flipDirection);
        return false;
      }
    }
    // Get center of frontCard
    const rect      = card.getBoundingClientRect();
    const centerX   = rect.left + rect.width / 2;
    const centerY   = rect.top + rect.height / 2;
    // Get distance from center
    const distanceX = x - centerX;
    const distanceY = y - centerY;
    // Get percentage of distance from center
    const percentX  = distanceX / (rect.width / 2);
    const percentY  = distanceY / (rect.height / 2);

    // Rotate frontCard based on percentage of distance from center
    card.style.transform = `translateY(-50%) rotateX(${-percentY * 10}deg) rotateY(${percentX * 10}deg)`;
    if (card === frontCard) {
      rotation = 0;
    } else {
      rotation = 180;
    }
  };

  const resetCard = () => {
    card                      = undefined;
    startX                    = -1;
    frontCard.style.transform = "";
    backCard.style.transform  = "";
  }

  let flipTimeout = 0;
  const flip      = (e: MouseEvent | KeyboardEvent | TouchEvent, direction: "left" | "right" = "right") => {
    if (e instanceof KeyboardEvent && e.key !== "Enter" || flipping) return;
    card = flipped ? backCard : frontCard;
    if (direction === "left") {
      rotation -= 180;
    } else {
      rotation += 180;
    }

    resetCard();
    flipped  = !flipped;
    flipping = true;
    clearTimeout(flipTimeout);
    flipTimeout = setTimeout(() => {
      flipping = false;
    }, 500);
  }

</script>

<div class="card-container"
     style:--rotation="{rotation}deg"
     on:mousemove={trackMouse}
     on:touchmove={trackMouse}
     on:mouseout={resetCard}
     on:blur={resetCard}
     on:touchstart={touchStart}
     on:touchend={resetCard}
     on:click={flip}
     on:keypress={flip}>
  <div class="card" id="front"
       bind:this={frontCard}
       class:flip={flipped}
       class:flipping
       class:active={!flipping && card === frontCard}
       class:shadow
  >
    <div class="info">
      Here is some fancy little info
    </div>
  </div>
  <div class="card" id="back"
       bind:this={backCard}
       class:flip={!flipped}
       class:flipping
       class:active={!flipping && card === backCard}
       class:shadow
  >
    <div class="info">
      Other fancy info
    </div>
  </div>
</div>

<style>
    .card-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        transform-style: preserve-3d;
        position: relative;
        perspective: 1000px;
        padding: 1rem;

        user-select: none;
        min-height: calc(100vh - 20rem);
    }


    .card {
        inset: 0;
        margin: 0 auto;
        top: 50%;
        transform: translateY(-50%) rotateY(var(--rotation));
        aspect-ratio: 5/7;

        max-width: 80%;
        max-height: 90%;
        container-type: inline-size;

        background-color: #ccc;
        padding: 1rem;
        position: absolute;
        backface-visibility: hidden;
        visibility: visible;
        border-radius: 10px;

        transition: transform 0.5s ease;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
    }

    @media screen and (min-width: 600px) {
        .card {
            aspect-ratio: 7/5;
        }
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

        opacity: 0;
        transition: opacity 0.5s ease;
    }

    .card.active, .card.flip:not(.flipping) {
        transition: none;
    }

    #front {
        background-image: url("/panda.jpg");
        background-size: cover;
        background-position-y: center;
    }

    #back {
        background-image: url("https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80");
        background-size: cover;
        transform: translateY(-50%) rotateY(calc(var(--rotation) - 180deg)) translateZ(10px);
    }

    #front::before, #back::before {
        /*background: red;*/
        opacity: 1;
    }

    #front.flip::before, #back.flip::before {
        opacity: 0;
    }

    .info {
        /*background-color: rgba(0, 0, 0, 0.5);*/
        /*backdrop-filter: blur(5px);*/
        text-shadow: 0 0 10px black;
        color: white;
        padding: 4cqh;
        border-radius: 5px;
        text-align: center;
        position: absolute;
        top: 0.5cqh;
        left: 3cqh;
        right: 3cqh;
        font-size: 5cqh;
        font-family: 'Dancing Script', sans-serif;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
</style>