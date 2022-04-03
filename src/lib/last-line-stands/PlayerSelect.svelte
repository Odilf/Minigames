<script lang="ts">
	import { fly } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	export let playerNames: string[]

	$: playerNames = players.map(player => player.name)

	let count = 0
	let players = playerNames.map(name => {
		count++
		return {
			name,
			index: count
		}
	})

	function removePlayer(index: number) {
		players = players.filter((_, i) => index !== i)
	}

	function addPlayer(name = '') {
		count++;
		players = [
			...players,
			{
				name,
				index: count
			}
		]
	}
	
</script>

<div class='m-2 flex flex-col h-52 px-4'>
	{#each players as player, i (player.index)}
		<div class='flex justify-center items-center' in:fly={{ x: 20, duration: 500}} animate:flip>
			<input type='text' placeholder='Player {i + 1}' class='p-2 m-2 border-2 w-full' bind:value={player.name}>
			{#if i > 1}
				<button class='clickable text-red-900' on:click={() => removePlayer(i)}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
				</button>
			{/if}
		</div>
	{/each}
	<button class='text-3xl clickable' on:click={() => addPlayer()}> + </button>
</div>