<script lang="ts">
    import { flip } from "svelte/animate";
    import { fade, fly } from "svelte/transition";
    import FilterTabs from "./FilterTabs.svelte";
    import ProjectCard from "./ProjectCard.svelte";
    import ScrollReveal from "./ScrollReveal.svelte";
    import type { Project, FilterCategory } from "../data/projects";

    export let projects: Project[];

    let activeFilter: FilterCategory = "all";

    $: filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter((p) => p.filterCategory === activeFilter);

    function handleFilterChange(filter: FilterCategory) {
        activeFilter = filter;
    }
</script>

<div class="flex flex-col gap-8">
    <FilterTabs {activeFilter} onFilterChange={handleFilterChange} />

    <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2"
    >
        {#each filteredProjects as project (project.name)}
            <div
                animate:flip={{ duration: 600 }}
                out:fade={{ duration: 200 }}
                in:fade={{ duration: 400 }}
            >
                <ScrollReveal>
                    <ProjectCard {project} />
                </ScrollReveal>
            </div>
        {/each}
    </div>
</div>
