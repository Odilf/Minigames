<script lang="ts">
	import Board from "$lib/octogon/Board.svelte"
	import { scale } from "svelte/transition";
	import { checkWin, createBoard, place } from "./architecture";

	export let columns: number
	export let rows: number
	export let players: string[]

	let turn = 0
	let winner: string
	$: board = createBoard(columns)

	function handlePlace(index: { row: number, column: number }) {
		if (winner) return

		if (board[index.column].length > rows - 1) {
			return
		}
			
		board = place(board, index.column, turn % players.length)

		const winSpot = checkWin(board)
		if (winSpot) {
			console.log(players, turn);
			
			const index = turn % players.length
			winner = players[index] || `Player ${index + 1}`
		}

		turn += 1
	}
</script>

{#if winner != null}
	<div class='text-4xl text-center' transition:scale={{ start: 0.8 }}> {winner} wins! </div>
{/if}

<div class='{winner && 'opacity-50'}'>
	<Board {columns} {rows} {board} playerIndex={turn % players.length}
	on:place={e => handlePlace(e.detail.index)}/>
</div>

