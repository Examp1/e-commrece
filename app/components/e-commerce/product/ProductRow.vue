<script setup>
const productEcomStore = useProductEcomStore();
const { productsWithSameCategory } = storeToRefs(productEcomStore);

const props = defineProps(["categoryId"]);

const { data } = await useLazyFetch(
    "/api/e-commerce/products/get-same-category-products",
    {
        query: {
            categoryId: props.categoryId,
        },
    },
);

if (data.value) {
    productsWithSameCategory.value = data.value.products;
}
</script>

<template>
    <div class="grid gap-8">
        <template
            v-for="(product, idx) in productsWithSameCategory"
            :key="product.id"
        >
            <ProductCard v-if="idx <= 4" class="w-full" :product="product" />
        </template>

        <!-- :class="{
        hidden: i === products.length - 1,
        'lg:block': i === products.length - 1,
      }" -->
    </div>
</template>
