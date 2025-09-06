export const useOrdresStore = defineStore("order-store", () => {
    async function fetchAllOrders() {
        await $fetch("/api/admin/orders/get-all-orders", {});
    }
    async function fetchOrderById(id: numbet) {
        await $fetch("/api/admin/orders/get-all-orders", {
            query: {
                id,
            },
        });
    }

    return {
        fetchAllOrders,
        fetchOrderById,
    };
});
