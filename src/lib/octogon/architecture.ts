import { range } from '$lib/utils'

export const GLOBAL_RADIUS = 50 as const

export interface Index {
	row: number,
	column: number,
}

interface Point {
	x: number,
	y: number,
}

export type Symbol = 'circle' | 'cross' | number

export function getViewBox(margin: number, size = 100) {
	const corner = -size/2 - margin
	const width = size + margin * 2

	return `${corner} ${corner} ${width} ${width}`
}

export function getFunctions(columns: number, rows: number, gap: number) {
	const getAngle = (columnIndex: number) => columnIndex * Math.PI * 2 / columns
	const getRadius = (rowIndex: number) => (rowIndex / rows * (1 - gap) + gap) * GLOBAL_RADIUS

	return {
		getAngle,
		getRadius,
	}
}

function getPointFromPolar({ angle, radius }: { angle: number, radius: number }) {
	return {
		x: radius * Math.cos(angle),
		y: radius * Math.sin(angle),
	}
}

export function getPolygon(index: Index, { getAngle, getRadius }) {
	const points = [
		getPointFromPolar({ angle: getAngle(index.column),     radius: getRadius(index.row) }),
		getPointFromPolar({ angle: getAngle(index.column + 1), radius: getRadius(index.row) }),
		getPointFromPolar({ angle: getAngle(index.column + 1), radius: getRadius(index.row + 1) }),
		getPointFromPolar({ angle: getAngle(index.column),     radius: getRadius(index.row + 1) }),
	]

	return points
}

export function formatPoints(points: Point[]) {
	return points
	.map(point => `${point.x},${point.y}`)
	.join(' ')
}

export function average(points: Point[]) {
	return points
	.reduce((acc, cur) => {
		return {
			x: acc.x + cur.x / points.length,
			y: acc.y + cur.y / points.length,
		}
	}, { x: 0, y: 0 })
}

export function createBoard(columns: number) {
	return range(columns)
	.map(() => [])
}

type Board = number[][]

export function place(board: Board, column: number, player: number) {
	if (column > board.length) {
		console.error('Column index is out of bounds', { column, board })
		return board
	}
	
	board[column].push(player)

	return board
}

export function getPlayer(board: Board, index: Index) {
	if (index.column > board.length) {
		console.error('Column index is out of bounds', index.column, board)
		return 0
	}

	const column = board[index.column]
	return column[index.row]
}

export function rotateAroundAxis(radians: number, axis: Point) {
	const instructions = [
		`translate(${-axis.x}, ${-axis.y})`,
		`rotate(${radians * 2 * Math.PI})`,
		`translate(${axis.x}, ${axis.y})`,
	]

	return instructions.join(' ')
}

function checkDirection(
	board: Board, 
	length: number, 
	direction: [number, number], 
	startAt: Index
) {
	let player = board[startAt.column][startAt.row]
	return range(length).every(i => {
		const offset = [direction[0] * i, direction[1] * i]
		const column = board[(startAt.column + offset[0]) % board.length]
		const offPlayer = column[startAt.row + offset[1]]
		return player === offPlayer
	})
}

export function checkWin(board: Board, length = 4) {
	const height = Math.max(...board.map(column => column.length))
	// const rectBoard = board.map(column => {
	// 	const fill = height - column.length
	// 	return column.concat(range(fill).map(() => 0))
	// })

	const directions = [
		[1, 0],
		[0, 1],
		[1, 1],
		[1, -1],
	] as [number, number][]

	const winTable = board
	.map((column, columnIndex) => column
	.map((_, rowIndex) => {
		const index = { row: rowIndex, column: columnIndex }
		return directions.some(direction => {
			return checkDirection(board, length, direction, index)
		})
	}))	

	let winColumn = winTable.findIndex(column => column.some(v => v))
	if (winColumn === -1) return
	let winRow = winTable[winColumn]?.findIndex(v => v)

	return {
		column: winColumn,
		row: winRow,
	}
}