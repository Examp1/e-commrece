<script setup>
import BaseBtn from "~/components/base-components/base-btn.vue";
import UserTable from "~/components/users/user-table.vue";
definePageMeta({
    layout: "admin",
});

const isShow = ref(false);
const userStore = useUserStore();
const { userData } = storeToRefs(userStore);

await userStore.fetchUsers();

</script>

<template>
    <div class="h-screen">
        <div class="flex justify-end mb-4 pt-4"></div>
        <UserTable :userData="userData"/>
    </div>
</template>

<style lang="scss" scoped></style>
