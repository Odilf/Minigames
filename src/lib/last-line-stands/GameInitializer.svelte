<script lang="ts">
	import { fade } from 'svelte/transition'
	import Game from "./Game.svelte";
	import PlayerSelect from './PlayerSelect.svelte';

	let started = false
	let rows: number = 5

	let players = ['', '']

	function start() {
		players = players.map((name, index) => {
			if (!name) {
				return `Player ${index + 1}`
			} 
			return name
		})
		started = true
	}
</script>

{#if !started}
	<h1 class='text-6xl font-bold mt-8'> Last line stands </h1>

	<div class='flex flex-col items-center' in:fade>
		<button on:click={() => start()} class='p-4 m-6 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 
			font-semibold text-4xl transition rounded shadow border-2 border-slate-500 clickable'>
			Start game! 
		</button>

		<div class='m-2 text-3xl'>
			<button on:click={() => rows -= 1} disabled={rows === 1} class='clickable disabled:opacity-50 select-none'> - </button>
			<span class='p-2 my-2 w-10 bg-slate-700 text-white rounded text-2xl font-light'> {rows} rows </span>
			<button on:click={() => rows += 1} class='clickable select-none'> + </button>
		</div>

		<PlayerSelect bind:playerNames={players}/>
	</div>
{:else}
	<div in:fade>
		<Game {rows} {players} on:requestNewGame={() => started = false}/>
	</div>
{/if}