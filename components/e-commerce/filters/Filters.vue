<script setup lang="ts">
const productEcomStore = useProductEcomStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const { data } = await categoryStore.fetchCategories();
const { productColors } = storeToRefs(productStore);
const {
    selectedCategories,
    selectedColors,
    selectedPrices,
    selectedStar,
    productsData,
} = storeToRefs(productEcomStore);

const filterParamsObj = ref({});
async function filterProductBy(filters: {}) {
    updateFilterParamsObj(filters);
    await productEcomStore.filterProducts(filterParamsObj.value);
}

function updateFilterParamsObj(filters: {}) {
    if (Object.keys(filterParamsObj.value).length) {
        for (const key in filterParamsObj.value) {
            if (Object.keys(filters).includes(key)) {
                filterParamsObj.value[key] = filters[key];
            } else {
                console.log(key, "else");
                filterParamsObj.value = {
                    ...filterParamsObj.value,
                    ...filters,
                };
            }
        }
    } else {
        filterParamsObj.value = { ...filters };
    }
    console.log(filterParamsObj.value);
}

// async function fetchProductByCategories(categories: number[]) {
//     selectedCategories.value = categories;
//     await productEcomStore.fetchProducts(
//         categories,
//         selectedPrices.value,
//         selectedColors.value,
//         selectedStar.value,
//     );
// }
// async function fetchProductByColors(colors: string[]) {
//     selectedColors.value = colors;
//     await productEcomStore.fetchProducts(
//         selectedCategories.value,
//         selectedPrices.value,
//         colors,
//         selectedStar.value,
//     );
// }
// async function fetchProductByPrice(prices: number[]) {
//     selectedPrices.value = prices;
//     await productEcomStore.fetchProducts(
//         selectedCategories.value,
//         prices,
//         selectedColors.value,
//         selectedStar.value,
//     );
// }
// async function fetchProductByStars(star: number) {
//     selectedStar.value = star;
//     await productEcomStore.fetchProducts(
//         selectedCategories.value,
//         selectedPrices.value,
//         selectedColors.value,
//         star,
//     );
// }
</script>

<template>
    <aside id="filters">
        {{ filterParamsObj }}
        <OrderByDropdown class="block w-full md:hidden" />
        <div class="relative z-30 grid mb-12 space-y-8 divide-y">
            <PriceFilter
                @fetchProducts="filterProductBy"
                :prices="productsData"
            />
            <CategoryFilter
                @fetchProducts="filterProductBy"
                :categories="data?.categories"
            />

            <ColorFilter
                @fetchProducts="filterProductBy"
                :colors="productColors"
            />

            <StarRatingFilter @fetchProducts="filterProductBy" />
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
