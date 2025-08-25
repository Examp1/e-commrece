export const useProductReviewStore = defineStore("product-review-store", () => {
    const productReviewInputs = ref({
        userId: null,
        starNumber: null,
        productId: null,
        comment: null,
    });
    const productReviewData = ref(null);

    return {
        productReviewInputs,
        productReviewData,
    };
});
