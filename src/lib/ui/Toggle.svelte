<!--suppress CssUnresolvedCustomProperty -->
<script lang="ts">
  export let value: boolean;
  export let left = 'True';
  export let right = 'False';
  export let color = '#666';
  export let toggleColor = '#ef626c';
  export let inline = true;
  export let name = 'toggle';

  let clickLeft = (e?: KeyboardEvent | MouseEvent) => {
    if (e && e instanceof KeyboardEvent && e.key !== 'Enter') return;

    value = false;
  };

  let clickRight = (e?: KeyboardEvent | MouseEvent) => {
    if (e && e instanceof KeyboardEvent && e.key !== 'Enter') return;

    value = true;
  };
</script>

<input type="checkbox" class="hidden" id="permission" {name} bind:checked={value} />
<div
  class="toggle"
  class:selected={value}
  style:--color={color}
  style:--toggleColor={toggleColor}
  class:inline
>
  <div class="item" class:active={!value} on:keypress={clickLeft} on:click={clickLeft}>{left}</div>
  <div class="item" class:active={value} on:keypress={clickRight} on:click={clickRight}>
    {right}
  </div>
</div>

<style>
  .hidden {
    display: none;
  }

  .toggle {
    --fg-color: black;
    --radius: 100vw;

    overflow: hidden;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    text-align: center;
    background-color: var(--color);
    border: 2px solid white;
    border-radius: var(--radius);
    user-select: none;
    -webkit-user-select: none;

    box-shadow: inset 0 0 0.5rem #111;
  }

  .toggle:before {
    content: '';
    height: 100%;
    width: 50%;
    border-radius: var(--radius);
    background-color: var(--toggleColor);
    box-shadow: 0 0 0 2px white;
    position: absolute;
    left: 0;
    transition: left 350ms ease-in-out;
  }

  .toggle.selected:before {
    left: 50%;
  }

  .toggle > div {
    position: relative;
    width: 100%;
    padding-inline: 1.5rem;

    /*display: flex;*/
    justify-content: center;

    color: var(--fg-color);
    transition: color 350ms ease-in-out;
  }

  .toggle > div:hover {
    cursor: pointer;
  }

  .toggle > .active {
    color: white;
  }

  .item {
    display: grid;
    place-items: center;

    padding: 0.5rem;
    min-width: max-content;
  }
</style>
