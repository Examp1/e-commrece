<script setup lang="ts">
const productEcomStore = useProductEcomStore();
const { singleProductData } = storeToRefs(productEcomStore);

const productReviewStore = useProductReviewStore();
const { productReviewData } = storeToRefs(productReviewStore);
const show = ref(1);

const { data } = await useFetch("/api/e-commerce/get-product-reviews", {
    query: {
        productId: singleProductData.value.id,
    },
});

if (data.value) {
    productReviewData.value = data.value;
}
</script>

<template>
    <div>
        <nav class="border-b flex gap-8 tabs">
            <button
                type="button"
                :class="show === 1 ? 'active' : ''"
                @click.prevent="show = 1"
            >
                Reviews ({{ productReviewData?.totalReviews || 0 }})
            </button>
        </nav>
        <div class="tab-contents">
            <ProductReviews />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.tabs button {
    @apply border-transparent border-b-2 text-lg pb-8;
    margin-bottom: -1px;
}

.tabs button.active {
    @apply border-primary text-primary;
}
</style>
