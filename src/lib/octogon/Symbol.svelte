<script lang="ts">
	import Polygon from "./Polygon.svelte";
	import { scaleAndRotate } from "./customTransition";
	import { fade } from 'svelte/transition'

	export let center: { x: number, y: number }
	export let angle: number
	export let size: number

	export let shape: 'circle' | 'cross' | number
</script>

{#key shape}
	<g transform="rotate({angle * 180 / Math.PI}, {center.x}, {center.y})"
	fill-opacity=0.5 >
		{#if shape === 'circle'}
			<circle cx={center.x} cy={center.y} r={size} transition:scaleAndRotate/>
		{:else if shape === 'cross'}
			<g>
				<line 
				x1={center.x - size} y1={center.y - size}
				x2={center.x + size} y2={center.y + size} />

				<line
				x1={center.x + size} y1={center.y - size}
				x2={center.x - size} y2={center.y + size} />
			</g>
		{:else if typeof shape === 'number'}
			<Polygon sides={shape} x={center.x} y={center.y} {size}/>
		{/if}
	</g>
{/key}