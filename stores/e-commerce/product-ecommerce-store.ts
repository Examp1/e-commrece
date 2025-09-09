export const useProductEcomStore = defineStore("product-ecom-store", () => {
    const productsData = ref<any>("");
    const singleProductData = ref<IProduct | undefined>(undefined);
    const productsWithSameCategory = ref(null);
    const categories = ref(undefined)

    // pagination
    const page = ref<number>(1);
    const limit = ref<number>(10);

    // filter
    const filterParams = ref({});

    async function filterProducts(filter: {
        categories?: number[];
        prices?: number[];
        colors?: string[];
        starRating?: number;
    }) {
        const res = await $fetch("/api/e-commerce/get-all-products", {
            query: {
                ...filter,
                page: page.value,
                limit: limit.value,
            },
        });

        productsData.value = res;
        limit.value = productsData.value?.metadata.limit;
        page.value = productsData.value?.metadata.page;
    }

    return {
        page,
        limit,
        categories,
        productsData,
        singleProductData,
        productsWithSameCategory,
        // fetchProducts,
        filterProducts,
        filterParams,
    };
});
