<script setup>
import BaseBtn from "../base-components/base-btn.vue";
import BaseInput from "../base-components/base-input.vue";
import BaseModal from "../base-components/base-modal.vue";

const props = defineProps(["show"]);
const emit = defineEmits(["toggleCategoryModal, getCategories"]);

const categoryStore = useCategoryStore();
const { categoryInputs, edit } = storeToRefs(categoryStore);
const loading = ref(false);
async function createCategory() {
    try {
        loading.value = true;
        const categoryEndpoints = edit.value
            ? "update-category"
            : "create-category";
        const res = await $fetch(`/api/admin/category/${categoryEndpoints}`, {
            method: "POST",
            body: JSON.stringify(categoryInputs.value),
        });
        loading.value = false;
        edit.value = false
        emit("getCategories");
        successMsg(res?.message);
    } catch (error) {
        loading.value = false;
        showLoginOrSignUpError(error);
    }
}
</script>
<template>
    <base-modal v-show="show">
        <template #title>
            <h1 class="text-2xl">Create category</h1>
        </template>

        <template #body>
            <base-input
                v-model="categoryInputs.name"
                placeholder="Category name"
            />
        </template>

        <template #footer>
            <base-btn
                @click="emit('toggleCategoryModal')"
                class="bg-gray-400"
                label="Close"
            ></base-btn>
            <base-btn @click="createCategory" :loading label="Save"></base-btn>
        </template>
    </base-modal>
</template>

<style scoped></style>
