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
	class="card-size mx-auto min-h-[600px] border border-white bg-gray-800/80 shadow-xl backdrop-blur-2xl transition-transform duration-300 md:min-h-[500px]"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="flex flex-col items-start space-y-4 p-8">
		<h2 class="border-b-2 border-white pb-2 md:text-4xl text-3xl font-bold text-white">
			{kalyteroInfo.title}
		</h2>
		<p class="text-lg text-gray-300">
			<strong>役職:</strong>
			{kalyteroInfo.role}
		</p>
		<p class="text-md text-gray-400">
			{kalyteroInfo.description}
		</p>
		<div class="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
			<ul class="list-inside list-disc space-y-1 text-gray-200">
				{#each kalyteroInfo.details as detail}
					<li>{detail}</li>
				{/each}
			</ul>
			<Button
				class="mt-4 transform rounded-full bg-none border border-white px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-xl md:mt-0"
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
