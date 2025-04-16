<script lang="ts">
	/**
	 * @fileoverview カードスタック表示とアニメーション制御を行う Svelte コンポーネント。
	 * ユーザーがカードをクリックまたは目次から選択することで、
	 * アニメーションとともに表示されるカードと背景画像が切り替わる。
	 */

	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import CardIndex from '$lib/components/CardIndex.svelte';
	import { backgroundUrl } from '$lib/stores';

	/**
	 * 表示するカードのコンポーネントリスト。
	 * @type {!Array<!any>}
	 * @export
	 */
	export let cardComponents: any[];

	/**
	 * カードに対応するラベル名リスト。
	 * @type {!Array<string>}
	 * @export
	 */
	export let cardLabels: string[];

	/**
	 * カードに対応する背景画像URLのリスト。
	 * @type {!Array<string>}
	 * @export
	 */
	export let backgroundImages: string[];

	/**
	 * 各カードに割り当てる静的なIDの配列。
	 * 例: [0, 1, 2, ...]
	 * @type {!Array<number>}
	 * @const
	 */
	const staticCards: number[] = cardComponents.map((_, i) => i);

	/**
	 * 現在のカード表示順を管理する配列。
	 * @type {!Array<number>}
	 */
	let cards: number[] = [...staticCards];

	/**
	 * 再クリックまでの待機時間（ミリ秒）。
	 * @type {number}
	 * @const
	 */
	const RECLICK_DELAY_MS: number = 450;

	/**
	 * アニメーション中かどうかを示すフラグ。
	 * @type {boolean}
	 * @private
	 */
	let isAnimating: boolean = false;

	onMount(() => {
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

	/**
	 * カードがクリックまたは Enter キーで選択された時の処理。
	 *
	 * @param {!MouseEvent|!KeyboardEvent} event ユーザーのイベント。
	 * @param {number} cardId 対象のカードID。
	 * @return {void}
	 */
	function handleCardClick(event: MouseEvent | KeyboardEvent, cardId: number) {
		// インタラクティブ要素のクリックを除外（マウスイベント時のみチェック）
		if (event instanceof MouseEvent) {
			const target = event.target as HTMLElement;
			const isInteractive = target.closest('button, a, input, textarea, svg, .non-interactive');
			if (isInteractive) return;
		}
		if (event instanceof KeyboardEvent && event.key !== 'Enter') return;
		if (isAnimating || cardId !== cards[0]) return;

		const cardEl = document.getElementById(`card-${cardId}`);
		if (!cardEl) return;

		isAnimating = true;
		const isMobile = window.innerWidth < 768;
		const tweenProps = isMobile ? { x: 330 } : { y: -530 };

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

	/**
	 * カードインデックス（目次）から特定のカードを選択したときの処理。
	 *
	 * @param {number} cardId 選択されたカードのID。
	 * @return {void}
	 */
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
		const tweenProps = isMobile ? { x: 330 } : { y: -530 };
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

	/**
	 * 現在のカードの順序に基づいて、それぞれのカードの位置を調整する。
	 *
	 * @return {void}
	 */
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
	<div class="perspective-container relative min-h-[600px] w-[96%] md:min-h-[500px] md:w-[910px]">
		<div class="backdrop-blur-3xl">
			{#each cards as cardId (cardId)}
				<div
					id="card-{cardId}"
					class="absolute top-0 left-0 h-[600px] w-[96%] cursor-pointer md:h-[420px] md:w-[910px]"
					on:click={(e) => handleCardClick(e, cardId)}
					on:keydown={(e) => handleCardClick(e, cardId)}
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
