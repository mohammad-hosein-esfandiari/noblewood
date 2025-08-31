// src/utils/cart/localCart.ts
import toast from "react-hot-toast";

export interface CartItem {
  id?: number;
  variation_id?: number;
  quantity: number;
  attributes?: { [key: string]: string };
}

const LOCAL_CART_KEY = "NW-CART-LOCAL";

export const LocalCart = {
  // گرفتن سبد خرید
  getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem(LOCAL_CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  // ذخیره سبد خرید
  setCart(cart: CartItem[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  },

  // اضافه کردن محصول
  addItem(item: CartItem) {
    const cart = this.getCart();

    // پیدا کردن اگر محصول تکراری هست
    const index = cart.findIndex(cartItem =>
      (item.id && cartItem.id === item.id) ||
      (item.variation_id && cartItem.variation_id === item.variation_id &&
       JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes))
    );

    if (index > -1) {
      cart[index].quantity += item.quantity; // جمع کردن quantity
    } else {
      cart.push(item);
    }

    this.setCart(cart);
    toast.success("Product added to cart!");
    return cart;
  },

  // اضافه کردن محصول ساده
  addSimpleProduct(productId: number, quantity: number) {
    return this.addItem({ id: productId, quantity });
  },

  // اضافه کردن محصول متغیر
  addVariableProduct(variationId: number, quantity: number, attributes: { [key: string]: string }) {
    return this.addItem({ variation_id: variationId, quantity, attributes });
  },

  // پاک کردن کل سبد خرید
  clearCart() {
    this.setCart([]);
    toast.success("Cart cleared!");
  },

  // گرفتن تعداد کل آیتم‌ها
  getCartCount() {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }
};
