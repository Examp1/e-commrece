<script setup lang="ts">
const productEcomStore = useProductEcomStore();
const { productsData, page, limit } = storeToRefs(productEcomStore);

const { data, refresh } = await useAsyncData("all-products-page", () =>
    $fetch("/api/e-commerce/get-all-products", {
        query: {
            page: page.value,
            limit: limit.value,
        },
    }),
);
if (data.value) {
    productsData.value = data.value;
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
