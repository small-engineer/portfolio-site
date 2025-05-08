<script lang="ts">
	import { Timeline, TimelineItem } from 'flowbite-svelte';
	import { CalendarWeekSolid } from 'flowbite-svelte-icons';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";

	const profile = {
		name: '若宮佑真',
		role: 'フロントエンドエンジニア',
		description: '遍歴',
		details: [
			{
				title: '合同会社Kalytero',
				date: '2023〜',
				description:
					'COO（最高執行責任者）<br> 会計・財務の管理・設計やプロジェクト管理 <br> WEB開発やコンサルティング支援業務を行っています。'
			},
			{
				title: 'NPO法人Pendemyデジタル教育ラボ',
				date: '2022〜',
				description: '旧：Pendemyふちゅう教育ラボ <br> STEAM教育に関するイベントや活動を行っています。'
			},
			{ title: 'N高等学校 卒業', date: '2023', description: '' },
			{
				title: '株式会社NoSchool',
				date: '2022〜2023',
				description: 'インターン生/アルバイト<br>メディア運営、SEOマーケティングに関する業務に従事しました。'
			}
		],
		frameworks: [
			{
				name: 'TypeScript',
				iconSlug: 'typescript',
				description: 'JavaScriptのスーパーセットで型安全なプログラミングが可能',
				level: '業務で使用中'
			},
			{
				name: 'Python',
				iconSlug: 'python',
				description: '汎用プログラミング言語',
				level: '業務で使用中'
			},
			{ name:'C',
				iconSlug: 'c',
				description: '汎用プログラミング言語',
				level: '学習済み'
			},
			{
				name: 'Next.js',
				iconSlug: 'nextdotjs',
				description: 'ReactベースのフルスタックWebフレームワーク',
				level: '業務で使用中'
			},
			{
				name: 'React',
				iconSlug: 'react',
				description: 'UI構築のためのコンポーネントベースライブラリ',
				level: '業務で使用中'
			},
			{
				name: 'Hugo',
				iconSlug: 'hugo',
				description: '高速なGo製の静的サイトジェネレーター',
				level: '業務で使用中'
			},
			{
				name: 'Node.js',
				iconSlug: 'nodedotjs',
				description: 'サーバーサイドのJavaScript実行環境',
				level: '業務で使用中'
			},
			{
				name: 'graphQL',
				iconSlug: 'graphql',
				description: 'APIのクエリ言語',
				level: '業務で使用中'
			},	
			{
				name: 'Prisma',
				iconSlug: 'prisma',
				description: 'TypeScript向けORMライブラリ',
				level: '業務で使用中'
			},
			{
				name: 'PostgreSQL',
				iconSlug: 'postgresql',
				description: 'リレーショナルデータベース管理システム',
				level: '業務で使用中'
			},
						{
				name: 'Tailwind CSS',
				iconSlug: 'tailwindcss',
				description: 'ユーティリティファーストなCSSフレームワーク',
				level: '業務で使用中'
			},
		],
		tools: [
			{
				name: 'Cloudflare',
				iconSlug: 'cloudflare',
				description: 'CDN・セキュリティ・サーバレス機能を持つクラウド基盤',
				level: '業務で使用中'
			},
			{
				name: 'AWS',
				iconSlug: 'amazonwebservices',
				description: '業界標準のクラウドサービス群',
				level: '業務で使用中'
			},
			{
				name: 'Linux',
				iconSlug: 'linux',
				description: 'オープンソースのUnix系OS',
				level: '業務で使用中'
			},
			{
				name: 'Rocky Linux',
				iconSlug: 'rockylinux',
				description: 'オープンソースのUnix系OS',
				level: '業務で使用中'
			},
			{
				name: 'Ubuntu',
				iconSlug: 'ubuntu',
				description: 'オープンソースのUnix系OS',
				level: '業務で使用中'
			},
			{
				name: 'Docker',
				iconSlug: 'docker',
				description: 'コンテナ型仮想化技術',
				level: '業務で使用中'
			},
			{
				name: 'GitHub',
				iconSlug: 'github',
				description: 'ソースコード管理とコラボレーションのためのプラットフォーム',
				level: '日常的に使用'
			},
			{
				name: 'Terraform',
				iconSlug: 'terraform',
				description: 'インフラをコードで管理するIaCツール',
				level: '習得中'
			},
						{
				name: 'Adobe XD',
				description: 'UI/UXプロトタイピングツール',
				level: '業務で使用中',
				iconSlug: '/icons/adobe.svg',
			},
			{
				name: 'Adobe Illustrator',
				description: 'ベクターグラフィック編集ソフト',
				level: '業務で使用中',
				iconSlug: '/icons/adobe.svg',
			},
			{
				name: 'Adobe Photoshop',
				description: '画像編集ソフト',
				level: '業務で使用中',
				iconSlug: '/icons/adobe.svg',
			}
		]
	};

	function getIconUrl(tech: { iconSlug?: string; name: string }): string {
		return tech.iconSlug
			? tech.iconSlug.startsWith('http') || tech.iconSlug.startsWith('/')
				? tech.iconSlug // フルパス対応（将来的な拡張）
				: `https://cdn.simpleicons.org/${tech.iconSlug}/ffffff`
			: `/icons/${tech.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
	}

</script>

<Card
	class="mx-auto min-h-[600px] rounded-xl border border-white bg-gray-800/80 shadow-xl backdrop-blur-2xl transition-transform duration-300 md:min-h-[500px]"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="flex flex-col items-center p-6 md:flex-row md:items-start">
		<!-- 左カラム: アイコンと名前・役職 -->
		<div class="flex flex-col items-center md:w-1/2 md:items-start">
			<!-- 横並びにするためのラッパー -->
			<div class="mb-4 flex items-center space-x-4">
				<!-- アイコン -->
				<div class="flex h-28 w-28 items-center justify-center rounded-full overflow-hidden">
					<img src="/prof.jpg" alt="Profile" class="h-28 w-28 object-cover" />
				</div>
				<!-- 名前と職業 -->
				<div class="text-left">
					<h2 class="text-2xl font-bold text-white">{profile.name}</h2>
					<p class="mt-1 text-sm text-gray-300">{profile.role}</p>
				</div>
			</div>

			<!-- 技術スタック: フレームワーク -->
			<h3 class="mt-4 text-sm text-gray-400">言語・フレームワーク</h3>
			<div class="mt-1 flex flex-wrap gap-3">
				{#each profile.frameworks as tech}
					<div class="relative group">
						<div class="flex items-center space-x-1 bg-gray-700/50 px-2 py-1 rounded-md text-sm text-gray-100 cursor-default">
							<img
								src={getIconUrl(tech)}
								alt={tech.name}
								class="w-4 h-4"
							/>
							<span>{tech.name}</span>
						</div>
						<!-- ホバー表示 -->
						<div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 hidden group-hover:block bg-black text-white text-xs rounded-md px-3 py-2 w-max max-w-[220px] text-center shadow-lg transition-opacity duration-300">
							<p>{tech.description}</p>
							<p class="mt-1 text-gray-300 text-[10px]">📘 使用レベル：{tech.level}</p>
							<div class="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
						</div>
					</div>
				{/each}
			</div>

			<!-- 技術スタック: ツール -->
			<h3 class="mt-6 text-sm text-gray-400">ツール・プラットフォーム</h3>
			<div class="mt-1 flex flex-wrap gap-3">
				{#each profile.tools as tech}
					<div class="relative group">
						<div class="flex items-center space-x-1 bg-gray-700/50 px-2 py-1 rounded-md text-sm text-gray-100 cursor-default">
							<img
								src={getIconUrl(tech)}
								alt={tech.name}
								class="w-4 h-4"
							/>
							<span>{tech.name}</span>
						</div>
						<!-- ホバー表示 -->
						<div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 hidden group-hover:block bg-black text-white text-xs rounded-md px-3 py-2 w-max max-w-[220px] text-center shadow-lg transition-opacity duration-300">
							<p>{tech.description}</p>
							<p class="mt-1 text-gray-300 text-[10px]">📘 使用レベル：{tech.level}</p>
							<div class="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- 右カラム: タイムライン (スクロール可能) -->
		<div class="mt-6 md:mt-0 md:ml-8 md:w-2/3">
			<ScrollArea class="md:h-[30rem] h-72  w-full overflow-y-auto border rounded-md p-4">
				<div class="space-y-4 pl-4 -mb-10">
					<Timeline order="default">
						{#each profile.details as detail}
							<TimelineItem title={detail.title} date={detail.date}>
								<svelte:fragment slot="icon">
									<span class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
										<CalendarWeekSolid class="w-4 h-4 text-primary-600 dark:text-primary-400" />
									</span>
								</svelte:fragment>
								<p class="text-base font-normal text-gray-500 dark:text-gray-400 -mb-5">
									{@html detail.description.replace(/\n/g, '<br>')}
								</p>
								<Separator class="my-2" />
							</TimelineItem>
						{/each}
					</Timeline>
				</div>
			</ScrollArea>
		</div>
	</CardContent>
</Card>