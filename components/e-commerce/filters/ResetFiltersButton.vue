<script setup>
const productEcomStore = useProductEcomStore();

const { filterParams } = storeToRefs(productEcomStore);

async function resetFilter() {
    filterParams.value = {};
    await productEcomStore.filterProducts(filterParams.value);
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
