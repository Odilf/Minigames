<script lang="ts">
	import Board from '$lib/minesweeper/Board.svelte';
	import { fade } from 'svelte/transition'

	let started = false
	let size = [10, 10]

	let sliderValue = 0.3
	$: mineDensity = sliderValue ** 2

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
	
	<div class='flex flex-col items-center mb-4'>
		<h2 class='text-xl'> Mine density </h2>
		<input type='range' min={0} max={1} step={0.001} bind:value={sliderValue}>
		<span> {Math.round(mineDensity * 100)}% </span>
	</div>

	<div class='flex flex-col items-center'>
		<h2 class='text-xl'> Board size </h2>
		<div>
			Rows: 
			<input type='number' bind:value={size[0]} class='p-2 m-2 w-16 text-lg font-bold rounded shadow'>
		</div>
		<div>
			Columns: 
			<input type='number' bind:value={size[1]} class='p-2 m-2 w-16 text-lg font-bold rounded shadow'>
		</div>
	</div>
</div>


{:else}
	<div in:fade>
		<Board boardSize={size} {mineDensity}/>
	</div>
{/if}