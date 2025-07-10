<script setup>
defineProps(["errors"]);
</script>

<template>
  <div :class="{ error: errors.length }">
    <slot></slot>

    <div class="input-errors" v-for="error of errors" :key="error.$uid">
      <div class="error-msg" style="color:red;font-weight:bold">{{ error.$message }}</div>
    </div>
  </div>
</template>
