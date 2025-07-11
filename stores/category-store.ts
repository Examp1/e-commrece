export const useCategoryStore = defineStore("categoy-store", () => {
    const categoryInputs = ref({
        id: null,
        name: "",
    });

    const edit = ref(false);

    async function fetchCategories() {
        const { data, refresh: getCategories } = await useFetch(
            "/api/admin/category/get-category",
            {
                headers: {
                    Accept: "aplication/json",
                    // Autorization: `Bearer ${userData.token}`
                },
            },
        );
        return { data, getCategories };
    }

    return {
        categoryInputs,
        edit,
        fetchCategories
    };
});
