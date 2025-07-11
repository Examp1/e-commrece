export const useProductStore = defineStore("product-store", () => {
    const poroductInputs = ref({
        id: null,
        name: "",
        color: "",
        price: 0,
        categoryId: "",
    });

    const edit = ref<boolean>(false);
    const search = ref<string>("");
    const productsData = ref<any>("");
    // pagination
    const page = ref<number>(1);
    const limit = ref<number>(10);

    async function fetchProducts() {
        const { data, refresh } = await useFetch("/api/admin/product/get", {
            headers: {
                Accept: "aplication/json",
                // Autorization: `Bearer ${userData.token}`
            },
            query: {
                search: search.value,
                page: page.value,
                limit: limit.value,
            },
        });

        productsData.value = data.value;
        limit.value = productsData.value?.metadata.limit;
        page.value = productsData.value?.metadata.page;
    }

    async function changePage(newPage: number) {
        page.value = newPage;
        await fetchProducts();
    }

    return {
        poroductInputs,
        edit,
        search,
        productsData,
        fetchProducts,
        changePage,
    };
});
