export const useShoppingCartStore = defineStore(
    "shopping-cart-ecommerce-store",
    () => {
        const shoppingCartData = ref([]);
        const showCart = ref<boolean>(false);
        const totalPrice = ref<number>(0);

        function syncWithLocalStorage() {
            localStorage.setItem(
                "cartData",
                JSON.stringify(shoppingCartData.value),
            );
        }
        function getCartDataFromLocalStorage() {
            const data = localStorage.getItem("cartData");
            if (typeof data !== "object") {
                shoppingCartData.value = JSON.parse(data);
                getTotalPrice();
            }
        }

        function addProductToCart(product: Record<string, any>) {
            console.log(product);
            const productExist = shoppingCartData.value.filter(
                (item) => item.id === product.id,
            );

            if (productExist.length === 0) {
                shoppingCartData.value.push({ ...product, quantity: 1 });
            }
            getTotalPrice();
            syncWithLocalStorage();
        }
        function removeProductToCart(productId: number) {
            const newArray = shoppingCartData.value.filter(
                (item) => item.id !== productId,
            );
            shoppingCartData.value = [...newArray];
            getTotalPrice();
            syncWithLocalStorage();
        }

        function addQuantity(productId: number, newQuantity: number) {
            if (newQuantity <= 0) return;
            shoppingCartData.value = shoppingCartData.value.map((item) => {
                if (item.id === productId) {
                    item.quantity++;
                    return {
                        ...item,
                        quantity: item.quantity,
                        // totalProductPrice: item.quantity * item.price,
                    };
                } else {
                    return item;
                }
            });
            getTotalPrice();
            syncWithLocalStorage();
        }
        function reduceQuantity(productId: number, newQuantity: number) {
            if (newQuantity <= 0) return;

            const product = shoppingCartData.value.find(
                (item) => item.id === productId,
            );

            if (!product) return;

            const updatedQuantity = product.quantity - newQuantity;

            if (updatedQuantity <= 0) {
                removeProductToCart(productId);
            } else {
                shoppingCartData.value = shoppingCartData.value.map((item) =>
                    item.id === productId
                        ? {
                              ...item,
                              quantity: updatedQuantity,
                              //   totalProductPrice: updatedQuantity * item.price,
                          }
                        : item,
                );
            }
            getTotalPrice();
            syncWithLocalStorage();
        }

        function clearOutCart() {
            shoppingCartData.value = [];
            totalPrice.value = 0
        }

        function toggleShoppingCart() {
            showCart.value = !showCart.value;
        }

        function getTotalPrice() {
            totalPrice.value = shoppingCartData.value.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0);
        }

        function formatToUsCurreny(amount: number) {
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return formatted;
        }

        async function createOrder(orderBody: {}) {
            await $fetch("/api/e-commerce/orders/create-order", {
                method: "POST",
                body: orderBody,
            });
            clearOutCart()
            syncWithLocalStorage();
        }

        return {
            showCart,
            shoppingCartData,
            totalPrice,
            addProductToCart,
            removeProductToCart,
            clearOutCart,
            toggleShoppingCart,
            syncWithLocalStorage,
            addQuantity,
            reduceQuantity,
            getCartDataFromLocalStorage,
            formatToUsCurreny,
            createOrder,
        };
    },
);
