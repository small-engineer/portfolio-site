<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';

	const pemdemyInfo = {
		title: 'Pemdemyでのこと',
		role: '色々書きたい',
		description: 'あ。',
		details: ['あ', 'あ', 'あ', 'あ']
	};
</script>

<Card
	class="card-size mx-auto min-h-[600px] border border-white  bg-gray-800/80 shadow-xl backdrop-blur-2xl transition-transform duration-300 md:min-h-[420px]"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-2">
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
					<div class="mr-3 h-3 w-3 rounded-full bg-blue-400"></div>
					<span class="text-blue-100">{detail}</span>
				</li>
			{/each}
		</ul>
	</CardContent>
</Card>
