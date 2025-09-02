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
  // گرفتن سبد خرید با بررسی اعتبار داده
  getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
      const cart = localStorage.getItem(LOCAL_CART_KEY);
      if (!cart) return [];

      const parsed: any = JSON.parse(cart);

      // بررسی اینکه parsed آرایه است
      if (!Array.isArray(parsed)) throw new Error("Cart is not an array");

      // بررسی ساختار هر آیتم
      for (const item of parsed) {
        if (
          typeof item !== "object" ||
          (!item.id && !item.variation_id) ||
          typeof item.quantity !== "number"
        ) {
          throw new Error("Cart item structure is invalid");
        }
      }

      return parsed as CartItem[];
    } catch (err: any) {
      console.error("LocalCart error:", err.message);
      this.clearCart();
      toast.error("Cart data corrupted. Cart has been reset!");
      return [];
    }
  },

  // ذخیره سبد خرید
  setCart(cart: CartItem[]) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
    } catch (err: any) {
      console.error("Failed to set cart:", err.message);
      this.clearCart();
      toast.error("Failed to update cart. Cart has been reset!");
    }
  },

  // اضافه کردن محصول
  addItem(item: CartItem) {
    try {
      const cart = this.getCart();

      const index = cart.findIndex(cartItem =>
        (item.id && cartItem.id === item.id) ||
        (item.variation_id && cartItem.variation_id === item.variation_id &&
         JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes))
      );

      if (index > -1) {
        cart[index].quantity += item.quantity;
      } else {
        cart.push(item);
      }

      this.setCart(cart);
      toast.success("Product added to cart!");
      return cart;
    } catch (err: any) {
      console.error("Add item failed:", err.message);
      this.clearCart();
      toast.error("Failed to add item. Cart has been reset!");
      return [];
    }
  },

  addSimpleProduct(productId: number, quantity: number) {
    return this.addItem({ id: productId, quantity });
  },

  addVariableProduct(id:number ,variationId: number, quantity: number, attributes: { [key: string]: string }) {
    return this.addItem({id, variation_id: variationId, quantity, attributes });
  },

  clearCart() {
    try {
      localStorage.removeItem(LOCAL_CART_KEY);
      toast.success("Cart cleared!");
    } catch (err: any) {
      console.error("Failed to clear cart:", err.message);
      toast.error("Failed to clear cart!");
    }
  },

  getCartCount() {
    try {
      return this.getCart().reduce((total, item) => total + item.quantity, 0);
    } catch {
      return 0;
    }
  }
};
