<script lang="ts">
	let minigames = [
		{ name: 'Last line stands', url: '/last-line-stands'},
		{ name: 'Minesweeper', url: '/minesweeper'},
	]
</script>

<div class='flex flex-col items-center m-8'>
	<h1 class='text-9xl font-thin m-4'>
		Minigames!
	</h1>
	<h3 class='text-xl opacity-75 font-extrabold'>
		By Odilf
	</h3>
</div>

<div class='flex items-center flex-wrap m-2'>
	{#each minigames as minigame, i}
		<a href={minigame.url} sveltekit:prefetch class='clickable'>
			<h2 class='text-3xl font-bold p-4 m-2 bg-blue-800 hover:bg-blue-600 text-white border-4 border-blue-200 rounded-xl shadow transition'
			style:background-color='hsla({i * 28 + 221}, 83%, 53%, 1)'>
				{minigame.name}
			</h2>
		</a>
	{/each}
</div>

<div class='w-36 text-center opacity-50'> More games coming soon! </div>