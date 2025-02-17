<script lang="ts">
	import CardOne from '$lib/card/CardOne.svelte';
	import CardSNS from '$lib/card/CardSNS.svelte';
	import CardKalytero from '$lib/card/CardKalytero.svelte';
	import CardGakuyukai from '$lib/card/CardGakuyukai.svelte';
	import CardPemdemy from '$lib/card/CardPemdemy.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Background from '$lib/components/Background.svelte';
	import Cursor from '$lib/components/Cursor.svelte';

	// カード用コンポーネントの配列
	const cardComponents = [
		CardOne,
		CardSNS,
		CardKalytero,
		CardGakuyukai,
		CardPemdemy
	];

	// 目次に表示する各カードのラベル
	const cardLabels = ['自己紹介', 'SNSリンク', 'Kalytero', '学友会', 'Pemdemy'];
	
</script>

<Cursor />
<Background />

<div class="relative z-10 ">
	<Stack {cardComponents} {cardLabels} />
</div>
