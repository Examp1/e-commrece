<script setup lang="ts">
const productEcomStore = useProductEcomStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const { data } = await categoryStore.fetchCategories();
const { productColors } = storeToRefs(productStore);
const {
    productsData,
    filterParams,
} = storeToRefs(productEcomStore);

async function filterProductBy(filters: {}) {
    updateFilterParamsObj(filters);
    await productEcomStore.filterProducts(filterParams.value);
}

function updateFilterParamsObj(filters: {}) {
    if (Object.keys(filterParams.value).length) {
        for (const key in filterParams.value) {
            if (Object.keys(filters).includes(key)) {
                filterParams.value[key] = filters[key];
            } else {
                filterParams.value = {
                    ...filterParams.value,
                    ...filters,
                };
            }
        }
    } else {
        filterParams.value = { ...filters };
    }
}
</script>

<template>
    <aside id="filters">
        <OrderByDropdown class="block w-full md:hidden" />
        <div class="relative z-30 grid mb-12 space-y-8 divide-y">
            <PriceFilter
                @filterProducts="filterProductBy"
                :prices="productsData"
            />
            <CategoryFilter
                @filterProducts="filterProductBy"
                :categories="data?.categories"
            />

            <ColorFilter
                @filterProducts="filterProductBy"
                :colors="productColors"
            />

            <StarRatingFilter @filterProducts="filterProductBy" />
            <LazyResetFiltersButton />
        </div>
    </aside>
    <!-- @click="removeBodyClass('show-filters')" -->
    <div
        class="fixed inset-0 z-50 hidden bg-black opacity-25 filter-overlay"
    ></div>
</template>

<style lang="postcss">
.show-filters .filter-overlay {
    @apply block;
}
.show-filters {
    overflow: hidden;
}

#filters {
    @apply w-[280px];

    & .slider-connect {
        @apply bg-primary;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.price-input {
    @apply border rounded-xl outline-none leading-tight w-full p-2 transition-all;

    &.active {
        @apply border-gray-400 pl-6;
    }
}

@media (max-width: 768px) {
    #filters {
        @apply bg-white h-full p-8 transform pl-2 transition-all ease-in-out bottom-0 left-4 -translate-x-[110vw] duration-300 overflow-auto fixed;

        box-shadow: -100px 0 0 white, -200px 0 0 white, -300px 0 0 white;
        z-index: 60;
    }

    .show-filters #filters {
        @apply transform-none;
    }
}
</style>
