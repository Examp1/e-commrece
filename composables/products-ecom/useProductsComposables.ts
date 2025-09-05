export const fetchSingleProductData = async (slug: string) => {
    const { data, refresh } = await useFetch(
        "/api/e-commerce/get-single-product",
        {
            query: {
                slug,
            },
        },
    );
    return {
        data,
        refresh,
    };
};
export const fetchProductsWithSameCategory = async (categoryId: number) => {
    const { data, refresh } = await useFetch(
        "/api/e-commerce/get-same-category-products",
        {
            query: {
                categoryId,
            },
        },
    );

    return {
        data,
        refresh,
    };
};
export const fetchProducts = async (page: number = 1, limit: number = 10) => {
    
    const { data, refresh } = await useFetch(
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
// reviews
export const fetcProductReviews = async (productId: number) => {
    const { data, refresh } = await useFetch(
        "/api/e-commerce/get-product-reviews",
        {
            query: {
                productId,
            },
        },
    );

    return {
        data,
        refresh,
    };
};
