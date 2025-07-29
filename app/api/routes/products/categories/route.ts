import { wocommerceAPI } from "@/app/api/config/woocommerce";
import { NextResponse } from "next/server";
// @ts-ignore
import he from "he"

function buildCategoryTree(categories: any[]) {
  const categoryMap = new Map();

  categories.forEach((category) => {
    categoryMap.set(category.id, { ...category, children: [] });
  });

  const tree: any[] = [];

  categories.forEach((category) => {
    if (category.parent === 0) {
      tree.push(categoryMap.get(category.id));
    } else {
      const parent = categoryMap.get(category.parent);
      if (parent) {
        parent.children.push(categoryMap.get(category.id));
      }
    }
  });

  return tree;
}

function decodeCategoryFields(categories: any[]) {
  return categories.map(category => ({
    ...category,
    name: he.decode(category.name),
    slug: he.decode(category.slug),
    description: category.description ? he.decode(category.description) : "",
  }));
}

export async function GET() {
  try {
    const response = await wocommerceAPI.get("products/categories", {
      per_page: 100,
    });
    const rawCategories = response.data;
    
    const extractedCategories = rawCategories.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      parent: category.parent,
      count: category.count,
      image: category.image,
      description: category.description,
    }));

    // decode کردن فیلدهای متنی
    const decodedCategories = decodeCategoryFields(extractedCategories);

    const categoryTree = buildCategoryTree(decodedCategories);

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Categories fetched successfully",
      result: categoryTree,
    });
  } catch (error: any) {
    console.error("WooCommerce error:", error.message);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: "Failed to fetch Categories",
      },
      { status: 500 }
    );
  }
}
