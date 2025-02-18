<script lang="ts">
	import { Timeline, TimelineItem } from 'flowbite-svelte';
	import { CalendarWeekSolid } from 'flowbite-svelte-icons';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";

	const profile = {
		name: '若宮佑真',
		role: '合同会社Kalytero COO',
		description: 'Do One Thing and Do It Well',
		details: [
			{ title: "42 Tokyo", date: '2024〜2025', description: '' },
			{ title: '情報経営イノベーション専門職大学 中退', date: '2023〜2025', description: '2023年度学友会 自治本部長<br>2024年度学友会' },
			{ title: '合同会社Kalytero', date: '2023〜', description: 'COO' },
			{ title: 'NPO法人Pendemyデジタル教育ラボ', date: '2022〜', description: '旧：Pendemyふちゅう教育ラボ' },
			{ title: 'N高等学校 卒業', date: '2023', description: ''},
			{ title: "株式会社NoSchool", date: '2022〜2023', description: 'インターン生/アルバイト<br>メディア運営、SEOマーケティング'}
		]
	};
</script>

<Card
	class="mx-auto min-h-[600px] rounded-xl border border-white bg-gray-800/80 shadow-xl backdrop-blur-2xl transition-transform duration-300 md:min-h-[420px]"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="flex flex-col items-center p-6 md:flex-row md:items-start">
		<!-- 左カラム: アイコンと名前・役職 -->
		<div class="flex flex-col items-center md:w-1/3 md:items-start">
			<div class="mb-4 flex h-32 w-32 items-center justify-center rounded-full">
				<img src="/prof.webp" alt="Profile" class="h-28 w-28 rounded-full" />
			</div>
			<h2 class="text-2xl font-bold text-white">{profile.name}</h2>
			<p class="mt-1 text-sm text-gray-300">{profile.role}</p>
		</div>

		<!-- 右カラム: タイムライン (スクロール可能) -->
		<div class="mt-6 md:mt-0 md:ml-8 md:w-2/3">
			<p class="text-md mb-4 text-gray-200 italic">{profile.description}</p>

			<ScrollArea class="md:h-80 h-72  w-full overflow-y-auto border rounded-md p-4">
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