export const useCategoryStore = defineStore("categoy-store", () => {
    const categoryInputs = ref({
        id: null,
        name: "",
    });

    const edit = ref(false)
    // if value = true 
    // edit
    // else 
    // create

    return {
        categoryInputs,
        edit
    }
});
