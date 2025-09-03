<script setup>
import { defineModel } from "vue";
defineProps(["type", "name", "placeholder", "modelValue", "label"]);
const model = defineModel();
</script>
<template>
    <div class="mb-3 ">
        <label v-if="label">{{ label }}</label>
        <input
            v-model="model"
            :type="typeof type !== 'undefined' ? type : 'text'"
            :name
            :placeholder="placeholder"
            class="focus:bg-focus-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:border-gray-700 focus:focus:border-brand-800"
        />
    </div>
</template>
