<script lang="ts">
	/**
	 * +page.svelte:
	 * SvelteKit のトップレベルページとして機能し、
	 * Stack.svelte（カードスタック UI）を呼び出す。
	 */

	// Stack コンポーネントをインポート
	import Stack from '$lib/Stack.svelte';
</script>

<!-- 
  Google 方式コメント:
  メインページのレイアウト。ここでは最小限の例として、
  ただちに Stack コンポーネントを配置している。
  Tailwind によりスクリーンサイズを占有させるなどを行う。
-->
<div class="w-full h-screen bg-gray-100">
	<!-- カードスタックを表示 -->
	<Stack />
</div>
