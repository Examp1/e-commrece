interface IReviews {
    avgRating: number;
    totalReviews: number;
    reviews: [];
}
export const useProductReviewStore = defineStore("product-review-store", () => {
    const productReviewInputs = ref({
        userId: null,
        starNumber: null,
        productId: null,
        comment: null,
    });
    const productReviewData = ref<IReviews>({
        avgRating: 0,
        totalReviews: 0,
        reviews: [],
    });

    return {
        productReviewInputs,
        productReviewData,
    };
});
