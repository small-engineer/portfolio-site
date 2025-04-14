<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';

	const pemdemyInfo = {
		title: 'Pemdemy',
		role: '',
		description: '',
		details: []
	};
</script>

<Card
	class="card-size mx-auto min-h-[600px] border border-white  bg-gray-800/80 shadow-xl backdrop-blur-2xl transition-transform duration-300 md:min-h-[500px]"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-2">
		<div class="flex flex-col space-y-3">
			<h2 class="text-3xl font-extrabold text-white">
				{pemdemyInfo.title}
			</h2>
			<p class="text-md text-white">
				<strong></strong>
				{pemdemyInfo.role}
			</p>
			<p class="text-sm text-white">
				{pemdemyInfo.description}
			</p>
		</div>
		<ul class="space-y-2">
			{#each pemdemyInfo.details as detail}
				<li class="flex items-center">
					<div class="mr-3 h-3 w-3 rounded-full bg-gray-100"></div>
					<span class="text-white">{detail}</span>
				</li>
			{/each}
		</ul>
	</CardContent>
</Card>
