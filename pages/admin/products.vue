<script setup>
import BaseBtn from "~/components/base-components/base-btn.vue";
import productModal from "~/components/product/product-modal.vue";
import productTable from "~/components/product/product-table.vue";
definePageMeta({
    layout: "admin",
});

const productStore = useProductStore();
const { poroductInputs, edit, productsData } = storeToRefs(productStore);
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
    console.log(product);
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
            </ClientOnly>
        </div>
        <product-table
            :productsData="productsData"
            @editProduct="editProduct"
        >
            <template #btn>
                <base-btn label="Create" @click="toggleProductModal"></base-btn>
            </template>
        </product-table>
    </div>
</template>

<style lang="scss" scoped></style>
