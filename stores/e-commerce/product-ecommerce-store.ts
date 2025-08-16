export const useProductEcomStore = defineStore("product-ecom-store", () => {
    const productsData = ref<any>("");
    const singleProductData = ref(null);
    const productsWithSameCategory = ref(null);
    // pagination
    const page = ref<number>(1);
    const limit = ref<number>(10);

    const selectedCategories = ref<number[]>([]);
    const selectedColors = ref<string[]>([]);
    const selectedPrices = ref<number[]>([]);

    async function fetchProducts(
        categories?: number[],
        prices?: number[],
        colors?: string[],
    ) {
        const { data, refresh } = await useFetch(
            "/api/e-commerce/get-all-products",
            {
                query: {
                    categories: categories ? categories.toString() : [],
                    prices: prices ? prices.toString() : [],
                    colors: colors ? colors.toString() : [],
                    page: page.value,
                    limit: limit.value,
                },
            },
        );

        productsData.value = data.value;
        limit.value = productsData.value?.metadata.limit;
        page.value = productsData.value?.metadata.page;
    }

    async function fetchSingleProductData(slug: string) {
        const { data, refresh } = await useFetch(
            "/api/e-commerce/get-single-product",
            {
                query: {
                    slug,
                },
            },
        );

        singleProductData.value = data.value;
    }

    async function fetchProductsWithSameCategory(categoryId: number) {
        const { data, refresh } = await useFetch(
            "/api/e-commerce/get-same-category-products",
            {
                query: {
                    categoryId,
                },
            },
        );

        productsWithSameCategory.value = data.value;
    }

    return {
        productsData,
        singleProductData,
        productsWithSameCategory,
        fetchProducts,
        fetchSingleProductData,
        fetchProductsWithSameCategory,
        selectedCategories,
        selectedColors,
        selectedPrices,
    };
});
