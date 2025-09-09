interface IImage {
    id: number;
    productId: number;
    url: string;
}

export interface IProduct {
    id: number;
    name: string;
    price: Decimal;
    old_price: Decimal;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    slug?: string;
    description?: string;
    images: IImage[];
    avgRating: number
}
