<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  export let delay = 0;
  
  let visible = false;
  let element: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            visible = true;
          }, delay);
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<div bind:this={element} class="h-full">
  {#if visible}
    <div in:fly={{ y: 50, duration: 800, opacity: 0 }} class="h-full">
      <slot />
    </div>
  {:else}
    <div class="h-full opacity-0">
      <slot />
    </div>
  {/if}
</div>
