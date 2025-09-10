<script setup lang="ts">
import ProductsGrid from "~/components/e-commerce/product/ProductsGrid.vue";

const route = useRoute();
const { data, refresh } = await useLazyAsyncData<ICategoryResponce>(
    `category-${route.params.category}`,
    () =>
        $fetch("/api/e-commerce/categories/get-by-id", {
            query: {
                name: route.params.category,
            },
        }),
);
function filterProducts() {
    console.log("start filter");
}
</script>

<template>
    <div class="container mt-5">
        <Breadcrumb />
        <h1 class="text-6xl font-semibold mt-5 capitalize">{{ data?.name }}</h1>
        <ProductsGrid
            :products="data?.products"
            @filterProducts="filterProducts"
        />
    </div>
</template>

<style scoped></style>
