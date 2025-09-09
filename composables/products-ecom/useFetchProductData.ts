// composables/useFetchProductData.ts
import { ref } from 'vue';

type Image = { id: number; url: string; productId: number };
type Category = { id: number; name: string };
type ProductStars = { averageStarsRating: string | number; totalReviews: number };
type Product = {
  id: number;
  name: string;
  color?: string;
  price: string; // Decimal from backend often приходит как string
  old_price?: string | null;
  categoryId: number;
  slug?: string | null;
  description?: string | null;
  images?: Image[];
  category?: Category;
  stars?: ProductStars | null;
};
type ProductReview = {
  id: number;
  userId: number;
  starNumber: number;
  productId: number;
  comment: string;
  createdAt: string;
};

type PageData = {
  product: Product | null;
  similar: Product[];
  reviews: ProductReview[];
};

const DEFAULT_PAGE_DATA: PageData = {
  product: null,
  similar: [],
  reviews: [],
};

function fetchProduct(slug: string) {
  return $fetch<Product | null>('/api/e-commerce/get-single-product', {
    query: { slug },
  });
}

function fetchReviews(productId: number) {
  return $fetch<ProductReview[]>('/api/e-commerce/get-product-reviews', {
    query: { productId },
  });
}

function fetchSimilarProduct(categoryId: number) {
  return $fetch<Product[]>('/api/e-commerce/get-same-category-products', {
    query: { categoryId },
  });
}

/**
 * useFetchProductData
 * - возвращает AsyncData: { data, pending, error, refresh }
 * - плюс utility refresh-функции: refreshProduct, refreshReviews, refreshSimilarProducts
 */
export const useFetchProductData = (slug: string) => {
  const asyncData = useAsyncData<PageData>(`product-page-${slug}`, async () => {
    const product = await fetchProduct(slug);
    if (!product) {
      // защищаем шаблон и пользователей от падений
      return DEFAULT_PAGE_DATA;
    }

    // безопасно запрашиваем reviews и similar только если есть product
    const [reviews, similar] = await Promise.all([
      fetchReviews(product.id),
      fetchSimilarProduct(product.categoryId),
    ]);

    return {
      product,
      reviews: Array.isArray(reviews) ? reviews : [],
      similar: Array.isArray(similar) ? similar : [],
    };
  });

  // флаги для защиты от параллельных refresh
  const isRefreshingProduct = ref(false);
  const isRefreshingReviews = ref(false);
  const isRefreshingSimilar = ref(false);

  const ensureDefault = (value: PageData | undefined | null) =>
    value ?? { ...DEFAULT_PAGE_DATA };

  const refreshProduct = async () => {
    if (isRefreshingProduct.value) return null;
    isRefreshingProduct.value = true;
    try {
      const newProduct = await fetchProduct(slug);
      asyncData.data.value = {
        ...(ensureDefault(asyncData.data.value)),
        product: newProduct ?? null,
      };
      return newProduct;
    } catch (err) {
      // можно логировать / report
      console.error('refreshProduct error', err);
      throw err;
    } finally {
      isRefreshingProduct.value = false;
    }
  };

  const refreshReviews = async () => {
    if (isRefreshingReviews.value) return null;
    const prodId = asyncData.data.value?.product?.id;
    if (prodId == null) return null;
    isRefreshingReviews.value = true;
    try {
      const newReviews = await fetchReviews(prodId);
      asyncData.data.value = {
        ...(ensureDefault(asyncData.data.value)),
        reviews: Array.isArray(newReviews) ? newReviews : [],
      };
      return newReviews;
    } catch (err) {
      console.error('refreshReviews error', err);
      throw err;
    } finally {
      isRefreshingReviews.value = false;
    }
  };

  const refreshSimilarProducts = async () => {
    if (isRefreshingSimilar.value) return null;
    const catId = asyncData.data.value?.product?.categoryId;
    if (catId == null) return null;
    isRefreshingSimilar.value = true;
    try {
      const newSimilar = await fetchSimilarProduct(catId);
      asyncData.data.value = {
        ...(ensureDefault(asyncData.data.value)),
        similar: Array.isArray(newSimilar) ? newSimilar : [],
      };
      return newSimilar;
    } catch (err) {
      console.error('refreshSimilarProducts error', err);
      throw err;
    } finally {
      isRefreshingSimilar.value = false;
    }
  };

  return {
    ...asyncData, // data, pending, error, refresh
    refreshProduct,
    refreshReviews,
    refreshSimilarProducts,
  };
};