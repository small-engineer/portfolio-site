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
	class="md:min-h-[420px] min-h-[600px] backdrop-blur-2xl backdrop-blur-2xl bg-gray-800/80 mx-auto shadow-xl transition-transform duration-300 card-size"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
		<!-- 左カラム：タイトルと説明 -->
		<div class="flex flex-col space-y-3">
			<h2 class="text-3xl font-extrabold text-blue-100">
				{pemdemyInfo.title}
			</h2>
			<p class="text-md text-blue-200">
				<strong>役割:</strong>
				{pemdemyInfo.role}
			</p>
			<p class="text-sm text-blue-300">
				{pemdemyInfo.description}
			</p>
		</div>
		<!-- 右カラム：詳細項目をアイコン風に配置 -->
		<ul class="space-y-2">
			{#each pemdemyInfo.details as detail}
				<li class="flex items-center">
					<div class="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
					<span class="text-blue-100">{detail}</span>
				</li>
			{/each}
		</ul>
	</CardContent>
</Card>
