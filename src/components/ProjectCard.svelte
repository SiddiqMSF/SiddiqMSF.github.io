<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import * as Card from "$lib/components/ui/card";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import type { Project } from "../data/projects";

  export let project: Project;

  let isOpen = false;

  function toggleOpen() {
    if (!project.disabled) {
      isOpen = !isOpen;
    }
  }

  // Tag color mapping (replicated from StatusBadge.astro)
  const tagStyles: Record<string, string> = {
    PUBLIC: "bg-primary/20 text-primary border-primary/30",
    ONGOING: "bg-primary/20 text-primary border-primary/30",
    BETA: "bg-primary/20 text-primary border-primary/30",
    PAUSED: "bg-warning/20 text-warning border-warning/30",
    PROTOTYPE: "bg-warning/20 text-warning border-warning/30",
    DEPRECATED: "bg-destructive/20 text-destructive border-destructive/30",
    ARCHIVED: "bg-muted text-muted-foreground border-muted-foreground/20",
    INTERNAL: "bg-secondary text-secondary-foreground border-border",
    PRIVATE: "bg-secondary text-secondary-foreground border-border",
  };
</script>

<div class="group h-full">
  <Card.Root
    class="glass-card flex h-full flex-col overflow-hidden p-0 gap-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 {project.disabled
      ? 'opacity-70 grayscale pointer-events-none'
      : 'cursor-pointer'}"
    on:click={toggleOpen}
  >
    <div class="aspect-video overflow-hidden">
      <img
        src={`/images/covers/${project.coverImage}`}
        alt={project.name}
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    <Card.Header class="p-6 pb-2">
      <div class="flex flex-wrap gap-2 mb-2">
        {#each project.tags as tag}
          <span
            class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors {tagStyles[
              tag
            ] || 'bg-secondary text-secondary-foreground'}"
          >
            {tag}
          </span>
        {/each}
      </div>
      <Card.Title
        class="text-xl font-bold leading-tight group-hover:text-primary transition-colors"
      >
        {project.name}
      </Card.Title>
    </Card.Header>

    <Card.Content class="px-6 py-2 flex-grow">
      <p class="text-sm text-muted-foreground line-clamp-3">
        {project.description}
      </p>
    </Card.Content>

    <Card.Footer class="p-6 pt-2">
      <div
        class="w-full"
        on:click|stopPropagation={() => {}}
        on:keydown|stopPropagation={() => {}}
        role="presentation"
      >
        <Button
          variant="secondary"
          class="w-full font-bold {project.disabled
            ? 'cursor-not-allowed'
            : ''}"
          disabled={project.disabled}
          href={project.url}
          target="_blank"
        >
          VIEW
        </Button>
      </div>
    </Card.Footer>
  </Card.Root>
</div>

<!-- Detail Dialog -->
<Dialog.Root bind:open={isOpen}>
  <Dialog.Content
    class="sm:max-w-[625px] glass-card border-none bg-background/95 backdrop-blur-xl"
  >
    <Dialog.Header>
      <div class="flex flex-wrap gap-2 mb-4">
        {#each project.tags as tag}
          <span
            class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold {tagStyles[
              tag
            ] || 'bg-secondary text-secondary-foreground'}"
          >
            {tag}
          </span>
        {/each}
      </div>
      <Dialog.Title class="text-3xl font-black tracking-tight"
        >{project.name}</Dialog.Title
      >
      <Dialog.Description
        class="text-lg leading-relaxed text-foreground/80 pt-4"
      >
        {project.description}
      </Dialog.Description>
    </Dialog.Header>
    <div class="mt-6 rounded-xl overflow-hidden border border-white/10">
      <img
        src={`/images/covers/${project.coverImage}`}
        alt={project.name}
        class="w-full aspect-video object-cover"
      />
    </div>
    <Dialog.Footer class="mt-8">
      <Button
        class="w-full sm:w-auto px-12 h-12 text-md font-bold"
        href={project.url}
        target="_blank"
        disabled={project.disabled}
      >
        VISIT PROJECT
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<style>
  :global(.glass-card) {
    background: rgba(23, 29, 30, 0.75) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
  }
</style>
