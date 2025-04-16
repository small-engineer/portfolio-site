<script lang="ts">
	import CardOne from '$lib/card/CardOne.svelte';
	import { onMount } from 'svelte';
	import CardSNS from '$lib/card/CardSNS.svelte';
	import CardPortfolio from '$lib/card/CardPortfolio.svelte';
	import CardKalytero from '$lib/card/CardKalytero.svelte';
	import CardGakuyukai from '$lib/card/CardGakuyukai.svelte';
	import CardPemdemy from '$lib/card/CardPemdemy.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Background from '$lib/components/Background.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Fotter from '$lib/components/Footer.svelte';

	const cardComponents = [CardOne, CardPortfolio, CardSNS, CardKalytero, CardGakuyukai, CardPemdemy];

	const bgImages = ['/bg1.webp', '/bg2.webp','/bg1.webp','/kalytero.webp', '/gakuyukai.webp', '/pemdemy.webp'];

	const cardLabels = ['自己紹介', 'SNSリンク', 'Kalytero', '学友会', 'Pemdemy', 'ポートフォリオ'];

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

<svelte:head>
    <title>若宮 佑真 | Wakamiya Yuma</title>
    <meta name="description" content="若宮 佑真 (Wakamiya Yuma) のプロフィールサイト">
    <meta name="keywords" content="若宮佑真, Wakamiya Yuma, キーワード3">
    <meta property="og:title" content="若宮 佑真 (Wakamiya Yuma) のプロフィールサイト">
    <meta property="og:description" content="若宮 佑真 (Wakamiya Yuma) のプロフィールサイト">
    <meta property="og:image" content="/site-image.jpeg">
    <meta property="og:url" content="https://wakamiya.blog">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="若宮 佑真 (Wakamiya Yuma) のプロフィールサイト">
    <meta name="twitter:description" content="若宮 佑真 (Wakamiya Yuma) のプロフィールサイト">
    <meta name="twitter:image" content="/site-image.jpeg">
	<link rel="icon" href="" type="image/x-icon">
</svelte:head>


<Cursor />
<Background />

<div class="relative z-10">
	<Stack {cardComponents} {cardLabels} backgroundImages={bgImages} />
</div>

<Fotter />
