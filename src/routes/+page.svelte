<script lang="ts">
	import CardOne from '$lib/card/CardOne.svelte';
	import { onMount } from 'svelte';
	import CardSNS from '$lib/card/CardSNS.svelte';
	import CardKalytero from '$lib/card/CardKalytero.svelte';
	import CardGakuyukai from '$lib/card/CardGakuyukai.svelte';
	import CardPemdemy from '$lib/card/CardPemdemy.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Background from '$lib/components/Background.svelte';
	import Cursor from '$lib/components/Cursor.svelte';

	// カード用コンポーネントの配列
	const cardComponents = [CardOne, CardSNS, CardKalytero, CardGakuyukai, CardPemdemy];

	const bgImages = ['/bg1.webp', '/bg2.webp', '/kalytero.webp', '/gakuyukai.webp', '/pemdemy.webp'];

	const cardLabels = ['自己紹介', 'SNSリンク', 'Kalytero', '学友会', 'Pemdemy'];

	async function preloadImages(images: string[]) {
		await Promise.all(
			images.map(
				(src) =>
					new Promise((resolve) => {
						const img = new Image();
						img.src = src;
						img.onload = resolve;
						img.onerror = resolve;
					})
			)
		);
	}

	onMount(() => {
		preloadImages(bgImages);
	});
</script>

<Cursor />
<Background />

<div class="relative z-10">
	<Stack {cardComponents} {cardLabels} backgroundImages={bgImages} />
</div>
