<script setup>
definePageMeta({
    layout: "admin",
});

const orders = await $fetch("/api/admin/orders/get-all-orders", {});

</script>
<template>
   тут будут графики
</template>
