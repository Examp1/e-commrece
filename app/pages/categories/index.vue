<script setup lang="ts">
const cacheData = useNuxtData("katalog").data;

const categories = ref<ICategoryResponce>();

if (!cacheData.value) {
    const { data, refresh } = useLazyAsyncData<ICategoryResponce>(
        "katalog",
        () => $fetch("/api/e-commerce/categories/get"),
    );
    if (data.value) {
        categories.value = data.value;
    }
} else {
    categories.value = cacheData.value;
}
</script>

<template>
    <div class="container mt-5">
        <Breadcrumb />
        <h1 class="text-6xl font-semibold mt-5">Catalog</h1>
        <div class="grid grid-cols-4 gap-5 mt-10">
            <NuxtLink
                v-for="category in categories"
                :key="category.name"
                :to="`/categories/${category.name}`"
                class="h-[200px] p-4 rounded-lg bg-green-200 flex items-center justify-center"
            >
                <span class="text-3xl capitalize font-semibold">{{
                    category.name
                }}</span>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped></style>
