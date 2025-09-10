<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    rating: { type: Number, default: 0 },
    count: { type: Number, default: null },
    hideCount: { type: Boolean, default: false },
    size: { type: Number, default: 14 },
    maxStars: { type: Number, default: 5 },
});

// Computed для безопасного расчета звёзд
const filledStars = computed(() => {
    const value = Math.floor(props.rating);
    return Math.min(Math.max(0, value), props.maxStars);
});

const emptyStars = computed(() => {
    return Math.max(0, props.maxStars - filledStars.value);
});
</script>

<template>
    <div class="inline-flex items-center">
        <!-- Заполненные звёзды -->
        <StarIcon
            v-for="i in filledStars"
            :key="`filled-${i}`"
            :size="size"
            fill="#FBBE24"
            class="mr-[2px]"
        />

        <!-- Пустые звёзды -->
        <StarIcon
            v-for="i in emptyStars"
            :key="`empty-${i}`"
            :size="size"
            fill="none"
            class="mr-[2px]"
            style="color: #ccc"
        />
    </div>
</template>
