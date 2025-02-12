<script lang="ts">
	// 必要なコンポーネントとアイコンのインポート
	import { Card, CardContent } from "$lib/components/ui/card";

	// プロフィールデータ（仮データ）
	const profile = {
		name: "若宮佑真",
		role: "合同会社Kalytero COO",
		description: "Do One Thing and Do It Well",
		details: [
			"情報経営イノベーション専門職大学 在学中",
			"埼玉県 朝霞市在住",
			"茨城県 古河市出身"
		]
	};
</script>

<Card class="md:min-h-80 min-h-[600px] bg-gray-800/80 mx-auto shadow-xl rounded-xl overflow-hidden transition-transform duration-300"
      style="backdrop-filter: blur(10px);">
	<CardContent class="p-6 flex flex-col md:flex-row items-center md:items-start">
		<!-- 左カラム: アイコンと名前・役職 -->
		<div class="flex flex-col items-center md:items-start md:w-1/3">
			<!-- アイコン部分 -->
			<div class="w-32 h-32 rounded-full flex items-center justify-center mb-4">
				<img src="/prof.webp" alt="Profile Image" class="w-28 h-28 rounded-full" />
			</div>
			<!-- 名前 -->
			<h2 class="text-2xl font-bold text-white">{profile.name}</h2>
			<!-- 役職 -->
			<p class="text-sm text-gray-300 mt-1">{profile.role}</p>
		</div>

		<!-- 右カラム: その他の詳細項目 -->
		<div class="mt-6 md:mt-0 md:ml-8 md:w-2/3">
			<p class="text-md text-gray-200 mb-4 italic">{profile.description}</p>
			<ul class="space-y-2">
				{#each profile.details as detail}
					<li class="flex items-center">
						<div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
						<span class="text-gray-300">{detail}</span>
					</li>
				{/each}
			</ul>
		</div>
	</CardContent>
</Card>
