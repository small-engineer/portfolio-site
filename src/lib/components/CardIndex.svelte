<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";

	export let cards: number[];
	export let labels: string[];
	export let onSelect: (id: number) => void;
</script>

<!-- 
  画面サイズが md 未満 (モバイル) のとき:
    - fixed で画面上部にピタッと固定 (top-0 left-0 w-full)
    - z-50 で前面に配置

  画面サイズが md 以上 (PC) のとき:
    - position: static (自動配置)
    - md:p-5 や md:w-auto などで通常レイアウト
-->
<div
  class="
    md:static 
    md:w-auto
    fixed top-1 left-1 min-w-28
    z-50
    flex
    border-gray-300 border
    bg-black/90
    rounded-xl
    duration-300
    shadow-2xl
    p-0
    md:p-5
    backdrop-blur-xl
  "
>
  <!-- PC向け: ボタン一覧 -->
  <ul class="hidden md:flex flex-col items-center list-none p-0 m-0">
    {#each cards as cardId}
      <li>
        <button
          type="button"
          on:click={() => onSelect(cardId)}
          class="
            cursor-pointer transition-colors text-center
            mx-0 my-0 md:mx-0 md:my-2
            p-2 md:p-4
            bg-black/40
            shadow-xl
            rounded-xl
            border border-gray-300
            text-white
            backdrop-blur-lg
            hover:bg-gray-800/80
            duration-300
          "
        >
          {labels[cardId]}
        </button>
      </li>
    {/each}
  </ul>

  <!-- スマホ向け: DropdownMenu -->
  <div class="md:hidden relative">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" class="text-white border-0 ">
          カード一覧
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="bg-black/80 rounded-xl shadow-xl text-white @-2"
      >
        <DropdownMenu.Group>
          {#each cards as cardId}
            <DropdownMenu.Item
              on:click={() => onSelect(cardId)}
              class="hover:bg-gray-800 w-full text-left"
            >
              {labels[cardId]}
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</div>
