<script setup lang="ts">
import { defineModel } from "vue";
defineProps(["modelValue", "options", "placeholder", "label", "customValue"]);
const model = defineModel();
</script>

<template>
    <div class="mb-3">
        <label v-if="label">{{ label }}</label>
        <select
            class="focus:bg-focus-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:border-gray-700 focus:focus:border-brand-800"
            v-model="model"
        >
            <option value="">{{ placeholder }}</option>
            <option
                v-for="option in options"
                :key="'option'"
                :value="customValue ? option[customValue] : option"
            >
                {{ option.name || option }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped></style>
