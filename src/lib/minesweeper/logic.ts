import { range } from "$lib/utils"

export type State = 'closed' | 'marked' | 'open'

export interface Tile {
	state: State,
	isMine: boolean
}

type Board = Tile[][]

export function createBoard(x: number, y: number, mineDensity: number): Board {
	const board = range(x)
	.map(() => range(y)
	.map(() => {
		return {
			state: 'closed' as State,
			isMine: Math.random() < mineDensity,
		}
	}))

	return board
}

export function getNeighbours(board: Board, rowIndex: number, index: number): number {
	const mines = forNeighbour(board, rowIndex, index, tile => tile.isMine ? 1 : 0)
	return mines.reduce((acc, cur) => acc + cur, 0);
}

export function countBoard(board: Board, callback: (tile: Tile) => boolean) {
	return board.reduce((value, row) => {
		return value + row.reduce((value, tile) => value + (callback(tile) ? 1 : 0), 0)
	}, 0)
}

export function forNeighbour<T>(
	board: Board, 
	rowIndex: number, 
	index: number, 
	callback: (tile: Tile, rowIndex: number, index: number) => T
) {
	let result = []
	for (const offsetRow of [-1, 0, 1]) {
		for (const offset of [-1, 0, 1]) {
			const row = board[rowIndex + offsetRow]
			if (!(offsetRow === 0 && offset === 0) && row && row[index + offset]) {
				result.push(callback(row[index + offset], rowIndex + offsetRow, index + offset))
			}
		}
	}

	return result
}