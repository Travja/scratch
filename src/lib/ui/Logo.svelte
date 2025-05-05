<script lang='ts'>
  interface Props {
    height?: string;
    width?: string;
    phone?: boolean;
    desktop?: boolean;
  }

  let {
    height = 'auto',
    width = '100%',
    phone = false,
    desktop = false
  }: Props = $props();

  let id = Math.random() * 100000;
</script>

<a class='logo' class:desktop class:phone href='/'>
  <img alt='Sav And Wes' src='/logo.png' />
</a>

<style>
  a {
    position: relative;
    display: inline;
    box-sizing: content-box;
    place-items: center;
    padding: 0.5rem;

  }

  img {
    display: block;
    height: 2.5rem;
  }

  a.phone {
    display: grid;
  }

  a.desktop {
    display: none;
  }

  @media (min-width: 750px) {
    a.phone {
      display: none;
    }

    a.desktop {
      display: grid;
    }
  }
</style>
