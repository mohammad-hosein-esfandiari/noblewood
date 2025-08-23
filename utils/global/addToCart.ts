import toast from 'react-hot-toast';

interface CartItem {
  id?: number;
  variation_id?: number;
  quantity: number;
  attributes?: { [key: string]: string };
}

interface AddToCartOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}

export const addToCart = async (
  cartItem: CartItem,
  options: AddToCartOptions = {}
): Promise<{ success: boolean; data?: any; error?: any }> => {
  const { onSuccess, onError, onFinally } = options;

  try {
    const res = await fetch("/api/routes/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItem),
      credentials: "include", // کوکی سشن کاربر
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Product added to cart:", data);
      toast.success("Product added to cart!");
      onSuccess?.(data);
      return { success: true, data };
    } else {
      const errorMessage = data.message || "Error adding product to cart";
      toast.error(errorMessage);
      onError?.(data);
      return { success: false, error: data };
    }
  } catch (err) {
    console.error("Fetch error:", err);
    toast.error("An error occurred");
    onError?.(err);
    return { success: false, error: err };
  } finally {
    onFinally?.();
  }
};

// Helper function for variable products
export const addVariableProductToCart = async (
  variationId: number,
  quantity: number,
  attributes: { [key: string]: string },
  options?: AddToCartOptions
) => {
  return addToCart(
    {
      variation_id: variationId,
      quantity,
      attributes
    },
    options
  );
};

// Helper function for simple products
export const addSimpleProductToCart = async (
  productId: number,
  quantity: number,
  options?: AddToCartOptions
) => {
  return addToCart(
    {
      id: productId,
      quantity
    },
    options
  );
};
