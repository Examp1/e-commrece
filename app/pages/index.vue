<script setup lang="ts">
const productEcomStore = useProductEcomStore();
const { productsData, page, limit, categories } = storeToRefs(productEcomStore);

const { data, refresh } = await useLazyAsyncData("all-products-page", async () => {
    const products = await $fetch("/api/e-commerce/products/get", {
        query: {
            page: page.value,
            limit: limit.value,
        },
    });
    const categories = await $fetch("/api/e-commerce/categories/get-all-categories");
    return {
        products,
        categories,
    };
});

if (data.value?.products) {
    productsData.value = data.value.products;
}

if (data.value?.categories) {
    categories.value = data.value.categories;
}
</script>
<template>
    <div class="container flex items-start gap-16">
        <Filters />

        <div class="w-full">
            <div
                class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8"
            ></div>
            <ProductGrid />
        </div>
    </div>

    <!-- <NoProductsFound v-else>Could not fetch products from your store. Please check your configuration.</NoProductsFound> -->
</template>
