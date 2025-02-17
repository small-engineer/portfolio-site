<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";

	export let cards: number[];
	export let labels: string[];
	export let onSelect: (id: number) => void;
</script>

<!-- スマホ（小さい画面）ではDropdownを使い、PCでは通常のリストを表示 -->
<div class="w-full flex justify-center border-gray-300 border bg-black/70 rounded-xl duration-300 shadow-2xl md:p-5 backdrop-blur-lg ">
	<!-- PC向け: ボタン一覧 -->
	<ul class="hidden md:flex flex-col items-center list-none p-0 m-0">
		{#each cards as cardId}
                <li >
                    <button
                        type="button"
                        on:click={() => onSelect(cardId)}
                        class="cursor-pointer transition-colors
                            mx-2 my-0 md:mx-0 md:my-2
                            p-2 md:p-4
                            bg-black/40 shadow-xl rounded-xl border border-gray-300 text-white backdrop-blur-lg
                            hover:bg-gray-800/80 duration-300"
                    >
                        {labels[cardId]}
                    </button>
                </li>
		{/each}
	</ul>


    <!-- スマホ向け: DropdownMenu -->
    <div class="md:hidden relative w-full">
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
                <Button builders={[builder]} variant="outline" 
                    class=" text-white">
                    カード一覧
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content 
                class="w-56 text-white bg-black/60 border border-black shadow-xl rounded-xl 
                    backdrop-blur-lg absolute mt-2">
                <DropdownMenu.Group>
                    {#each cards as cardId}
                        <DropdownMenu.Item on:click={() => onSelect(cardId)}
                            class="hover:bg-gray-800 p-2">
                            {labels[cardId]}
                        </DropdownMenu.Item>
                    {/each}
                </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>

</div>
