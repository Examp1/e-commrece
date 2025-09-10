<script setup lang="ts">
import ProductCard from "./ProductCard.vue";

defineProps(["products"]);
</script>

<template>
    <div class="mt-10">
        <div class="grid grid-cols-4 gap-5">
            <ProductCard
                v-for="product in products"
                :key="product.name"
                :product
            />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
