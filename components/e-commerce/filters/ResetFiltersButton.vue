<script setup>
const productEcomStore = useProductEcomStore();
const filterEcomStore = useFilterEcomStore();
const { selectedCategories, selectedColors, selectedPrices, selectedStar } =
    storeToRefs(filterEcomStore);

async function resetFilter() {
    selectedCategories.value = [];
    selectedPrices.value = [];
    selectedColors.value = [];
    selectedStar.value = null;
    await productEcomStore.fetchProducts(
        selectedCategories.value,
        selectedPrices.value,
        selectedColors.value,
        selectedStar.value,
    );
}
</script>

<template>
    <button
        @click="resetFilter"
        class="bg-primary rounded-lg font-bold mt-8 text-center text-white text-sm w-full p-2"
    >
        Clear Filters
    </button>
</template>
