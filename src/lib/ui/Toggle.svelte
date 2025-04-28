<!--suppress CssUnresolvedCustomProperty -->
<script lang="ts">
  interface Props {
    value: boolean;
    left?: string;
    right?: string;
    color?: string;
    toggleColor?: string;
    inline?: boolean;
    name?: string;
  }

  let {
    value = $bindable(),
    left = 'True',
    right = 'False',
    color = '#666',
    toggleColor = 'var(--color-secondary)',
    inline = true,
    name = 'toggle'
  }: Props = $props();

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
  <div class="item" class:active={!value} onkeypress={clickLeft} onclick={clickLeft}>{left}</div>
  <div class="item" class:active={value} onkeypress={clickRight} onclick={clickRight}>
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