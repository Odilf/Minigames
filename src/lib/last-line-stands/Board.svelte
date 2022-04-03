<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { makeBoard, cross } from "./game";
	import Line from "./Line.svelte";
	import { isBetween } from "$lib/utils";

	export let rows: number
	let board = makeBoard(rows)

	const dispatch = createEventDispatcher()

	interface Selection {
		row: number
		index: number
	}

	let first: Selection
	let last: Selection

	function isLegalSelection(first: Selection, last: Selection) {
		if (!first || !last) return false
		if (first.row !== last.row) return false
		return true
	}

	function isSelected(first: Selection, last: Selection, rowIndex: number, index: number) {
		if (!isLegalSelection(first, last)) return false
		if (rowIndex !== first.row) return false
		if (isBetween(index, first.index, last.index)) return true
		return false
	}

	function commit(first: Selection, last: Selection) {
		if (!isLegalSelection(first, last)) return
		
		const selection = {
			rowIndex: first.row,
			start: first.index,
			end: last.index
		}
		board = cross(board, selection)

		if (board.every(row => row.every(line => line.crossed))) {
			dispatch('win')
		} else {
			dispatch('commit')
		}

		clearSelection()
	}

	function clearSelection() {
		first = null
		last = null
	}

	// $: 
</script>

<svelte:window on:mouseup={() => commit(first, last)}/>

<div class='bg-slate-300 p-4 rounded-xl shadow border-2 border-slate-500 w-fit'>
	{#each board as row, rowIndex}
		<div class='flex justify-center'>
			{#each row as line}
				<Line crossed={line.crossed} 
					selected={isSelected(first, last, rowIndex, line.index)}
					on:mousedown={() => first = { row: rowIndex, index: line.index }}
					on:mouseenter={() => last = first && { row: rowIndex, index: line.index }}
					on:click={() => commit(first, first)}/>
			{/each}
		</div>
	{/each}
</div>