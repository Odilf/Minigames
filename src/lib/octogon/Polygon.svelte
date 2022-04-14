<script lang="ts">
	import { range } from "$lib/utils";
	import { formatPoints } from "./architecture";

	export let sides: number

	export let size: number
	export let x = 0
	export let y = 0

	$: points = range(sides).map(i => {
		const angle = i / sides * (2 * Math.PI)
		return {
			x: size * Math.cos(angle) + x,
			y: size * Math.sin(angle) + y,
		}
	})
</script>

<polygon points={formatPoints(points)}/>