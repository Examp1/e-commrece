<script setup>
import BaseBtn from "../base-components/base-btn.vue";
import BaseInput from "../base-components/base-input.vue";
import BaseModal from "../base-components/base-modal.vue";

const props = defineProps(["show", "categories"]);
const emit = defineEmits(["toggleProductModal, getProducts"]);

const productStore = useProductStore();
const { poroductInputs, edit, productColors } = storeToRefs(productStore);
const loading = ref(false);
async function createOrUpdateProduct() {
    try {
        loading.value = true;
        const productEndpoints = edit.value ? "update" : "create";
        const res = await $fetch(`/api/admin/product/${productEndpoints}`, {
            method: "POST",
            body: JSON.stringify(poroductInputs.value),
        });
        poroductInputs.value = {};

        loading.value = false;
        edit.value = false;
        emit("getProducts");
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
            <h1 class="text-2xl">{{ edit ? "Update" : "Create" }} Product</h1>
        </template>

        <template #body>
            <base-input
                class="mb-3"
                v-model="poroductInputs.name"
                placeholder="Product name"
            />
            <select
                class="mb-3 focus:bg-focus-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:border-gray-700 focus:focus:border-brand-800"
                v-model="poroductInputs.color"
            >
                <option value="">colors</option>
                <option
                    v-for="color in productColors"
                    :key="'color'"
                    :value="color"
                >
                    {{ color }}
                </option>
            </select>
            <base-input
                class="mb-3"
                v-model="poroductInputs.price"
                min="1"
                placeholder="Product price"
            />
            <select
                class="focus:bg-focus-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:border-gray-700 focus:focus:border-brand-800"
                v-model="poroductInputs.categoryId"
            >
                <option
                    v-for="category in categories"
                    :key="'category' + category.id"
                    :value="category.id"
                >
                    {{ category.name }}
                </option>
            </select>
        </template>

        <template #footer>
            <base-btn
                @click="emit('toggleProductModal')"
                class="bg-gray-400"
                label="Close"
            ></base-btn>
            <base-btn
                @click="createOrUpdateProduct"
                :loading
                :label="edit ? 'Update' : 'Save'"
            ></base-btn>
        </template>
    </base-modal>
</template>

<style scoped></style>
