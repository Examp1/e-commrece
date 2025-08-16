<script setup>
const props = defineProps(["productData"]);
</script>

<template>
    <div class="grid gap-8">
        <template v-for="(product, idx) in productData" :key="product.id">
            <ProductCard v-if="idx <= 4" class="w-full" :product="product" />
        </template>

        <!-- :class="{
        hidden: i === products.length - 1,
        'lg:block': i === products.length - 1,
      }" -->
    </div>
</template>
