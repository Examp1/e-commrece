export const useProductStore = defineStore("product-store", () => {
    const poroductInputs = ref({
        id: null,
        name: "",
        color: "",
        price: 0,
        old_price: 0,
        categoryId: "",
        description: "",
    });
    const productId = ref(null);
    const productColors = ref([
        "red",
        "black",
        "white",
        "green",
        "blue",
        "yellow",
        "orange",
        "gray",
    ]);
    const showUploadImageModal = ref(false);
    const showUploadedImageModal = ref(false);

    const edit = ref<boolean>(false);
    const search = ref<string>("");
    const productsData = ref<any>("");
    // pagination
    const page = ref<number>(1);
    const limit = ref<number>(10);

    const uploadedProductImages = ref([]);
    const headers = useHeaders();

    async function fetchProducts() {
        const { data, refresh } = await useFetch("/api/admin/product/get", {
            headers: {
                ...headers,
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
    async function deleteProduct(id: number) {
        const res = await $fetch("/api/admin/product/delete", {
            headers: {
                ...headers,
            },
            method: "DELETE",
            body: JSON.stringify({ id: id }),
        });
        successMsg(res?.message);
    }

    async function changePage(newPage: number) {
        page.value = newPage;
        await fetchProducts();
    }

    function uploadImagePayload(productId: number, file: string) {
        return new Promise((resolve, reject) => {
            try {
                const formData = new FormData();

                // formData.append("Authorization", headers?.Authorization);
                formData.append("file", file);
                formData.append("productId", productId.toString());

                const requestOptions = {
                    headers: {
                        ...headers,
                    },
                    method: "POST",
                    body: formData,
                };
                resolve(requestOptions);
            } catch (error) {
                reject(error);
            }
        });
    }

    return {
        poroductInputs,
        edit,
        productId,
        search,
        showUploadImageModal,
        showUploadedImageModal,
        productsData,
        uploadedProductImages,
        productColors,
        fetchProducts,
        changePage,
        deleteProduct,
        uploadImagePayload,
    };
});
