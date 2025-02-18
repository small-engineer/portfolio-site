<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';

	const pemdemyInfo = {
		title: 'iU 2023年度,2024年度学友会',
		role: '自治本部長(2023)',
		description:
			'iU学友会にて学友会ポータルサイトの開発や学内の倉庫,貸出システムの整備等を行いました',
		details: [
			'学友会ポータルサイトの開発(https://i-u.io/)',
			'学内の倉庫,貸出システムの整備',
			'サークル認可や委員会運営等の学友会の運営',
			'学友会会則の改正'
		]
	};
</script>

<Card
	class="card-size mx-auto min-h-[600px] border border-white bg-gray-800/80 shadow-xl backdrop-blur-2xl transition-transform duration-300 md:min-h-[420px]"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-2">
		<div class="flex flex-col space-y-3">
			<h2 class="text-3xl font-extrabold text-gray-100">
				{pemdemyInfo.title}
			</h2>
			<p class="text-md text-gray-100">
				<strong>役割:</strong>
				{pemdemyInfo.role}
			</p>
			<p class="text-sm text-gray-100">
				{pemdemyInfo.description}
			</p>
		</div>
		<ul class="space-y-2">
			{#each pemdemyInfo.details as detail}
				<li class="flex items-center">
					<div class="mr-3 h-3 w-3 rounded-full bg-gray-100"></div>
					<span class="text-blue-100">{detail}</span>
				</li>
			{/each}
		</ul>
	</CardContent>
</Card>
