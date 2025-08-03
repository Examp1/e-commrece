export const useProductEcomStore = defineStore("product-ecom-store", () => {
    const productsData = ref<any>("");
    // pagination
    const page = ref<number>(1);
    const limit = ref<number>(10);

    async function fetchProducts() {
        const { data, refresh } = await useFetch("/api/e-commerce/get-products", {
            query: {
                page: page.value,
                limit: limit.value,
            },
        });

        productsData.value = data.value;
        limit.value = productsData.value?.metadata.limit;
        page.value = productsData.value?.metadata.page;
    }

    return {
        productsData,
        fetchProducts,
    };
});
