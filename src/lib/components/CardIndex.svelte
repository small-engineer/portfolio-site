<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	export let cards: number[];
	export let labels: string[];
	export let onSelect: (id: number) => void;
</script>

<!-- 
  画面サイズが md 未満 (モバイル) のとき:
    - fixed で画面上部にピタッと固定 (top-0 left-0 w-full)
    - z-50 で前面に配置

  画面サイズが md 以上 (PC) のとき:
    - position: static (自動配置)
    - md:p-5 や md:w-auto などで通常レイアウト
-->
<div
	class="
    fixed
    top-1
    left-1 z-50 flex min-w-28
    rounded-xl
    border
    border-white bg-gray-900/80
    p-0 shadow-2xl
    backdrop-blur-2xl
    duration-300
    md:static
    md:w-auto
    md:p-5
  "
>
	<!-- PC向け: ボタン一覧 -->
	<ul class="m-0 hidden list-none flex-col items-center p-0 md:flex">
		{#each cards as cardId}
			<li>
				<button
					type="button"
					on:click={() => onSelect(cardId)}
					class="
            mx-0 my-0 cursor-pointer
            rounded-xl border border-white bg-gray-900/80
            p-2 text-center
            text-white shadow-xl
            backdrop-blur-2xl
            transition-colors
            duration-300 hover:bg-gray-800/80
            md:mx-0
            md:my-2
            md:p-4
          "
				>
					{labels[cardId]}
				</button>
			</li>
		{/each}
	</ul>

	<!-- スマホ向け: DropdownMenu -->
	<div class="relative md:hidden">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" class="border-0 text-white ">
					カード一覧
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="@-2 rounded-xl bg-black/80 text-white shadow-xl">
				<DropdownMenu.Group>
					{#each cards as cardId}
						<DropdownMenu.Item
							on:click={() => onSelect(cardId)}
							class="w-full text-left hover:bg-gray-700"
						>
							{labels[cardId]}
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
