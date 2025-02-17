<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	const kalyteroInfo = {
		title: 'Kalyteroでの仕事',
		role: 'COO',
		description:
			'2023年に起業したKalyteroではソフトウェア開発のアウトソーシングや、コンサルティング等を行っています',
		details: [
			'クライアントとのコミュニケーション',
			'プロジェクトマネジメント',
			'React系フレームワークでのWEB開発',
			'AWS,Cloudflareなどのインフラ構築'
		],
		website: 'https://kalytero.ne.jp'
	};
</script>

<Card
	class="md:md:min-h-[420px] min-h-[600px] backdrop-blur-2xl bg-gray-800/80 mx-auto shadow-xl transition-transform duration-300 card-size"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="flex flex-col items-start p-8 space-y-4">
		<h2 class="text-4xl font-bold text-white border-b-2 border-blue-500 pb-2">
			{kalyteroInfo.title}
		</h2>
		<p class="text-lg text-gray-300">
			<strong>役職:</strong>
			{kalyteroInfo.role}
		</p>
		<p class="text-md text-gray-400">
			{kalyteroInfo.description}
		</p>
		<div class="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
			<ul class="list-disc list-inside text-gray-200 space-y-1">
				{#each kalyteroInfo.details as detail}
					<li>{detail}</li>
				{/each}
			</ul>
			<Button
				class="mt-4 md:mt-0 px-6 py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
			>
				<a
					href={kalyteroInfo.website}
					target="_blank"
					rel="noopener noreferrer"
					on:click|stopPropagation
				>
					Kalyteroのウェブサイトへ
				</a>
			</Button>
		</div>
	</CardContent>
</Card>
