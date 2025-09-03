<script setup>
import BaseBtn from "../base-components/base-btn.vue";
import BaseInput from "../base-components/base-input.vue";
import BaseModal from "../base-components/base-modal.vue";
import BaseSelect from "../base-components/base-select.vue";

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
        showApiError(error);
    }
}
onUnmounted(() => {
    poroductInputs.value = {};
});
</script>
<template>
    <base-modal v-show="show">
        <template #title>
            <h1 class="text-2xl">{{ edit ? "Update" : "Create" }} Product</h1>
        </template>

        <template #body>
            <BaseInput
                label="Product name"
                v-model="poroductInputs.name"
                placeholder="Product name"
            />
            <BaseInput
                label="Product description"
                v-model="poroductInputs.description"
                placeholder="Product description"
            />
            <BaseSelect
                label="Product color"
                v-model="poroductInputs.color"
                :options="productColors"
                placeholder="colors"
            />
            <div class="grid grid-cols-2 gap-5">
                <BaseInput
                    label="Product price"
                    v-model="poroductInputs.price"
                    min="1"
                    placeholder="Product price"
                />
                <BaseInput
                    label="Product old price"
                    v-model="poroductInputs.old_price"
                    min="1"
                    placeholder="Product old price"
                />
            </div>
            <BaseSelect
                label="Product category"
                v-model="poroductInputs.categoryId"
                :options="categories"
                placeholder="category"
                custom-value="id"
            />
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
