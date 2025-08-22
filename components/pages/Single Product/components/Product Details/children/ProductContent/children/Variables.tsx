"use client";
import {
  Attribute,
  DimensionsType,
  AttributeOption,
  ProductVariationsData,
  Variation,
  VariationAttributes,
  RawProduct,
} from "@/types/product";
import React, { FC, useState } from "react";
import { DefaultPriceProps } from "../ProductContent";
interface VariablesProps {
  setDimenitionsFunc: React.Dispatch<React.SetStateAction<DimensionsType>>;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  data: ProductVariationsData;
  product: RawProduct;
  setPrice: React.Dispatch<React.SetStateAction<DefaultPriceProps>>;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedVariationId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const Variables: FC<VariablesProps> = ({
  data,
  setDimenitionsFunc,
  setWeight,
  product,
  setPrice,
  setCurrentImageIndex,
  setSelectedVariationId
}) => {
  const { attributes, variations } = data;
  const [selectedAttrs, setSelectedAttrs] = useState<{ [key: string]: string }>(
    {}
  );
  
  const handleSelect = (slug: string, value: string) => {
    // 1️⃣ محاسبه انتخاب‌های جدید
    let updated: VariationAttributes = { ...selectedAttrs, [slug]: value };

    // matched variation هایی که instock هستن
    const matched: Variation[] | [] = variations.filter(
      (variation: Variation) =>
        Object.entries(updated).every(
          ([s, v]) => variation.attributes[s] === v
        ) && variation.stock_status === "instock"
    );

    // auto-select برای attribute بعدی
    if (Object.keys(updated).length === 1 && attributes.length > 1) {
      const nextAttr: Attribute | undefined = attributes.find(
        (a) => a.slug !== slug
      );

      if (nextAttr) {
        const validOption: AttributeOption | undefined = nextAttr.options.find(
          (opt) =>
            matched.some(
              (variation: Variation) =>
                variation.attributes[nextAttr.slug] === opt.value
            )
        );
        if (validOption) {
          updated[nextAttr.slug] = validOption.value;
        }
      }
    }

    // 2️⃣ اعمال تغییر انتخاب‌ها
    setSelectedAttrs(updated);

    // 3️⃣ پیدا کردن selected variation با انتخاب جدید
    const selectedVariations = variations.filter((variation) =>
      Object.entries(updated).every(([s, v]) => variation.attributes[s] === v)
    );

   
    // 4️⃣ خارج از setState، update کردن dimensions و weight
    if (selectedVariations[0]) {
      setDimenitionsFunc(selectedVariations[0].dimensions);
      setWeight(selectedVariations[0].weight);
      setPrice({
        regular_price: selectedVariations[0].regular_price?.toString() ?? "",
        sale_price: selectedVariations[0].sale_price?.toString() ?? "",
      });

      // 5️⃣ Navigate to the corresponding variation image
      if (selectedVariations[0].image) {
        // Find the index of this variation image in the images array
        // The first image is the main product image, so variation images start from index 1
        const variationImageIndex = variations.findIndex(v => v.id === selectedVariations[0].id) + 1;
        setCurrentImageIndex(variationImageIndex);
      }

      // 6️⃣ Set the selected variation ID for ActionButtons
      setSelectedVariationId(selectedVariations[0].id);
    }

    // console.log("Matched variations: ", selectedVariations[0]);
  };

  // هندل حذف همه
  const handleClear = () => {
    setSelectedAttrs({});
    setDimenitionsFunc(product.dimensions);
    setWeight(product.weight);
    // Reset to main product image
    setCurrentImageIndex(0);
    // Reset selected variation ID
    setSelectedVariationId(null);
  };

  // تابع چک کردن اینکه یک option قابل انتخاب هست یا نه
  const isOptionAvailable = (slug: string, value: string) => {
    return variations.some((variation) => {
      if (variation.attributes[slug] !== value) return false;
      if (variation.stock_status !== "instock") return false;

      return Object.entries(selectedAttrs).every(([s, v]) => {
        if (s === slug) return true;
        return variation.attributes[s] === v;
      });
    });
  };

  return (
    <div className="p-4 border rounded-2xl shadow-sm bg-white space-y-4 mb-8">
      {/* هدر */}
      <div className="flex justify-between items-center">
        <div className="text-[12px] text-gray-600">
          {Object.keys(selectedAttrs).length > 0 ? (
       
              <div >
                {Object.entries(selectedAttrs)
                  .map(([slug, value]) => value)
                  .map((val,index)=>(
                    <span key={val+index} className="bg-amber-200 py-1 px-3 font-bold mr-1 rounded-2xl">{val}</span>
                  ))}
              </div>
      
          ) : (
            <span className="text-gray-400">No selection</span>
          )}
        </div>
        {Object.keys(selectedAttrs).length > 0 ? (
          <button
            onClick={handleClear}
            className="text-xs text-red-500 hover:underline">
            Clear 
          </button>
        ) : null}
      </div>

      {/* attribute ها */}
      {attributes.map((attr, index) => (
        <div key={attr.slug}>
          <h4 className="text-sm font-semibold mb-2">{attr.title}</h4>
          <div className="flex gap-2 flex-wrap">
            {attr.options.map((opt) => {
              const isAvailable = isOptionAvailable(attr.slug, opt.value);

              return (
                <button
                  key={opt.value}
                  onClick={() =>
                    isAvailable && handleSelect(attr.slug, opt.value)
                  }
                  disabled={!isAvailable}
                  className={`px-3 py-1 rounded-lg border text-sm transition ${
                    selectedAttrs[attr.slug] === opt.value
                      ? "bg-amber-500 text-white font-semibold border-amber-600"
                      : isAvailable
                      ? "bg-amber-50 hover:bg-amber-200 border-amber-300"
                      : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                  }`}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
