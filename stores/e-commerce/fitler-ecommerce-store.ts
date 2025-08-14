export const useFilterEcomStore = defineStore("fiilter-ecom-store", () => {
    const selectedCategories = ref<number[]>([]);
    const selectedColors = ref<string[]>([]);
    const selectedPrices = ref<number[]>([]);

    return {
        selectedCategories,
        selectedColors,
        selectedPrices,
    };
});
