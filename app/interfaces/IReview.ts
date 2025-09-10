export interface IReview {
    id: number;
    userId: number;
    starNumber: number;
    productId: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}
