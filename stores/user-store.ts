export const useUserStore = defineStore("user-store", () => {
    const userData = ref<any>("");
    const userError = ref<any>("");
    const headers = useHeaders();
    // pagination
    const search = ref<string>("");
    const page = ref<number>(1);
    const limit = ref<number>(10);

    async function fetchUsers() {
        const { data, refresh, error } = await useFetch("/api/admin/user/get", {
            headers: {
                ...headers,
            },
            query: {
                search: search.value,
                page: page.value,
                limit: limit.value,
            },
        });

        userError.value = error;
        // isAuthenticatied(error)

        userData.value = data.value;
        limit.value = userData.value?.metadata.limit;
        page.value = userData.value?.metadata.page;
    }

    async function changePage(newPage: number) {
        page.value = newPage;
        await fetchUsers();
    }

    

    return {
        userData,
        search,
        limit,
        page,
        userError,
        fetchUsers,
        changePage,
    };
});
