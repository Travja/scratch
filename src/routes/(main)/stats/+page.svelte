<script lang='ts'>
  import { type RsvpInfo } from '../../../api/api';

  interface Props {
    data: {
      responses: RsvpInfo[]
    };
  }

  let { data }: Props = $props();

  const responses: RsvpInfo[] = $derived(data.responses);
  const totalRespondents = $derived(responses?.length);

  const countsByEvent = $derived.by(() => {
    const counts: { [key: string]: number } = {};
    for (const response of responses) {
      for (const event of response.events) {
        if (event.attending) {
          if (!counts[event.event]) {
            counts[event.event] = 0;
          }

          counts[event.event] += event.numGuests;

          if (event.event === 'temple') {
            if (!counts['temple-pictures']) {
              counts['temple-pictures'] = 0;
            }

            counts['temple-pictures'] += 1;
          }
        }
      }
    }
    return counts;
  });

  const mapName = (event: string) => {
    switch (event) {
      case 'temple':
        return 'Temple';
      case 'temple-pictures':
        return 'Temple Pictures';
      case 'temple-dinner':
        return 'Post-Temple Dinner';
      case 'ring-ceremony':
        return 'Ring Ceremony';
      case 'reception':
        return 'Reception';
      default:
        return event;
    }
  };

  const translateResponse = (response: RsvpInfo) => {
    return response.events
      .filter(e => e.numGuests > 0 || e.outside)
      .map(e => mapName(e.event) + (e.outside ? ' (Outside)' : ''))
      .join(', ');
  };
</script>

<div>
  <span>There are <strong>{totalRespondents}</strong> respondents.</span>

  <h1>Event Counts</h1>
  <ul>
    {#each Object.entries(countsByEvent) as [event, count]}
      <li>{mapName(event)}: {count}</li>
    {/each}
  </ul>

  <h1>Respondents</h1>
  <ul>
    {#each responses as response}
      <!-- Only show a list of first/last names -->
      <li>{response.firstName} {response.lastName}
        <span class='events'>
          ({translateResponse(response)})
        </span>
      </li>
    {/each}
  </ul>
</div>

<style>
  div {
    margin: 1rem;
  }

  .events {
    font-size: 0.8rem;
    color: #666;
  }
</style>