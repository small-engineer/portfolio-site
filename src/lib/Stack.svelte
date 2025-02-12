<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import CardOne from '$lib/CardOne.svelte';
	import CardTwo from '$lib/CardTwo.svelte';
	import CardThree from '$lib/CardThree.svelte';

	/**
	 * カードの順序を管理する配列
	 * クリックで順番を入れ替え、最後まで行ったら先頭に戻す
	 */
	let cards = [0, 1, 2];

	/**
	 * 各カードの初期位置（x, y オフセット）を GSAP でセットする
	 */
	onMount(() => {
		cards.forEach((id, index) => {
			const el = document.getElementById(`card-${id}`);
			if (el) {
				gsap.set(el, { x: index * 20, y: index * 10 });
			}
		});
	});

	/**
	 * トップカード（常に cards[0]）がクリックされたときのアニメーションと順序入れ替えを実行する
	 *
	 * @param cardId - クリックされたカードの ID (0, 1, 2)
	 */
	function handleCardClick(cardId: number): void {
		// クリック可能なのは常に最前面のカードのみ
		if (cardId !== cards[0]) return;
		const cardEl = document.getElementById(`card-${cardId}`);
		if (!cardEl) return;

		gsap
			.timeline({
				immediateRender: false, // 不要なレンダリングを抑制
				onComplete: () => {
					// アニメーション完了後、100ms 程度待ってから順序入れ替え＆再配置を実行
					setTimeout(() => {
						// 先頭カードを末尾に回す（カード順序の更新）
						cards = [...cards.slice(1), cards[0]];

						// 新しい順序に合わせ、各カードの x, y オフセットを滑らかに再配置する
						cards.forEach((id, index) => {
							const el = document.getElementById(`card-${id}`);
							if (el) {
								gsap.to(el, {
									x: index * 20,
									y: index * 10,
									duration: 0.8,
									ease: 'power2.inOut',
									immediateRender: false
								});
							}
						});
					}, 100);
				}
			})
			// (1) トップカードを右方向へ滑らかに移動（引き抜く動き）
			.to(cardEl, {
				x: 350,
				duration: 0.5,
				ease: 'power2.out',
				immediateRender: false
			})
			// (2) その後、下方向へ滑らかに移動し、スタックの下に挟む
			.to(cardEl, {
				y: 50,
				duration: 0.4,
				ease: 'power2.inOut',
				immediateRender: false
			});
	}
</script>

<!-- メインレイアウト -->
<div
	class="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary-300 to-purple-600"
>
	<!-- カードスタック用コンテナ（3D 表現用の perspective を設定） -->
	<div class="relative w-72 h-96 perspective-container">
		{#each cards as cardId (cardId)}
			<div
				id="card-{cardId}"
				class="absolute top-0 left-0 w-72 h-96 cursor-pointer"
				on:click={() => handleCardClick(cardId)}
				style="z-index: {3 - cards.indexOf(cardId)};"
			>
				{#if cardId === 0}
					<CardOne />
				{:else if cardId === 1}
					<CardTwo />
				{:else}
					<CardThree />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	/**
   * 3D 表現のための perspective 設定
   */
	.perspective-container {
		perspective: 800px;
		transform-style: preserve-3d;
	}
</style>
