<script>
</script>

<div id='content'>
  <div class='block'>
    <h1 class='cursive'>Sealing</h1>
    <p>We were sealed on August 4th in the Provo City Center temple.</p>
    <!--    <p>-->
    <!--      Though we'd love to have everyone there, this is a private event. We will be holding a-->
    <!--      reception the following day.-->
    <!--    </p>-->
    <p>
      If you'd like to see pictures, please check the <a href='/gallery'>gallery</a>.
    </p>
  </div>

  <div class='block'>
    <h1 class='cursive'>Reception</h1>
    <p>
      Our reception was on <strong>August 5th</strong> at the
      <a href='https://goo.gl/maps/EqUCmGdbToYN73fi7' target='_blank' title='Granite Tabernacle'
      >Granite Tabernacle</a
      >
      in Salt Lake City.
    </p>
<!--    <p>Light refreshments will be served.</p>-->
<!--    <div>-->
<!--      Events include:-->
<!--      <ul>-->
<!--        <li>Cake Cutting</li>-->
<!--        <li>Father-Daughter Dance</li>-->
<!--        <li>First Dance</li>-->
<!--        <li>Open Dance</li>-->
<!--        <li>Bouquet Toss</li>-->
<!--      </ul>-->
<!--    </div>-->
<!--    <CalendarEvent centered />-->
  </div>

  <div class='block'>
    <h1 class='cursive'>Ohio Open House</h1>
    <p>
      We had an open house in Ohio on <strong>September 2nd</strong> at the
      <a
        href='https://goo.gl/maps/cB3v9wY8yWF8DsDdA'
        target='_blank'
        title='Western Hills Building'
      >
        Western Hills Building
      </a>
      in Cincinnati.
    </p>
<!--    <p>We look forward to seeing you there!</p>-->

<!--    <OpenHouseEvent centered />-->
  </div>

<!--  <div class='block'>-->
<!--    <h1 class='cursive'>Gifts</h1>-->
<!--    <p>-->
<!--      We are registered on <a href={amazonLink}>Amazon</a>.-->
<!--    </p>-->
<!--    <p>-->
<!--      You can also send us a gift through Venmo to <a href='https://venmo.com/{venmoUsername}'-->
<!--    >@{venmoUsername}</a-->
<!--    >.-->
<!--    </p>-->
<!--  </div>-->
</div>

<style>
  .block {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    place-items: flex-start;

    padding: 0 1.5rem 1rem;
    border-radius: 1rem;

    background: linear-gradient(160deg, #103473 10%, #3d7ac2 70%, #ef626c 90%);
    border: 1px solid #6e9aff;
  }

  #content {
    display: grid;
    gap: 1rem;
    margin: 1rem auto;
    padding: 1rem;
  }

  @media (min-width: 750px) {
    #content {
      width: 90%;
      padding: unset;

      grid-template-columns: 1fr 1fr;
    }
  }
</style>
