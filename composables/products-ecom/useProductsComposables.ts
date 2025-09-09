export const fetchProducts = async (page: number = 1, limit: number = 10) => {
    const { data, refresh } = await await useFetch(
        "/api/e-commerce/get-all-products",
        {
            query: {
                page: page,
                limit: limit,
            },
        },
    );
    return {
        data,
        refresh,
    };
};
