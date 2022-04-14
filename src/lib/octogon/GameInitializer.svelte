<script lang="ts">
	import PlayerSelect from '$lib/last-line-stands/PlayerSelect.svelte';
	import Game from '$lib/octogon/Game.svelte';
	import { fade } from 'svelte/transition'

	let started = false
	let columns = 8
	let rows = 4

	let players = ['', '']

	function start() {
		started = true
	}
</script>

{#if !started}
<div class='flex flex-col items-center' in:fade>
	<button on:click={() => start()} class='p-4 m-6 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 
		font-semibold text-4xl transition rounded shadow border-2 border-slate-500 clickable'>
		Start game! 
	</button>

	<div class='flex flex-col items-center'>
		<h2 class='text-xl'> Board size </h2>
		<div>
			Columns: 
			<input type='number' bind:value={columns} class='p-2 m-2 w-16 text-lg font-bold rounded shadow'>
		</div>
		<div>
			Rows: 
			<input type='number' bind:value={rows} class='p-2 m-2 w-16 text-lg font-bold rounded shadow'>
		</div>
	</div>

	<PlayerSelect bind:playerNames={players}/>
</div>


{:else}
	<div in:fade>
		<Game {columns} {rows} {players}/>
	</div>
{/if}