export const useProductReviewStore = defineStore("product-review-store", () => {
    const productReviewInputs = ref({
        userId: null,
        starNumber: null,
        productId: null,
        comment: null,
    });
    const productReviewData = ref(null);

    async function fetcProductReviews(productId: number) {
        const { data, refresh } = await useFetch(
            "/api/e-commerce/get-product-reviews",
            {
                query: {
                    productId,
                },
            },
        );

        productReviewData.value = data.value;
    }

    return {
        productReviewInputs,
        fetcProductReviews,
    };
});
