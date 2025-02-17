<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const x = new Tween(0, { duration: 300, easing: cubicOut });
	const y = new Tween(0, { duration: 300, easing: cubicOut });
	
	let isPointer = false;

	onMount(() => {
		const handleMouseMove = (event: MouseEvent) => {
			x.target = event.clientX;
			y.target = event.clientY;
			
			const target = event.target as HTMLElement;
			isPointer = !!target.closest('a, button, [data-cursor-pointer]');
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<style>
	:global(*),
	:global(*::before),
	:global(*::after) {
		cursor: none !important;
	}

	.cursor {
		position: fixed;
        display: none;
		width: 10px;
		height: 10px;
		background-color: #fafafa;
		mix-blend-mode: difference;
		border-radius: 50%;
		pointer-events: none;
		transform: translate(-50%, -50%);
		z-index: 9999;
		transition: background-color 0.3s, mix-blend-mode 0.3s;
	}

	.cursor.pointer {
		background-color: white;
		mix-blend-mode: difference;
	}

    @media (pointer: fine) {
        .cursor {
            display: block;
        }
    }
</style>

<div
	class="cursor"
	class:pointer={isPointer}
	style="left: {x.current}px; top: {y.current}px;"
></div>
