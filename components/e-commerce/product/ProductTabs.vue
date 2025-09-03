<script setup lang="ts">
const productReviewStore = useProductReviewStore();
const { productReviewData } = storeToRefs(productReviewStore);
const show = ref(1);
</script>

<template>
    <div>
        <nav class="border-b flex gap-8 tabs">
            <button
                type="button"
                :class="show === 1 ? 'active' : ''"
                @click.prevent="show = 1"
            >
                Reviews ({{ productReviewData.totalReviews }})
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
