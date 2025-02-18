<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-svelte';

	const socialLinks = [
		{ name: 'Twitter', url: 'https://x.com/WakamiyaYuma', icon: Twitter, color: 'bg-blue-400' },
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/yuma.wakamiya',
			icon: Facebook,
			color: 'bg-blue-800'
		},
		{
			name: 'GitHub',
			url: 'https://github.com/small-engineer',
			icon: Github,
			color: 'bg-gray-400'
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/yuma-wakamiya/',
			icon: Linkedin,
			color: 'bg-blue-600'
		}
	];
</script>

<Card
	class=" card-size mx-auto min-h-[600px] border border-white bg-gray-800/80 shadow-xl backdrop-blur-2xl transition-transform duration-300 md:min-h-[420px]"
	style="backdrop-filter: blur(10px);"
>
	<CardContent class="flex flex-col items-center space-y-4 p-6">
		<h2 class="text-3xl font-extrabold text-white">SNS Links</h2>
		<div class="grid w-full grid-cols-2 gap-3">
			{#each socialLinks as link}
				<a href={link.url} target="_blank" class="w-full" on:click|stopPropagation>
					<Button
						class="flex w-full items-center justify-center gap-2 text-white  {link.color} hover:opacity-80"
					>
						<svelte:component this={link.icon} class="h-5 w-5" />
						{link.name}
					</Button>
				</a>
			{/each}
		</div>
	</CardContent>
</Card>
