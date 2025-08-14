export const useProductEcomStore = defineStore("product-ecom-store", () => {
    const productsData = ref<any>("");
    // pagination
    const page = ref<number>(1);
    const limit = ref<number>(10);

    async function fetchProducts(
        categories?: number[],
        prices?: number[],
        colors?: string[],
    ) {
        const { data, refresh } = await useFetch(
            "/api/e-commerce/get-products",
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

    return {
        productsData,
        fetchProducts,
    };
});
