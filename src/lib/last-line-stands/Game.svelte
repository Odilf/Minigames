<script lang="ts">
	import Confetti from 'js-confetti'
	import { browser } from "$app/env";
	import { createEventDispatcher } from "svelte";
	
	import { range } from "$lib/utils";
	import { getPlayer, getPossesiveName } from "./game";
	import Board from "./Board.svelte";

	const dispatch = createEventDispatcher()

	export let rows: number
	export let players = ['Odilf', 'ClaraPollasShowtime']

	const confetti = browser && new Confetti()
	let timeouts = []

	$: if (winner && confetti) {
		popConfetti()
	}

	function popConfetti() {
		range(3).forEach(i => {
			timeouts.push(
				setTimeout(() => {
					confetti.addConfetti({
						confettiRadius: (7 - i * 2),
						confettiNumber: (4 - i) * 500,
					})
				}, (Math.random() * i * 2 + i) * 1000)
			)
		})

		timeouts.push(setTimeout(() => confetti.addConfetti, 10 * 1000))
	}

	function requestNewGame() {
		timeouts.forEach(timeout => clearTimeout(timeout))
		dispatch('requestNewGame')
	}

	let turn = 0
	$: player = getPlayer(turn, players)

	let winner: string
</script>

<main class='flex flex-col items-center'>
	{#if winner}
		<div class='text-4xl font-black m-8'>
			{winner} won!
		</div>
	{/if}

	<div class='flex flex-col items-center {winner && 'opacity-50'} transition'>
		<div class='text-xl m-2 font-light'> 
			{getPossesiveName(player)} turn 
		</div>

		<Board {rows} 
		on:win={() => winner = getPlayer(turn + 1, players)}
		on:commit={() => turn += 1}/>
		
	</div>

	<button on:click={() => requestNewGame()}
		class=' p-2 my-2 rounded shadow transform hover:opacity-100 border-2 clickable transition-all
		{winner ? 'text-3xl p-6 my-6 bg-blue-100 border-blue-200' : 'opacity-70 bg-red-100 border-red-200 '}'>

		{ winner ? 'Play again' : 'Abort game'} 
	</button>
</main>
