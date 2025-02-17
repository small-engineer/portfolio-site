<script lang="ts">
	// 必要なコンポーネントとアイコンのインポート
	import { Card, CardContent } from '$lib/components/ui/card';

	// プロフィールデータ（仮データ）
	const profile = {
		name: '若宮佑真',
		role: '合同会社Kalytero COO',
		description: 'Do One Thing and Do It Well',
		details: ['情報経営イノベーション専門職大学 在学中', '埼玉県 朝霞市在住', '茨城県 古河市出身']
	};
</script>

<Card
	class="mx-auto min-h-[600px] overflow-hidden rounded-xl border border-white bg-gray-800/80 shadow-xl backdrop-blur-2xl transition-transform duration-300 md:min-h-[420px]"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="flex flex-col items-center p-6 md:flex-row md:items-start">
		<!-- 左カラム: アイコンと名前・役職 -->
		<div class="flex flex-col items-center md:w-1/3 md:items-start">
			<!-- アイコン部分 -->
			<div class="mb-4 flex h-32 w-32 items-center justify-center rounded-full">
				<img src="/prof.webp" alt="Profile" class="h-28 w-28 rounded-full" />
			</div>
			<!-- 名前 -->
			<h2 class="text-2xl font-bold text-white">{profile.name}</h2>
			<!-- 役職 -->
			<p class="mt-1 text-sm text-gray-300">{profile.role}</p>
		</div>

		<!-- 右カラム: その他の詳細項目 -->
		<div class="mt-6 md:mt-0 md:ml-8 md:w-2/3">
			<p class="text-md mb-4 text-gray-200 italic">{profile.description}</p>
			<ul class="space-y-2">
				{#each profile.details as detail}
					<li class="flex items-center">
						<div class="mr-2 h-2 w-2 rounded-full bg-blue-400"></div>
						<span class="text-gray-300">{detail}</span>
					</li>
				{/each}
			</ul>
		</div>
	</CardContent>
</Card>
