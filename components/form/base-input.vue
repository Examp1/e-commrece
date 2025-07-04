<script setup>
import { defineModel } from "vue";
defineProps(["type, name, placeholder, 'modelValue'"]);
const model = defineModel();
</script>
<template>
    <input v-model="model" :name :placeholder :type="type || 'text'" />
</template>
