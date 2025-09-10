<script setup lang="ts">
defineProps({
    clases: {
        type: String,
        default: "w-200px h-200px",
    },
    style: {
        type: String,
    },
    anim: {
        type: String,
        default: "animate-pulse",
    },
});
</script>

<template>
    <div class="bg-gray-300" :class="[anim, clases]"></div>
</template>

<style scoped></style>
