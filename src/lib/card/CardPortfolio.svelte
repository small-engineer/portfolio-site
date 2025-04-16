<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { ExternalLink } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const projects = [
		{
			title: 'ポートフォリオサイト',
			description:
				'Svelte と GSAP を用いて構築したポートフォリオサイト。自己紹介や技術スタック、プロジェクト紹介を行う。画像のプリロードやアニメーション効果により、ユーザー体験を向上。',
			images: ['/images/wakamiya-blog.webp'],
			url: 'https://wakamiya.blog/',
			github: 'https://github.com/small-engineer/portfolio-site',
			tech: ['svelte', 'typescript', 'tailwindcss', 'cloudflare']
		},
		{
			title: 'Kalytero 公式ホームページ',
			description:
				'合同会社Kalyteroの公式サイト。HugoとTailwind CSSにより高速かつ柔軟なUIを実現し、Cloudflare Pagesにより自動デプロイを行う構成。事業紹介・問い合わせ機能・ブログ機能を備える。',
			images: ['/images/kalytero.webp', '/images/kalytero2.webp', '/images/kalytero3.webp'],
			url: 'https://www.kalytero.ne.jp/',
			tech: ['hugo', 'typescript', 'tailwindcss', 'cloudflare']
		},
		{
			title: '社内業務システム',
			description:
				'社内向けの業務管理システム。Next.js、Prisma、PostgreSQL（RDS）を用いて開発。顧客管理、ユーザー管理、プロジェクト進行管理、経費精算などの機能を備えたフルスタック構成。',
			images: ['/images/portal-kalytero.webp'],
			url: 'https://portal.kalytero.ne.jp',
			tech: ['nextdotjs', 'prisma', 'postgresql', 'css', 'railway']
		},
		{
			title: 'Small Engineer Net',
			description:
				'技術者向け情報発信メディア。HugoとThree.jsによる3D演出を組み込み、技術記事・チュートリアルページを実装',
			images: ['/images/small-engineer-net.webp'],
			url: 'https://www.small-engineer.net/',
			github: 'https://github.com/small-engineer/portfolio',
			tech: ['hugo', 'typescript', 'threedotjs', 'tailwindcss', 'cloudflare']
		},
		{
			title: 'iU 学友会ポータル',
			description:
				'情報経営イノベーション専門職大学（iU）の学友会ポータルサイト。学生主体で構築し、イベント情報、学内のFAQ、連絡フォームなどを集約。Hugoベースで保守性にも配慮。',
			images: ['/images/i-u-io.webp'],
			url: 'https://i-u.io/',
			github: 'https://github.com/iU-Alumni-Association/i-u-io',
			tech: ['hugo', 'typescript', 'tailwindcss', 'cloudflare']
		},
		{
			title: '42Tokyo 起業部',
			description:
				'42Tokyo内の起業部によるナレッジ共有サイト。活動レポート、イベント情報。Hugoで実装し、Tailwind CSSとCloudflareにより高速な表示を実現。',
			images: ['/images/42entre.webp'],
			url: 'https://entrepreneur.42tokyo.jp/',
			github: 'https://github.com/42TokyoEntrepreneur/home-page',
			tech: ['hugo', 'typescript', 'tailwindcss', 'cloudflare']
		}
	];

	let imageIndexes: number[] = Array(projects.length).fill(0);

	onMount(() => {
		const interval = setInterval(() => {
			imageIndexes = imageIndexes.map((i, idx) =>
				projects[idx].images.length > 1 ? (i + 1) % projects[idx].images.length : 0
			);
		}, 1000);

		return () => clearInterval(interval);
	});

	function getIconUrl(slug: string): string {
		return slug.startsWith('http') || slug.startsWith('/')
			? slug
			: `https://cdn.simpleicons.org/${slug}/ffffff`;
	}
</script>

<Card
	class="mx-auto min-h-[600px] rounded-xl border border-white bg-gray-800/80 shadow-xl backdrop-blur-2xl transition-transform duration-300 md:min-h-[500px]"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="flex h-full flex-col p-6">
		<h2 class="mb-4 text-2xl font-bold text-white">開発ポートフォリオ</h2>

		<ScrollArea class="flex-1">
			<div class="space-y-6">
				{#each projects as proj, i}
					<div class="flex flex-col overflow-hidden rounded-lg bg-gray-700/50 md:flex-row">
						<div class="aspect-[16/9] w-full bg-black md:w-[400px]">
							<img
								src={proj.images[imageIndexes[i]]}
								alt={proj.title}
								class="h-full w-full object-cover transition-opacity duration-500"
							/>
						</div>
						<div class="flex flex-1 flex-col p-4 md:p-6">
							<h3 class="text-lg font-semibold text-white">{proj.title}</h3>
							<p class="mt-3 flex-1 text-sm text-gray-300">{proj.description}</p>
							<div class="mt-4 flex flex-wrap gap-2">
								{#if proj.tech}
									{#each proj.tech as slug}
										<img src={getIconUrl(slug)} alt={slug} title={slug} class="h-4 w-4" />
									{/each}
								{/if}
							</div>

							<!-- ボタン：行間＆間隔をやや広めに -->
							{#if proj.github || proj.url}
								<div class="mt-5 flex flex-wrap gap-3">
									{#if proj.github}
										<a
											href={proj.github}
											target="_blank"
											rel="noopener"
											class="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-black shadow-sm transition hover:bg-gray-200"
										>
											<img
												src="https://cdn.simpleicons.org/github/000000"
												alt="GitHub"
												class="h-4 w-4"
											/>
											GitHub
										</a>
									{/if}

									{#if proj.url}
										<a
											href={proj.url}
											target="_blank"
											rel="noopener"
											class="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-black shadow-sm transition hover:bg-gray-200"
										>
											<ExternalLink class="h-4 w-4" />
											サイトを見る
										</a>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</ScrollArea>
	</CardContent>
</Card>
