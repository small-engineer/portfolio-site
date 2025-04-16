<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Menu } from 'lucide-svelte';

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
		top-0
		left-0
		z-50
		flex
		w-auto
		p-2
	"
>
	<!-- スマホ向け: DropdownMenu -->
	<div class="">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" class="border-0 text-white">
					<Menu class="w-10 h-10" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="@-2 rounded-xl border border-white bg-gray-900/80 backdrop-blur-xl text-white">
				<DropdownMenu.Group>
					{#each cards as cardId}
						<DropdownMenu.Item
							on:click={() => onSelect(cardId)}
							class="w-full text-left hover:bg-gray-700/80"
						>
							{labels[cardId]}
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>

</div>
