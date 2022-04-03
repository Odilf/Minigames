import { isBetween, range } from "../utils"

export class Line {
	crossed = false
	index: number

	constructor(index: number) {
		this.index = index
	}
}

export type Board = Line[][]

export function makeBoard(rows: number) {
	return range(rows, 1)
		.map(i => range(i)
		.map(j => new Line(j)))
		.reverse()
}

export function cross(board: Board, selection: { rowIndex: number, start: number, end: number }) {
	board = board.slice()

	let row = board[selection.rowIndex];
	row = row.map(line => {
		if (isBetween(line.index, selection.start, selection.end)) {
			line.crossed = true
		}

		return line
	})

	return board
}

export function getPlayer(turn: number, playerNames: string[]) {
	const playerIndex = turn % playerNames.length
	return playerNames[playerIndex]
}

export function getPossesiveName(name: string) {
	if (name.charAt(name.length - 1) === 's')
		return `${name}'`

	return `${name}'s`
}