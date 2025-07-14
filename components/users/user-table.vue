<script setup lang="ts">
defineProps(["userData"]);

const userStore = useUserStore();
const { search } = storeToRefs(userStore);

const searchUsers = _debounce(async function (event) {
    search.value = event[0].target.value;
    await userStore.fetchUsers();
}, 1000);
</script>

<template>
    <div class="flex justify-between mb-1">
        <input
            v-model="search"
            @keydown="searchUsers"
            type="text"
            placeholder="Search..."
            class="mb-2 border rounded-md py-2 px-2 shdow-md"
        />
        <slot name="btn"></slot>
    </div>
    <table class="bg-white rounded-md w-full shadow-sm border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <td class="border border-gray-300 py-2 px-4">#</td>
                <td class="border border-gray-300 py-2 px-4">Name</td>
                <td class="border border-gray-300 py-2 px-4">E-mail</td>
                <td class="border border-gray-300 py-2 px-4">Is valid Email</td>
                <!-- <td class="border border-gray-300 py-2 px-4">Action</td> -->
            </tr>
        </thead>

        <tbody>
            <tr
                class="text-left"
                v-for="(user, index) in userData.users"
                :key="user.id"
            >
                <td class="border border-gray-300 py-2 px-4">
                    {{ index + 1 }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ user?.name }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ user?.email }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                <span v-if="user?.isValidEmail" class="bg-green-200 rounded-md px-1 py-1 text-sm font-semibold">Valid E-mail</span>
                <span v-else class="bg-red-200 rounded-md px-1 py-1 text-sm font-semibold">Invalid E-mail</span>
                </td>

                <!-- <td class="flex border 0 border-gray-300 py-2 px-4"></td> -->
            </tr>
        </tbody>
    </table>
    <div class="flex justify-between items-center mt-4">
        <div>
            <button
                class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                :disabled="userData?.metadata?.page === 1"
                @click="userStore.changePage(userData?.metadata?.page - 1)"
            >
                Prev
            </button>

            <span
                >Page {{ userData?.metadata?.page }} of
                {{ userData?.metadata?.totalPages }}</span
            >

            <button
                class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                :disabled="
                    userData?.metadata?.page === userData?.metadata?.totalPages
                "
                @click="userStore.changePage(userData?.metadata?.page + 1)"
            >
                Next
            </button>
        </div>
    </div>
</template>

<style scoped></style>
