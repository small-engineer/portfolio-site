<script lang="ts">
	/**
	 * @fileoverview カード目次をドロップダウン形式で表示する UI コンポーネント。
	 * モバイル端末向けに、カードラベルをリスト表示し、選択時にコールバックを実行する。
	 */
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Menu } from 'lucide-svelte';

	/**
	 * 表示するカードIDの配列。
	 * @type {!Array<number>}
	 * @export
	 */
	export let cards: number[];

	/**
	 * カードに対応するラベル名の配列。
	 * @type {!Array<string>}
	 * @export
	 */
	export let labels: string[];

	/**
	 * カードが選択されたときに呼び出されるコールバック関数。
	 *
	 * @param {number} id 選択されたカードのID。
	 * @return {void}
	 * @export
	 */
	export let onSelect: (id: number) => void;
</script>

<div class="fixed top-0 left-0 z-50 flex w-auto p-2">
	<!-- スマホ向け: DropdownMenu -->
	<div class="">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" class="border-0 text-white">
					<Menu class="h-10 w-10" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="@-2 rounded-xl border border-white bg-gray-900/80 text-white backdrop-blur-xl"
			>
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
