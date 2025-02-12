<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import CardOne from '$lib/CardOne.svelte';
	import CardSNS from '$lib/CardSNS.svelte';
	import CardKalytero from '$lib/CardKalytero.svelte';
	import CardGakuyukai from '$lib/CardGakuyukai.svelte';
	import CardPemdemy from '$lib/CardPemdemy.svelte';

	/**
	 * カードの順序を管理する配列
	 * クリックで順番を入れ替え、最後まで行ったら先頭に戻す
	 */
	let cards = [0, 1, 2, 3,4];

	/**
	 * 各カードの初期位置を GSAP でセット（2枚目までずらす）
	 */
	onMount(() => {
		cards.forEach((id, index) => {
			const el = document.getElementById(`card-${id}`);
			if (el) {
				gsap.set(el, { x: index < 3 ? index * 10 : 0, y: index < 3 ? index * 10 : 0 });
			}
		});
	});

		/**
	 * クリック時のアニメーション
	 */
	function handleCardClick(cardId: number): void {
		// クリックしたカードが一番上のカードでない場合は処理しない
		if (cardId !== cards[0]) return;
		const cardEl = document.getElementById(`card-${cardId}`);
		if (!cardEl) return;

		// 画面幅が768px未満の場合はスマホと判断
		const isMobile: boolean = window.innerWidth < 768;

		// スマホの場合は横方向、PCの場合は上方向にずらす
		const tweenProps = isMobile ? { x: 330 } : { y: -350 };

		gsap.timeline({
			immediateRender: false,
			onComplete: () => {
				setTimeout(() => {
					// 先頭カードを末尾に移動
					cards = [...cards.slice(1), cards[0]];

					// 2枚目までオフセットを適用し、それ以降は固定
					cards.forEach((id, index) => {
						const el = document.getElementById(`card-${id}`);
						if (el) {
							gsap.to(el, {
								x: index < 3 ? index * 10 : 0,
								y: index < 3 ? index * 10 : 0,
								duration: 0.8,
								ease: 'power2.inOut',
								immediateRender: false
							});
						}
					});
				}, 100);
			}
		}).to(cardEl, {
			...tweenProps,
			duration: 0.4,
			ease: 'power2.out',
			immediateRender: false
		});
	}
</script>

<!-- メインレイアウト -->
<div
	class="flex items-center justify-center min-h-screen "
>
	<!-- カードスタック用コンテナ（3D 表現用の perspective を設定） -->
	<div class="relative w-[90%] h-[600px] md:w-[910px] md:h-[550px] perspective-container backdrop-blur-3xl">
		{#each cards as cardId (cardId)}
			<div
				id="card-{cardId}"
				class="absolute top-0 left-0 w-[90%] h-[600px] md:w-[910px] md:h-[550px] cursor-pointer"
				on:click={() => handleCardClick(cardId)}
				style="z-index: {3 - cards.indexOf(cardId)};"
			>
				{#if cardId === 0}
					<CardOne />
				{:else if cardId === 1}
					<CardSNS />
				{:else if cardId === 2}
					<CardKalytero />
				{:else if cardId === 3}
					<CardGakuyukai />
				{:else}
					<CardPemdemy />
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
