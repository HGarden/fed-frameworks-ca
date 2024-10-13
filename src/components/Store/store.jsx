import { create } from 'zustand';

const getCartFromLocalStorage = () => JSON.parse(localStorage.getItem('cart')) || [];

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const useStore = create((set) => ({
    cart: getCartFromLocalStorage(),

    addToCart: (newItem) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item.id === newItem.id);
            const newCart = existingItem
                ? state.cart.map((item) =>
                        item.id === newItem.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                : [...state.cart, { ...newItem, quantity: 1 }];

            saveCartToLocalStorage(newCart);
            return { cart: newCart };
        }),

    removeFromCart: (itemId) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item.id === itemId);

            const newCart = existingItem && existingItem.quantity > 1
                ? state.cart.map((item) =>
                        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
                    )
                : state.cart.filter((item) => item.id !== itemId);

            saveCartToLocalStorage(newCart);
            return { cart: newCart };
        }),

    clearCart: () =>
        set(() => {
            saveCartToLocalStorage([]);
            return { cart: [] };
        }),
}));

export default useStore;