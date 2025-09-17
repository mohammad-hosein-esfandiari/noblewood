// components/pages/ShoppingCart/ShoppingCart.tsx
import { FC } from "react";
import { Head } from "./components/Head";
import { CartItems } from "./components/CartItems";
import { OrderSummery } from "./components/OrderSummery";
import { CartData } from "@/types/shopping-cart";
import { Container } from "@/components/global/Components/Container/Container";

interface ShoppingCartProps {
  data: CartData | null;
}

export const ShoppingCart: FC<ShoppingCartProps> = ({ data }) => {
  return (
    <div className="">
      <Container>
        <Head count={data!.total_items} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartItems cart={data!.cart_items} />
          <OrderSummery />
        </div>
      </Container>
    </div>
  );
};
