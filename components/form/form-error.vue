<script setup>
defineProps(["errors"]);
</script>

<template>
    <div :class="{ error: errors.length }">
        <slot />
        <div class="input-errors" v-for="error of errors" :key="error.$uid">
            <div class="error-msg text-red-400">
                {{ error.$message }}
            </div>
        </div>
    </div>
</template>
