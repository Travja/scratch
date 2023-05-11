<script lang="ts">

  let frontCard: HTMLElement;
  let backCard: HTMLElement;
  let card: HTMLElement | undefined;

  let flipped  = false;
  let flipping = false;

  const trackMouse = (e: MouseEvent) => {
    if (flipping) return;
    card = flipped ? backCard : frontCard;

    const x         = e.x;
    const y         = e.y;
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
  };

  const resetCard = () => {
    card                      = undefined;
    frontCard.style.transform = "";
    backCard.style.transform  = "";
  }

  let flipTimeout = 0;
  const flip      = (e: MouseEvent | KeyboardEvent) => {
    if (e instanceof KeyboardEvent && e.key !== "Enter") return;
    card = flipped ? backCard : frontCard;

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
     on:mousemove={trackMouse}
     on:mouseout={resetCard}
     on:blur={resetCard}
     on:click={flip}
     on:touchend={flip}
     on:keypress={flip}>
  <div class="card" id="front"
       bind:this={frontCard}
       class:flip={flipped}
       class:active={!flipping && card === frontCard}
  >
    <div class="info">
      Here is some fancy little info
    </div>
  </div>
  <div class="card" id="back"
       bind:this={backCard}
       class:flip={flipped}
       class:active={!flipping && card === backCard}
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
        padding: 2rem;

        user-select: none;
    }


    .card {
        inset: 0;
        margin: 0 auto;
        top: 50%;
        transform: translateY(-50%) rotateY(0deg);
        aspect-ratio: 6/4;

        max-width: 80%;
        max-height: 90%;

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

    .card::before {
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

    .card.active {
        transition: unset;
    }

    #front {
        background-image: url("/panda.jpg");
        background-size: cover;
        background-position-y: -200px;
    }

    #back {
        background-image: url("https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80");
        background-size: cover;
        transform: translateY(-50%) rotateY(-180deg) translateZ(10px);
    }

    #front.flip {
        transform: translateY(-50%) rotateY(180deg);
    }

    #front::before {
        /*background: red;*/
        opacity: 1;
    }

    #front.flip::before {
        opacity: 0;
    }

    #back.flip {
        transform: translateY(-50%) rotateY(0deg) translateZ(10px);
    }

    #back.flip::before {
        opacity: 1;
        /*background: blue;*/
    }

    .info {
        /*background-color: rgba(0, 0, 0, 0.5);*/
        /*backdrop-filter: blur(5px);*/
        text-shadow: 0 0 10px black;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: absolute;
        top: 0.5rem;
        left: 3rem;
        right: 3rem;
        font-size: 2rem;
        font-family: 'Dancing Script', sans-serif;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
</style>