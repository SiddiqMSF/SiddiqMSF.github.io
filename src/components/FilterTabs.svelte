<script lang="ts">
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { Button } from "$lib/components/ui/button";
  import type { FilterCategory } from "../data/projects";

  export let activeFilter: FilterCategory = 'all';
  export let onFilterChange: (filter: FilterCategory) => void;

  const categories: { label: string; value: FilterCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Public', value: 'public' },
    { label: 'Prototypes', value: 'prototypes' },
    { label: 'Internal', value: 'internal' },
    { label: 'Archived', value: 'archived' },
  ];
</script>

<div class="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth lg:flex-wrap">
  {#each categories as category (category.value)}
    <Button
      variant={activeFilter === category.value ? "default" : "outline"}
      size="sm"
      class="rounded-full px-6 transition-all duration-300"
      on:click={() => onFilterChange(category.value)}
    >
      {category.label}
    </Button>
  {/each}
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
