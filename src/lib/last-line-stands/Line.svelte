<script lang="ts">
	export let crossed: boolean
	export let selected: boolean
</script>

<div on:mousedown on:mouseenter on:mouseup on:click>
	<svg viewBox="0 0 10 100" xmlns="http://www.w3.org/2000/svg"
	class='h-24 px-6 transition cursor-pointer drop-shadow
	{selected ? 'text-red-200 scale-105' : ''}
	{crossed ? 'text-red-400' : 'text-blue-400'}'>
		<line x1={5} y1={5} x2={5} y2={95} stroke-width={10} class='{crossed ? 'text-red-800' : 'text-blue-800'}' stroke='currentColor' stroke-linecap='round' stroke-linejoin="round"/>
		<line x1={5} y1={5} x2={5} y2={95} stroke-width={6} stroke='currentColor' stroke-linecap='round' stroke-linejoin="round" />
	</svg>
</div>