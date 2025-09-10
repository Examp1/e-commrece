<script setup lang="ts">
definePageMeta({
    layout: "admin",
});

const route = useRoute();

const {
    data: order,
    pending,
    error,
} = await useFetch("/api/admin/orders/get-order-by-id", {
    query: {
        id: route.params.id,
    },
});

</script>

<template>
    <div
    class="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]"
    >
    {{ order }}
        single order
    </div>
</template>

<style scoped></style>
