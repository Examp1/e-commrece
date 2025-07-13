<script setup>
import categoryTable from "~/components/categories/category-table.vue";
import BaseBtn from "~/components/base-components/base-btn.vue";
import CategoryModal from "~/components/categories/category-modal.vue";

definePageMeta({
    layout: "admin",
});

const categoryStore = useCategoryStore();
const { categoryInputs, edit } = storeToRefs(categoryStore);

const isShow = ref(false);

function toggleCategoryModal() {
    isShow.value = !isShow.value;
}

const { data, getCategories } = await categoryStore.fetchCategories()

function editCategory(category) {
    categoryInputs.value = category
    edit.value = true;
    toggleCategoryModal()
}
</script>

<template>
    <div class="h-screen">
        <div class="flex justify-end mb-4 pt-4">
            <base-btn label="Create" @click="toggleCategoryModal" />
            <ClientOnly>
                <category-modal
                    :show="isShow"
                    @toggleCategoryModal="toggleCategoryModal"
                    @getCategories="getCategories"
                ></category-modal>
            </ClientOnly>
        </div>
        <category-table
            :categories="data.categories"
            @editCategory="editCategory"
        ></category-table>
    </div>
</template>

<style lang="scss" scoped></style>
