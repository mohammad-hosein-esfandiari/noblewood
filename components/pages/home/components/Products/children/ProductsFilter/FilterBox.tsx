import { FilterQueries } from "@/store/products";
import { Brand } from "@/types/brands";
import { Category } from "@/types/category";
import { ChevronDown } from "lucide-react";
import React, { FC, useEffect } from "react";

interface itemsProps {
  id: string;
  name: string;
  icon?: string;
  children?: itemsProps[];
}

interface SelectBoxProps {
  items: Category[] | Brand[] | any[];
  title: string;
  id: keyof FilterQueries;
  callback: (key: keyof FilterQueries, value: string) => void;
  query: string;
}

export const FilterBox: FC<SelectBoxProps> = ({
  items = [],
  title,
  id,
  callback,
  query,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(
    "Select" + " " + title
  );
  const [openUp, setOpenUp] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleFilterChange = (key: keyof FilterQueries, value: string) => {
    callback(key, value);
  };

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 400; // حدود ارتفاع دراپ‌داون (حدس زده)
      if (spaceBelow < dropdownHeight) {
        setOpenUp(true);
      } else {
        setOpenUp(false);
      }
    }
    setIsHovered(true);
  };

  const handleCategoryClick = (
    event: React.MouseEvent<HTMLElement>,
    category: string,
    queryValue: string = ""
  ) => {
    event?.stopPropagation(); // جلوگیری از بسته شدن دراپ‌داون هنگام کلیک روی گزینه
    event.preventDefault();
    setSelectedCategory(category);
    console.log(id, queryValue);
    handleFilterChange(id, queryValue);
    setIsHovered(false);
  };

  // یوزافکت برای بستن دراپداون هنگام کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // هنگام پاک‌سازی کامپوننت، لیسنر رو هم حذف کن
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // اگر کوئری تغییر کرد، دسته‌بندی انتخاب شده رو به مقدار کوئری تنظیم کن
    if (query && query !== "") {
      const selectedItem = items.find((item) => item.id === query);
      if (selectedItem) {
        setSelectedCategory(selectedItem.name);
      }
    } else {
      setSelectedCategory("Select" + " " + title);
    }
  }, [query, items, title]);

  return (
    <div key={id + "_" + title} className=" text-gray-700 text-sm">
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {title}
      </label>
      <div
        ref={containerRef}
        onClick={handleMouseEnter}
        className={`relative ${isHovered ? "group-1" : ""}`}>
        <button
          type="button"
          className="w-full relative p-4 border border-gray-300 rounded-xl bg-white text-gray-700 shadow-sm flex justify-between items-center focus:outline-none">
          <span data-value={query} className="font-">
            {" "}
            {selectedCategory}{" "}
          </span>
          <ChevronDown className="absolute base-arrow rotate-[-90deg]  transition-all right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
        </button>
        <nav
          className={`absolute w-full z-10 ${isHovered ? "" : "hidden"} ${
            openUp ? "bottom-full " : "top-full "
          }`}>
          <ul className="relative w-full bg-white border border-gray-300 rounded-xl  ">
            <li
              onClick={(e) => handleCategoryClick(e, `All ${title}`, "")}
              className="hover:text-amber-800 hover:font-bold px-4 py-3 cursor-pointer">
              All {title}
            </li>

            {items.map((category) => {
              if (category.children && category.children.length > 0) {
                return (
                  <li
                    data-value={query}
                    key={category.id}
                    className="group sub-group relative border-b last:border-b-0">
                    <input
                      id={category.id + "_input"}
                      name={title + "_name"}
                      type="radio"
                      hidden
                    />
                    <label
                      htmlFor={category.id + "_input"}
                      className="w-full relative px-4 py-3 text-left flex justify-between cursor-pointer items-center  hover:font-bold focus:outline-none">
                      <span
                        onClick={(e) =>
                          handleCategoryClick(e, category.name, category.id)
                        }
                        className="hover:text-amber-800">
                        {category.name}
                      </span>
                      <ChevronDown className="absolute rotate-[-90deg] child-arrow-icon transition-transform right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
                    </label>

                    {/* زیرمنو */}
                    {category.children && category.children.length > 0 ? (
                      <ul className="sub_ul">
                        {category.children.map((subCategory: any) => (
                          <li
                            key={subCategory.id + "_sub"}
                            onClick={(e) =>
                              handleCategoryClick(
                                e,
                                "↳" + " " + subCategory.name,
                                subCategory.id
                              )
                            }
                            className="hover:text-amber-800 hover:font-bold px-4 py-2 cursor-pointer">
                            {subCategory.name}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              } else {
                return (
                  <li
                    key={category.id + "_li"}
                    onClick={(e) =>
                      handleCategoryClick(e, category.name, category.id)
                    }
                    className="hover:text-amber-800 hover:font-bold px-4 py-3 cursor-pointer">
                    {category.name}
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
