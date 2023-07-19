<!--suppress JSUnusedAssignment -->
<script lang='ts'>
  export let data: {
    responses: {
      firstName: string,
      lastName: string,
      attending: boolean,
      announcement: boolean,
      numGuests: number,
      announcementSent: boolean
    }[]
  };

  const responses: {
    firstName: string,
    lastName: string,
    attending: boolean,
    announcement: boolean,
    numGuests: number,
    announcementSent: boolean
  }[] = data.responses;
  const total = responses?.length;
  const yes = responses?.filter(r => r?.attending === true)?.length;
  const guests = responses?.reduce((acc, r) => acc + (r?.numGuests || 0), 0);
  const announcements = responses?.filter(r => r?.announcement === true)?.length;
</script>

<div>
  There are <strong>{responses.length}</strong> respondents. <strong>{yes}</strong> are attending with
  <strong>{guests}</strong> total guests. There are <strong>{announcements}</strong> physical announcements to be sent.

  <h1>Respondents</h1>
  <ul>
    {#each responses as response}
      <!-- Only show a list of first/last names -->
      <li>{response.firstName} {response.lastName}{response.announcementSent ? ' ✅' : ''}</li>
    {/each}
  </ul>
</div>

<style>
  div {
    margin: 1rem;
  }
</style>