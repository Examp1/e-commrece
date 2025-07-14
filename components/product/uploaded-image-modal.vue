<script setup>
import baseModal from "../base-components/base-modal.vue";
import baseBtn from "../base-components/base-btn.vue";
const props = defineProps(["images"]);

const productStore = useProductStore();
const { showUploadedImageModal, uploadedProductImages } =
    storeToRefs(productStore);
</script>
<template>
    <baseModal :show="showUploadedImageModal">
        <template #title>
            <div class="text-2xl font-semibold">Upload Images</div>
        </template>

        <template #body>
            <div class="flex gap-4">
                <img
                    v-for="image in uploadedProductImages"
                    :key="image.url"
                    :src="image.url"
                    style="height: 100px"
                    alt="image"
                />
            </div>
        </template>

        <template #footer>
            <baseBtn
                class="bg-slate-400"
                @click="showUploadedImageModal = false"
                label="Close"
            ></baseBtn>
        </template>
    </baseModal>
</template>
