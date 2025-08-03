export const useCategoryStore = defineStore("categoy-store", () => {
    const categoryInputs = ref({
        id: null,
        name: "",
    });

    const edit = ref(false);
    const headers = useHeaders();

    async function fetchCategories() {
        const { data, refresh: getCategories } = await useFetch(
            "/api/admin/category/get-category",
            {
                headers: {
                    ...headers,
                },
            },
        );
        return { data, getCategories };
    }

    return {
        categoryInputs,
        edit,
        fetchCategories,
    };
});
