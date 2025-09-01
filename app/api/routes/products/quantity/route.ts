import { NextResponse } from "next/server";
import { wocommerceAPI } from "@/app/api/config/woocommerce";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");
    const variationId = searchParams.get("variationId"); // اختیاری برای variable

    if (!type || !id) {
      return NextResponse.json(
        { status: "error", statusCode: 400, message: "type and id are required" },
        { status: 400 }
      );
    }

    let product: any;

    if (type === "simple") {
      const res = await wocommerceAPI.get(`products/${id}`);
      product = res.data;
    } else if (type === "variable") {
      if (!variationId) {
        return NextResponse.json(
          { status: "error", statusCode: 400, message: "variationId is required for variable products" },
          { status: 400 }
        );
      }
      const res = await wocommerceAPI.get(`products/${id}/variations/${variationId}`);
      product = res.data;
    } else {
      return NextResponse.json(
        { status: "error", statusCode: 400, message: "Invalid product type" },
        { status: 400 }
      );
    }

    // فقط اطلاعات مرتبط با موجودی
    const stockData = {
      manage_stock: product.manage_stock,
      stock_quantity: product.stock_quantity,
      stock_status: product.stock_status,
      backorders: product.backorders,
      backorders_allowed: product.backorders_allowed,
      backordered: product.backordered,
      low_stock_amount: product.low_stock_amount,
      type:product.type
    };

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Stock data fetched successfully",
      result: stockData,
    });
  } catch (error: any) {
    console.error("WooCommerce error:", error.message);
    return NextResponse.json(
      { status: "error", statusCode: 500, message: "Failed to fetch product stock" },
      { status: 500 }
    );
  }
}
