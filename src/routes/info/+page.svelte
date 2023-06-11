<script>
	import CalendarEvent                 from '$lib/ui/CalendarEvent.svelte';
	import { amazonLink, venmoUsername } from '../../api/api';
</script>

<div id='content'>
	<div class='block'>
		<h1 class='cursive'>Sealing</h1>
		<p>
			We will be sealed on August 4th in the Provo City Center temple.
		</p>
		<p>
			Though we'd love to have everyone there, this is a private event. We will be
			holding a reception the following day.
		</p>
		<p>
			Pictures will be taken after the sealing. If you'd like to see pictures, please
			check the <a href='/gallery'>gallery</a> page after the wedding.
		</p>
	</div>

	<div class='block'>
		<h1 class='cursive'>Reception</h1>
		<p>
			We will be having a reception on <strong>August 5th from 6-8:30pm</strong> at the
			<a href='https://goo.gl/maps/EqUCmGdbToYN73fi7' target='_blank' alt='Granite Tabernacle'>Granite Tabernacle</a>
			in Salt Lake City.
		</p>
		<p>
			Light refreshments will be served.
		</p>
		<div>
			Events include:
			<ul>
				<li>Cake Cutting</li>
				<li>Father-Daughter Dance</li>
				<li>First Dance</li>
				<li>Open Dance</li>
				<li>Bouquet Toss</li>
			</ul>
		</div>
		<CalendarEvent centered />
	</div>

	<div class='block'>
		<h1 class='cursive'>Ohio Open House</h1>
		<p>
			We will be having an open house in Ohio on <strong>September 2nd</strong> at the
			<a href='https://goo.gl/maps/cB3v9wY8yWF8DsDdA'
				 target='_blank'
				 alt='Western Hills Building'>
				Western Hills Building
			</a>
			in Cincinnati.
		</p>
		<p>
			Time is TBD. We look forward to seeing you there though!
		</p>
	</div>

	<div class='block'>
		<h1 class='cursive'>Gifts</h1>
		<p>
			We are registered on <a href='{amazonLink}'>Amazon</a>.
		</p>
		<p>
			You can also send us a gift through Venmo to <a href='https://venmo.com/{venmoUsername}'>@{venmoUsername}</a>.
		</p>
	</div>
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