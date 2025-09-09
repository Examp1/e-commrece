export interface IUseProductResponce {
    product: IProduct;
    similarProducts: IProduct[];
    reviews: IReview[];
    refreshProduct: () => Promise<void>;
    refreshReviews: () => Promise<void>;
}
