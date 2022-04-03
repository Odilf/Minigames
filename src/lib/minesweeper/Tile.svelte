<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import type { State } from "./logic";

	export let state: State = 'closed'
	export let isMine: boolean
	export let neighbours: number

	const dispatch = createEventDispatcher()

	function mark() {
		if (state !== 'open') {
			state = 'marked'
		}
	}

	function open() {
		if (isMine) {
			dispatch('mine')
		} else {
			dispatch('open', { neighbours })
		}

		if (state === 'closed') {
			state = 'open'
		} else if (state === 'marked') {
			state = 'closed'
		}
	}
</script>

<button class='p-6 m-2 rounded shadow {isMine ? `mine-${state}` : state} transition 
flex justify-center items-center' class:clickable={state === 'closed'}
on:click={open} on:contextmenu|preventDefault={mark}>

	{#if state === 'open'}
		<span class='absolute text-xl font-bold'
		style:color='hsl({neighbours * 5 - 60}, 90%, {(neighbours + 10) / (8 + 10) * 50}%)'>
			{neighbours}
		</span>
	{/if}

</button>

<style lang='postcss'>
	.closed {
		@apply bg-violet-300;
	}

	.marked {
		@apply bg-violet-500;
	}

	.open {
		@apply bg-violet-50 cursor-default;
	}

	.mine-closed {
		/* @apply bg-red-200; */
		@apply closed;
	}

	.mine-marked {
		@apply bg-red-500;
	}
</style>