<script lang="ts">
	// 必要なコンポーネント・アイコンのインポート
	import { Button } from "$lib/components/ui/button";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Github, Linkedin, Twitter, Instagram, Facebook } from "lucide-svelte";

	// 定数としてSNSリンク設定
	const socialLinks = [
		{ name: "Twitter", url: "https://x.com/WakamiyaYuma", icon: Twitter, color: "bg-blue-400" },
		{ name: "GitHub", url: "https://github.com/small-engineer", icon: Github, color: "bg-gray-400" },
		{ name: "LinkedIn", url: "https://www.linkedin.com/in/yuma-wakamiya/", icon: Linkedin, color: "bg-blue-600" },
		{ name: "Facebook", url: "https://www.facebook.com/yuma.wakamiya", icon: Facebook, color: "bg-blue-800" }
	];
</script>

<Card class="min-h-80 bg-gray-800/80 mx-auto shadow-xl transition-transform duration-300 card-size"
      style="backdrop-filter: blur(10px);">
	<CardContent class="flex flex-col items-center p-6 space-y-4">
		<!-- カードタイトル -->
		<h2 class="text-3xl font-extrabold text-white">
			SNS Links
		</h2>

		<!-- SNSボタン群 -->
		<div class="grid grid-cols-2 gap-3 w-full">
			{#each socialLinks as link}
				<a href={link.url} target="_blank" class="w-full" on:click|stopPropagation>
					<Button class="w-full flex items-center justify-center gap-2 text-white  {link.color} hover:opacity-80">
						<svelte:component this={link.icon} class="w-5 h-5" />
						{link.name}
					</Button>
				</a>
			{/each}
		</div>
	</CardContent>
</Card>