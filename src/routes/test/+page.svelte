<div class="wrapper">
  <div class="item"></div>
</div>

<style>
    @keyframes slide {
        0% {
            transform: translateX(calc(-50% + 50px));
        }

        100% {
            transform: translateX(calc(50% - 50px));
        }
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        position: relative;
        animation: slide 1s infinite alternate;
    }

    .item {
        border-radius: 10px;
        background: red;
        height: 100px;
        aspect-ratio: 1;
    }
</style>