<script lang="ts">
	import type { Index } from "$lib/octogon/architecture";
	import { createEventDispatcher } from "svelte";
	import { average, formatPoints, getFunctions, getPolygon, type Symbol } from "./architecture";

	export let columns: number
	export let rows: number
	export let gap: number

	export let index: Index

	let size = 2

	let getters = getFunctions(columns, rows, gap) 
	$: getters = getFunctions(columns, rows, gap)
	$: getAngle = getters.getAngle
	
	$: points = getPolygon(index, getters)
	$: center = average(points)

	const dispatch = createEventDispatcher()
</script>

<g on:click={() => dispatch('place', { index })}
on:mouseenter>
	<polygon points={formatPoints(points)} fill='transparent' class='cursor-pointer'/>

	<slot {center} angle={getAngle(index.column + 0.5)} {size}/>
</g>

