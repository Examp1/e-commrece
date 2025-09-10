<script setup>
const productEcomStore = useProductEcomStore();
const { productsData } = storeToRefs(productEcomStore);
</script>

<template>
    <Transition name="fade" mode="out-in">
        <!-- !!products.length -->
        <section class="relative w-full">
            <!-- <template v-if="!productsData?.products?.length">
                <div v-for="i in 10" class="relative group" :key="'sekeleton' + i">
                    <UiSkeleton clases="w-full h-[280px] mb-4 rounded-lg" />
                    <UiSkeleton clases="w-full h-[20px] mb-4" />
                    <UiSkeleton clases="w-full h-[20px] mb-4" />
                    <UiSkeleton clases="w-full h-[20px] mb-4" />
                </div>
            </template> -->
            <TransitionGroup
                name="shrink"
                tag="div"
                mode="in-out"
                class="product-grid"
            >
                <ProductCard
                    v-for="product in productsData?.products"
                    :key="product?.id"
                    :product="product"
                />
            </TransitionGroup>
            <!-- <Pagination /> -->
        </section>
        <!-- <NoProductsFound v-else /> -->
    </Transition>
</template>

<style lang="postcss" scoped>
.product-grid {
    @apply my-4 min-h-[600px] grid transition-all gap-8 lg:my-8;

    grid-template-columns: repeat(2, 1fr);
}
.product-grid:empty {
    display: none;
}

@media (min-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    }
}

.shrink-move {
    transition: all 400ms;
}

.shrink-leave-active {
    transition: transform 300ms;
    position: absolute;
    opacity: 0;
}

.shrink-enter-active {
    transition: opacity 400ms ease-out 200ms, transform 400ms ease-out;
    will-change: opacity, transform;
}

.shrink-enter,
.shrink-leave-to,
.shrink-enter-from {
    opacity: 0;
    transform: scale(0.75) translateY(25%);
}
</style>
