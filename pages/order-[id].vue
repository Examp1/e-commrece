
<script setup lang="ts">
const route = useRoute()
const shoppingCartStore = useShoppingCartStore();
 const res = await shoppingCartStore.getOrderById(+route.params.id);
</script>

<template>
    <div>
        {{ res }}
    </div>
</template>

<style scoped>

</style>