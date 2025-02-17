<script lang="ts">
	/**
	 * 目次として表示するコンポーネント
	 * - props:
	 *   - cards: number[]  → カードID配列
	 *   - labels: string[] → 各IDに対応するラベル文字列
	 *   - onSelect: (id: number) => void → 親にカードIDを返すコールバック
	 */
	export let cards: number[];
	export let labels: string[];
	export let onSelect: (id: number) => void;
</script>

<!-- 
  ul の flex の方向を、スマホでは横並び（flex-row）、PC（md:）では縦並び（flex-col）に変更
-->
<ul class="flex flex-row md:flex-col items-center justify-center list-none p-0 m-0">
	{#each cards as cardId}
		<button
			type="button"
			on:click={() => onSelect(cardId)}
			class="cursor-pointer transition-colors
				   mx-2 my-0 md:mx-0 md:my-2
				   p-2 md:p-4
				   bg-gray-200 md:bg-white md:shadow-md md:rounded-lg
				   hover:bg-gray-300 md:hover:bg-gray-100"
		>
			{labels[cardId]}
		</button>
	{/each}
</ul>
