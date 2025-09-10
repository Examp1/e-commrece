<script setup lang="ts">
// const { siteName } = useAppConfig();
// const runtimeConfig = useRuntimeConfig();
// const img = useImage();

// const logoUrl = runtimeConfig?.public?.LOGO ? img(runtimeConfig?.public?.LOGO) : null;
// const faviconUrl = '/logo.svg';
</script>

<template>
    <NuxtLink to="/" class="inline-flex items-center gap-2">
        <!-- <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="object-contain h-10" />
    <div v-else class="flex items-center gap-2 text-lg font-bold">
     -->
        <img
            src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Logo"
            width="42"
            height="42"
        />
        <span>e-shop</span>
        <!-- </div> -->
    </NuxtLink>
</template>
