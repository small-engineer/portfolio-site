<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import CardIndex from '$lib/components/CardIndex.svelte';

	// グローバルストアをインポート
	import { backgroundUrl } from '$lib/stores';

	// 親からカードのコンポーネント配列、ラベル配列、背景画像配列を受け取る
	export let cardComponents: any[];
	export let cardLabels: string[];
	export let backgroundImages: string[];

	/**
	 * 各カードに割り当てる静的なIDの配列を生成する
	 * 例: [0, 1, 2, ...]
	 */
	const staticCards: number[] = cardComponents.map((_, i) => i);

	// カードの表示順序（初期状態は静的な順序）
	let cards: number[] = [...staticCards];

	// 再クリックまでの待機時間（ミリ秒）
	const RECLICK_DELAY_MS: number = 450;

	// アニメーション中かどうかのフラグ
	let isAnimating: boolean = false;

	onMount(() => {
		// 初期状態として、"一番上のカード" に対応する背景を適用
		if (cards.length > 0) {
			backgroundUrl.set(backgroundImages[cards[0]] || '');
		}

		// 各カードの初期位置設定
		cards.forEach((id, index) => {
			const el = document.getElementById(`card-${id}`);
			if (el) {
				gsap.set(el, {
					x: index < 3 ? index * 10 : 0,
					y: index < 3 ? index * 10 : 0
				});
			}
		});
	});

	function handleCardClick(cardId: number) {
		// アニメーション中 or 最上位カードでないなら無視
		if (isAnimating || cardId !== cards[0]) return;

		const cardEl = document.getElementById(`card-${cardId}`);
		if (!cardEl) return;

		isAnimating = true;
		const isMobile = window.innerWidth < 768;
		const tweenProps = isMobile ? { x: 330 } : { y: -430 };

		gsap
			.timeline({
				onStart: () => {
					cardEl.style.pointerEvents = 'none';
				},
				immediateRender: false,
				onComplete: () => {
					setTimeout(() => {
						cards = [...cards.slice(1), cards[0]];

						requestAnimationFrame(() => {
							backgroundUrl.set(backgroundImages[cards[0]] || '');
						});

						adjustCardPositions();
						setTimeout(() => {
							isAnimating = false;
						}, RECLICK_DELAY_MS);
					}, 100);
				}
			})
			.to(cardEl, {
				...tweenProps,
				duration: 0.4,
				ease: 'power2.out',
				immediateRender: false
			});
	}

	function handleIndexSelect(cardId: number) {
		if (isAnimating) return;
		isAnimating = true;

		const idx = cards.indexOf(cardId);
		if (idx < 0) {
			isAnimating = false;
			return;
		}
		if (idx === 0) {
			// 既に最上位カードなら軽いシェイクのみ
			const cardEl = document.getElementById(`card-${cardId}`);
			if (cardEl) {
				gsap.to(cardEl, {
					x: '+=7',
					duration: 0.12,
					yoyo: true,
					repeat: 3,
					ease: 'power1.inOut'
				});
			}
			isAnimating = false;
			return;
		}

		const isMobile = window.innerWidth < 768;
		const tweenProps = isMobile ? { x: 330 } : { y: -430 };
		const aboveCards = cards.slice(0, idx);
		const els = aboveCards.map((cid) => document.getElementById(`card-${cid}`)).filter(Boolean);

		gsap
			.timeline({
				immediateRender: false,
				onStart: () => {
					els.forEach((el) => {
						(el as HTMLElement).style.pointerEvents = 'none';
					});
				},
				onComplete: () => {
					requestAnimationFrame(() => {
						setTimeout(() => {
							const selectedCard = cards[idx];
							const otherCards = cards.filter((id) => id !== selectedCard);
							cards = [selectedCard, ...otherCards];
							// 新しい先頭のカード背景に差し替え
							requestAnimationFrame(() => {
								backgroundUrl.set(backgroundImages[cards[0]] || '');
							});

							aboveCards.forEach((cid) => {
								const el = document.getElementById(`card-${cid}`);
								if (el) el.style.zIndex = '';
							});
							adjustCardPositions();

							setTimeout(() => {
								isAnimating = false;
							}, RECLICK_DELAY_MS);
						});
					});
				}
			})
			.to(els, {
				...tweenProps,
				duration: 0.4,
				ease: 'power2.out',
				stagger: 0.1,
				immediateRender: false
			});
	}

	function adjustCardPositions() {
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
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-2 md:flex-row md:gap-6">
	<!-- 目次表示 -->
	<div>
		<CardIndex cards={staticCards} labels={cardLabels} onSelect={handleIndexSelect} />
	</div>

	<!-- カードスタック用コンテナ -->
	<div class="perspective-container relative h-[600px] w-[90%] md:h-[420px] md:w-[910px]">
		<div class="backdrop-blur-3xl">
			{#each cards as cardId (cardId)}
				<div
					id="card-{cardId}"
					class="absolute top-0 left-0 h-[600px] w-[90%] cursor-pointer md:h-[420px] md:w-[910px]"
					on:click={() => handleCardClick(cardId)}
					on:keydown={(e) => e.key === 'Enter' && handleCardClick(cardId)}
					role="button"
					tabindex="0"
					style="z-index: {cards.length - cards.indexOf(cardId)};"
				>
					<svelte:component this={cardComponents[cardId]} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.perspective-container {
		perspective: 600px;
		transform-style: preserve-3d;
	}
</style>
