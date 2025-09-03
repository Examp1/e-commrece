<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
    fetchSingleProductData,
    fetchProductsWithSameCategory,
    fetcProductReviews,
} from "~/composables/products-ecom/useProductsComposables";

const shoppingCartStore = useShoppingCartStore();

const productEcomStore = useProductEcomStore();
const { singleProductData, productsWithSameCategory } =
    storeToRefs(productEcomStore);
const productReviewStore = useProductReviewStore();
const { productReviewData } = storeToRefs(productReviewStore);

const productQuantity = ref<number>(1);

const route = useRoute();

const { data: product } = await fetchSingleProductData(route.params.slug);
singleProductData.value = product.value;

const categoryId = product.value?.categoryId;
const productId = product.value?.id;

if (categoryId) {
    const { data: sameCategory } = await fetchProductsWithSameCategory(
        categoryId,
    );
    productsWithSameCategory.value = sameCategory.value;
}

if (productId) {
    const { data: reviews } = await fetcProductReviews(productId);
    productReviewData.value = reviews.value;
}
</script>

<template>
    <main class="container relative py-6 xl:max-w-7xl">
        <div>
            <Breadcrumb class="mb-6" />
            <div
                class="flex flex-col gap-10 md:flex-row md:justify-between lg:gap-24"
            >
                <ProductImageGallery
                    :images="singleProductData?.images"
                    class="relative flex-1"
                />

                <div class="lg:max-w-md xl:max-w-lg md:py-2 w-full">
                    <div class="flex justify-between mb-4">
                        <div class="flex-1">
                            <h1
                                class="flex flex-wrap items-center gap-2 mb-2 text-2xl font-sesmibold"
                            >
                                {{ singleProductData?.name }}
                            </h1>
                            <StarRating
                                :rating="
                                    computeProductReview(singleProductData)
                                "
                            />
                        </div>
                        <ProductPrice
                            class="text-xl"
                            :sale-price="singleProductData?.price + '$'"
                            :regular-price="singleProductData.old_price + '$'"
                        />
                    </div>

                    <hr />

                    <div
                        class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-4 p-4 mt-12 bg-white md:static md:bg-transparent bg-opacity-90 md:p-0"
                    >
                        <input
                            v-model="productQuantity"
                            type="number"
                            min="1"
                            aria-label="Quantity"
                            class="bg-white border rounded-lg flex text-left p-2.5 w-20 gap-4 items-center justify-center focus:outline-none"
                        />
                        <AddToCartButton
                            class="flex-1 w-full md:max-w-xs"
                            @click="
                                shoppingCartStore.addProductToCart(
                                    singleProductData,
                                    productQuantity,
                                )
                            "
                            :class="{ loading: true }"
                        />
                    </div>

                    <div>
                        <div class="grid gap-2 my-8 text-sm">
                            <div class="flex items-center gap-2">
                                <span class="text-gray-400">Category :</span>
                                <div class="product-categories">
                                    <NuxtLink
                                        class="hover:text-primary"
                                        title="category-name"
                                        >{{ singleProductData?.category?.name
                                        }}<span class="comma">, </span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="my-8">
                            <span class="text-gray-400">Product description</span>
                            <div class="text-base">
                                {{ singleProductData.description }}
                            </div>
                        </div>
                    </div>

                    <!-- <div class="flex flex-wrap gap-4">
                        <WishlistButton />
                    </div> -->
                </div>
            </div>
            <div class="my-32">
                <ProductTabs />
            </div>

            <div class="my-32">
                <div class="mb-4 text-xl font-semibold">
                    You May Also Like <Icon name="uil:github" />
                </div>
                <LazyProductRow
                    :productData="productsWithSameCategory"
                    class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
                />
            </div>
        </div>
    </main>
</template>

<style scoped>
.product-categories > a:last-child .comma {
    display: none;
}

input[type="number"]::-webkit-inner-spin-button {
    opacity: 1;
}
</style>
