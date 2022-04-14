<script lang='ts'>
	import { range } from "$lib/utils";
	import { fade } from "svelte/transition";
	import { getViewBox, getPlayer, type Index, type Symbol as SymbolType } from "./architecture";
	import Symbol from "./Symbol.svelte";
	import Tile from "./Tile.svelte";

	export let board: number[][]
	
	export let rows: number
	export let columns: number
		
	export let playerIndex: number
	export let playerSymbols: SymbolType[] = [
		'circle',
		'cross',
		5,
	]

	let hovering: number

	function getShape(player: number) {
		return playerSymbols[player]
	}

	let gap = 0.2
</script>

<svg class='h-[85vh]' viewBox={getViewBox(2, 100)}
stroke-width={0.5} stroke='black' stroke-linejoin='round' stroke-linecap='round'
on:mouseleave={() => hovering = null}>
	{#each range(columns) as column}
		{#each range(rows) as row}
		{@const index = { row, column }}
		<Tile {columns} {rows} {gap} {index} on:place
		let:angle let:center let:size
		on:mouseenter={() => hovering = column}>
			<Symbol {angle} {center} {size} shape={getShape(getPlayer(board, index))}/>
		</Tile>
		{/each}
	{/each}

	{#if hovering != null && board[hovering].length < rows}
	{#key hovering}
		<g name='preview' opacity={0.5}>
			<Tile {columns} {rows} {gap} index={{ column: hovering, row: board[hovering].length }} on:place
			let:angle let:center let:size>
				<Symbol {angle} {center} {size} shape={getShape(playerIndex)}/>
			</Tile>
		</g>
		{/key}
	{/if}
</svg>