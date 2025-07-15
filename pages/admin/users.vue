<script setup>
import UserTable from "~/components/users/user-table.vue";
definePageMeta({
    layout: "admin",
});

const userStore = useUserStore();
const { userData, userError } = storeToRefs(userStore);

await userStore.fetchUsers();

const { $isAuthenticatied } = useNuxtApp()
</script>

<template>
    <div class="h-screen">
        <div class="flex justify-end mb-4 pt-4">
            {{ $isAuthenticatied(userError) }}
        </div>
        <UserTable :userData="userData" />
    </div>
</template>

<style lang="scss" scoped></style>
