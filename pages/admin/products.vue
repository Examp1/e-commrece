<script setup>
import BaseBtn from "~/components/base-components/base-btn.vue";
import productModal from "~/components/product/product-modal.vue";
import productTable from "~/components/product/product-table.vue";
import UploadImage from "~/components/product/upload-image.vue";
import UploadedImageModal from "~/components/product/uploaded-image-modal.vue";
definePageMeta({
    layout: "admin",
});

const productStore = useProductStore();
const {
    poroductInputs,
    edit,
    productsData,
    productId,
    showUploadImageModal,
    showUploadedImageModal,
    uploadedProductImages,
} = storeToRefs(productStore);
const categoryStore = useCategoryStore();

const isShow = ref(false);

function toggleProductModal() {
    isShow.value = !isShow.value;
}

const { data: categoryData } = await categoryStore.fetchCategories();
// const { data: productsData, getProducts } =
await productStore.fetchProducts();

function editProduct(product) {
    poroductInputs.value = product;
    edit.value = true;
    toggleProductModal();
}

async function deleteProduct(product) {
    promptUser("Do yo want to delete this ?")
        .then(async () => {
            await productStore.deleteProduct(product.id);
            await productStore.fetchProducts();
        })
        .catch((error) => console.log(error));
}

function uploadImage(product) {
    productId.value = product.id;
    showUploadImageModal.value = true;
}
function showUploadedImages(product) {
    uploadedProductImages.value = product?.images;
    showUploadedImageModal.value = true;
}
</script>

<template>
    <div class="h-screen">
        <div class="flex justify-end mb-4 pt-4">
            <ClientOnly>
                <product-modal
                    :show="isShow"
                    :categories="categoryData?.categories"
                    @toggleProductModal="toggleProductModal"
                    @deleteProduct="deleteProduct"
                    @getProducts="productStore.fetchProducts()"
                ></product-modal>
                <UploadImage @getProducts="productStore.fetchProducts()" />
                <UploadedImageModal />
            </ClientOnly>
        </div>
        <product-table
            :productsData="productsData"
            @editProduct="editProduct"
            @deleteProduct="deleteProduct"
            @uploadImage="uploadImage"
            @showUploadedImages="showUploadedImages"
        >
            <template #btn>
                <base-btn label="Create" @click="toggleProductModal"></base-btn>
            </template>
        </product-table>
    </div>
</template>

<style lang="scss" scoped></style>
