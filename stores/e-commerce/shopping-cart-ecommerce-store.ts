type eventType = "change" | "plus" | "minus";
export const useShoppingCartStore = defineStore(
    "shopping-cart-ecommerce-store",
    () => {
        const router = useRouter();
        
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

        function addProductToCart(
            product: Record<string, any>,
            quantity: number,
        ) {
            const productExist = shoppingCartData.value.filter(
                (cartItem) => cartItem.id === product.id,
            );

            if (productExist.length === 0) {
                shoppingCartData.value.push({
                    ...product,
                    quantity: quantity || 1,
                });
            } else {
                console.log(product);
                addQuantity(product.id, quantity);
            }
            getTotalPrice();
            syncWithLocalStorage();
        }

        function removeProductToCart(productId: number) {
            const newArray = shoppingCartData.value.filter(
                (cartItem) => cartItem.id !== productId,
            );
            shoppingCartData.value = [...newArray];
            getTotalPrice();
            syncWithLocalStorage();
        }

        function addQuantity(productId: number, newQuantity?: number) {
            shoppingCartData.value = shoppingCartData.value.map((cartItem) => {
                if (cartItem.id !== productId) {
                    return cartItem;
                }

                let quantityChange = 1;
                if (newQuantity !== undefined) {
                    quantityChange = newQuantity;
                }

                return {
                    ...cartItem,
                    quantity: cartItem.quantity + quantityChange,
                };
            });

            getTotalPrice();
            syncWithLocalStorage();
        }
        function reduceQuantity(productId: number) {
            const product = shoppingCartData.value.find(
                (cartItem) => cartItem.id === productId,
            );

            if (!product) return;

            const updatedQuantity = product.quantity - 1;

            if (updatedQuantity <= 0) {
                removeProductToCart(productId);
            } else {
                shoppingCartData.value = shoppingCartData.value.map(
                    (cartItem) =>
                        cartItem.id === productId
                            ? {
                                  ...cartItem,
                                  quantity: updatedQuantity,
                              }
                            : cartItem,
                );
            }
            getTotalPrice();
            syncWithLocalStorage();
        }

        function clearOutCart() {
            shoppingCartData.value = [];
            totalPrice.value = 0;
        }

        function toggleShoppingCart() {
            showCart.value = !showCart.value;
        }

        function getTotalPrice() {
            totalPrice.value = shoppingCartData.value.reduce(
                (acc, cartItem) => {
                    return acc + cartItem.price * cartItem.quantity;
                },
                0,
            );
        }

        function formatToUsCurreny(amount: number) {
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return formatted;
        }

        async function createOrder(orderBody: {}) {
            const response = await $fetch(
                "/api/e-commerce/orders/create-order",
                {
                    method: "POST",
                    body: orderBody,
                },
            );
            clearOutCart();
            syncWithLocalStorage();
            if (response.orderLink) {
                router.push(response.orderLink);
            }
        }
        async function getOrderById(orderId: number) {
            return await $fetch("/api/e-commerce/orders/get-order-by-id", {
                method: "POST",
                body: {
                    orderId,
                },
            });
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
            getOrderById,
        };
    },
);
