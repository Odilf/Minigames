<script lang='ts'>
	import { countBoard, createBoard, forNeighbour, getNeighbours } from './logic'

	import { tweened } from 'svelte/motion'
	import Tile from "./Tile.svelte";


	export let boardSize = [10, 10]
	export let mineDensity = 0.2

	let board = createBoard(boardSize[0], boardSize[1], mineDensity)

	const progress = tweened(0)

	$: $progress = countBoard(board, tile => tile.state === 'open') / countBoard(board, tile => !tile.isMine) 

	function open(rowIndex: number, index: number) {
		const tile = board[rowIndex][index]
		const neighbours = getNeighbours(board, rowIndex, index)
		
		tile.state = 'open'

		if (neighbours === 0) {
			forNeighbour(board, rowIndex, index, (tile, rowIndex, index) => {
				if (tile.state !== 'open') {
					setTimeout(() => {
						open(rowIndex, index)
						console.log('opening neighbours', rowIndex, index);
					}, 30)
				}
			})
		}

		board = board
	}
</script>


<div class='bg-indigo-100 border-2 border-indigo-200 flex flex-col p-2 rounded-xl shadow'>
	{#each board as row, i}
	<div class='flex'>
		{#each row as tile, j}
			<Tile neighbours={getNeighbours(board, i, j)} 
			bind:state={tile.state} isMine={tile.isMine} 
			on:open={e => open(i, j) } 
			on:mine={() => console.warn('EXPLOSION!')}/>
		{/each}
	</div>
	{/each}
</div>

<span class='m-2 opacity-75'>
	{ Math.round($progress * 100) }%
</span>

<!-- <div class='flex'>
	{#each [0, 1,2,3,4,5,6,7,8] as i}
		<Tile neighbours={i} isMine={false} state='open'/>
	{/each}
</div> -->