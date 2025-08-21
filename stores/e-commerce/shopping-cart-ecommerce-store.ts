export const useShoppingCartStore = defineStore(
    "shopping-cart-ecommerce-store",
    () => {
        const shoppingCartData = ref([]);
        const showCart = ref<boolean>(false);
        const totalPrice = ref<number>(0);

        function storeCartDataToLocalStorage() {
            localStorage.setItem(
                "cartData",
                JSON.stringify(shoppingCartData.value),
            );
        }

        function addProductToCart(product: Record<string, any>) {
            const productExist = shoppingCartData.value.filter(
                (item) => item.id === product.id,
            );

            if (productExist.length === 0) {
                shoppingCartData.value.push({ ...product, quantity: 1 });
            }
        }
        function removeProductToCart(productId: number) {
            const newArray = shoppingCartData.value.filter(
                (item) => item.id !== productId,
            );
            shoppingCartData.value = [...newArray];
        }

        // function addQuantity(productId: number, newQuantity: number) {
        //     const newArray = shoppingCartData.value.filter(
        //         (item: any) => item.id === productId,
        //     );
        //     if (newArray.length > 0) {
        //         const { quantity, totalProductPrice, ...restProps } =
        //             newArray[0];
        //         const updateQuantity = quantity + newQuantity;
        //         const updateTotalPrice =
        //             parseFloat(totalProductPrice) +
        //             parseFloat(totalProductPrice);

        //         //remove this product and add it again
        //         const updateProduct = shoppingCartData.value.filter(
        //             (item: any) => item.id !== productId,
        //         );
        //         shoppingCartData.value = [];
        //         shoppingCartData.value = [...updateProduct];
        //         shoppingCartData.value.push({
        //             quantity: updateQuantity,
        //             totalProductPrice: updateTotalPrice,
        //             // price:''
        //             ...restProps,
        //         });
        //         storeCartDataToLocalStorage();
        //     }
        // }

        function addQuantity(productId: number, newQuantity: number) {
            if (newQuantity <= 0) return;
            shoppingCartData.value = shoppingCartData.value.map((item) => {
                if (item.id === productId) {
                    item.quantity++;
                    return {
                        ...item,
                        quantity: item.quantity,
                        totalProductPrice: item.quantity * item.price,
                    };
                } else {
                    return item;
                }
            });
            getTotalPrice();
            storeCartDataToLocalStorage();
        }
        function reduceQuantity(productId: number, newQuantity: number) {
            if (newQuantity <= 0) return;

            const product = shoppingCartData.value.find(
                (item) => item.id === productId,
            );

            if (!product) return;

            const updatedQuantity = product.quantity - newQuantity;

            if (updatedQuantity <= 0) {
                removeProductToCart(productId); // Удаляем, если количество <= 0
            } else {
                // Обновляем корзину только если товар не удален
                shoppingCartData.value = shoppingCartData.value.map((item) =>
                    item.id === productId
                        ? {
                              ...item,
                              quantity: updatedQuantity,
                              totalProductPrice: updatedQuantity * item.price,
                          }
                        : item,
                );
            }
            getTotalPrice();
            storeCartDataToLocalStorage(); // Сохраняем в любом случае
        }
        // function reduceQuantity(productId: number, newQuantity: number) {
        //     const newArray = shoppingCartData.value.filter(
        //         (item: any) => item.id === productId,
        //     );
        //     if (newArray.length > 0) {
        //         if (newQuantity <= parseFloat(newArray[0].quantity)) {
        //             const { quantity, totalProductPrice, ...restProps } =
        //                 newArray[0];
        //             const updateQuantity = quantity - newQuantity;

        //             if (updateQuantity === 0) {
        //                 removeProductToCart(productId);
        //                 storeCartDataToLocalStorage();
        //             } else {
        //                 const updateTotalPrice =
        //                     parseFloat(totalProductPrice) -
        //                     parseFloat(restProps.price);
        //                 // const updatePrice=quantity+newQuantity

        //                 //remove this product and add it again
        //                 const updateProduct = shoppingCartData.value.filter(
        //                     (item: any) => item.id !== productId,
        //                 );
        //                 shoppingCartData.value = [];
        //                 shoppingCartData.value = [...updateProduct];
        //                 shoppingCartData.value.push({
        //                     quantity: updateQuantity,
        //                     totalProductPrice: updateTotalPrice,
        //                     ...restProps,
        //                 });
        //                 storeCartDataToLocalStorage();
        //             }
        //         }
        //     }
        // }

        function clearOutCart() {
            shoppingCartData.value = [];
        }

        function toggleShoppingCart() {
            showCart.value = !showCart.value;
        }

        function getTotalPrice() {
            totalPrice.value = shoppingCartData.value.reduce((acc, item) => {
                return acc + item.price;
            }, 0);
        }

        function formatToUsCurreny(amount: number) {
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return formatted;
        }

        return {
            showCart,
            shoppingCartData,
            totalPrice,
            addProductToCart,
            removeProductToCart,
            clearOutCart,
            toggleShoppingCart,
            addQuantity,
            reduceQuantity,
            storeCartDataToLocalStorage,
            formatToUsCurreny,
        };
    },
);
