<script setup>
import baseModal from "../base-components/base-modal.vue";
import baseBtn from "../base-components/base-btn.vue";
const props = defineProps(["show"]);
const emit = defineEmits(["getProducts"]);

const loading = ref(false);
const image = ref(null);

const productStore = useProductStore();
const { productId, showUploadImageModal } = storeToRefs(productStore);

function selectImage(event) {
    const selectedImage = event.target.files[0];
    const output = document.querySelector("#outputImage");
    output.src = URL.createObjectURL(selectedImage);
    output.onload = function () {
        URL.revokeObjectURL(selectedImage);
    };
    image.value = selectedImage;
}

async function uploadImage() {
    try {
        if (image.value !== null) {
            loading.value = true;
            const requestOptions = await productStore.uploadImagePayload(
                productId.value,
                image.value,
            );
            const res = await $fetch(
                "/api/admin/product/upload-image",
                requestOptions,
            );
            successMsg(res?.message);
            document.querySelector("#outputImage").src = "";
            document.querySelector("#imageInput").value = "";
            emit("getProducts");
            loading.value = false;
        } else {
            showCustomError("Select the Image");
        }
    } catch (error) {
        showCustomError(error?.message);
        loading.value = false;
    }
}

</script>
<template>
    <baseModal :show="showUploadImageModal">
        <template #title>
            <div class="text-2xl font-semibold">Upload Image</div>
        </template>

        <template #body>
            <img style="height: 150px" alt="image" id="outputImage" />
            <label for="">Select image</label>

            <input @change="selectImage" type="file" id="imageInput" />
        </template>

        <template #footer>
            <baseBtn
                class="bg-slate-400"
                @click="showUploadImageModal = false"
                label="Close"
            ></baseBtn>

            <baseBtn
                :loading="loading"
                @click="uploadImage"
                :label="'Upload Image'"
            ></baseBtn>
        </template>
    </baseModal>
</template>
