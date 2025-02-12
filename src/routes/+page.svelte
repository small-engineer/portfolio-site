<script lang="ts">
	import Stack from '$lib/Stack.svelte';
	import Background from '$lib/Background.svelte';
</script>

<!-- 背景コンポーネント -->
<Background />

<!-- コンテンツ部分。relative と z-index で背景の上に表示 -->
<div class="relative z-10 ">
	<Stack />
</div>
