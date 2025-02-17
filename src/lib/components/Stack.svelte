<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import CardIndex from '$lib/components/CardIndex.svelte';

	// 親からカードのコンポーネント配列とラベル配列を受け取る
	export let cardComponents: any[];
	export let cardLabels: string[];

	/**
	 * 各カードに割り当てる静的なIDの配列を生成する
	 * 例: [0, 1, 2, ...]
	 */
	const staticCards: number[] = cardComponents.map((_, i) => i);

	// カードの表示順序（初期状態は静的な順序）
	let cards: number[] = [...staticCards];

	// 再クリックまでの待機時間（ミリ秒）
	const RECLICK_DELAY_MS: number = 450;

	// アニメーション中かどうかのグローバルロックフラグ
	let isAnimating: boolean = false;

	/**
	 * マウント時に各カードの初期位置を設定する
	 */
	onMount(() => {
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
	 * カードクリック時のアニメーション処理
	 * 最上位のカードのみ処理し、アニメーション後に配列の先頭のカードを末尾へ移動する
	 */
	function handleCardClick(cardId: number) {
		// アニメーション中はクリックを無視
		if (isAnimating) return;
		if (cardId !== cards[0]) return; // 最上位以外は無視

		const cardEl = document.getElementById(`card-${cardId}`);
		if (!cardEl) return;

		// ここでロックをかける
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
					// アニメーション終了後、カードの順番を変更し位置調整
					setTimeout(() => {
						cards = [...cards.slice(1), cards[0]];
						adjustCardPositions();
						// 待機時間後にロック解除
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
	 * 目次クリック時のカード選択アニメーション処理
	 * 選択されたカードより上にあるカード群にアニメーションをかけ、
	 * 選択カードを最上位に移動する
	 */
	function handleIndexSelect(cardId: number) {
		// アニメーション中はクリックを無視
		if (isAnimating) return;
		isAnimating = true;

		const idx = cards.indexOf(cardId);
		if (idx < 0 || idx === 0) {
			// 既に最上位の場合は軽いシェイクアニメーション
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
			// シェイク後はロック解除（シェイク自体は短いため待機なし）
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
							aboveCards.forEach((cid) => {
								const el = document.getElementById(`card-${cid}`);
								if (el) el.style.zIndex = '';
							});
							adjustCardPositions();
							// 待機時間後にロック解除
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
		// ※各カードのpointerEventsの再有効化はアニメーション完了後にまとめて行う
	}

	/**
	 * カードの位置を再調整する関数
	 * 表示順に応じた位置へカードをアニメーションで移動
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

<div class="min-h-screen flex md:flex-row flex-col items-center justify-center gap-6">
	<!-- 目次表示 -->
	<div>
		<CardIndex cards={staticCards} labels={cardLabels} onSelect={handleIndexSelect} />
	</div>

	<!-- カードスタック用コンテナ -->
	<div
		class="relative w-[90%] h-[600px] md:w-[910px] md:h-[420px] perspective-container backdrop-blur-3xl"
	>
		{#each cards as cardId (cardId)}
			<div
				id="card-{cardId}"
				class="absolute top-0 left-0 w-[90%] h-[600px] md:w-[910px] md:h-[420px] cursor-pointer"
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

<style>
	.perspective-container {
		perspective: 600px;
		transform-style: preserve-3d;
	}
</style>
