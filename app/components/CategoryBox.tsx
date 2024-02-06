"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  // Create a new function that will handle the click event and update the query string
  const handleClick = useCallback(() => {
    let currentQuery = {};
    // If there are params, parse them and store them in currentQuery
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    // Update the query string with the new category and remove it if it's already selected
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    // If the category is already selected, remove it from the query string
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // Convert the updated query to a string and update the URL
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      // Skip null values when stringifying the URL
      { skipNull: true }
    );
    // Push the new URL to the router
    router.push(url);
    // Update the URL with the new query string
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
