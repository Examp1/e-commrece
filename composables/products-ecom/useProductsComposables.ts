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
// export const fetchProducts = async (
//     categories?: number[],
//     prices?: number[],
//     colors?: string[],
//     starRating?: number,
// ) => {
//     const params: Record<string, any> = {};

//     if (categories && categories?.length > 0) {
//         params["categories"] = categories.toString();
//     }
//     if (prices && prices?.length > 0) {
//         params["prices"] = prices.toString();
//     }
//     if (colors && colors?.length > 0) {
//         params["colors"] = colors.toString();
//     }

//     if (starRating && typeof starRating === "number") {
//         params["starRating"] = starRating;
//     }
//     const { data, refresh } = await useFetch(
//         "/api/e-commerce/get-all-products",
//         {
//             query: {
//                 ...params,
//                 page: page.value,
//                 limit: limit.value,
//             },
//         },
//     );
//     return {
//         data,
//         refresh,
//     };
// };
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
