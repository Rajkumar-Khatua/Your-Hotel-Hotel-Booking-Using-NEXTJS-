"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  icon: IconType;
  label: string;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  icon:Icon,
  label,
  onClick,
}) => {
  return <div
    onClick={() => onClick(label)}
  className={`
    rounded-xl
    border-2
    p-4
    flex
    flex-col
    gap-3
    cursor-pointer
    transition
    duration-200
    hover:border-black
    ${selected ? "border-black" : "border-neutral-200"}

  `}>
    <Icon size={30} />
    <div className="text-sm font-semibold">{label}</div>
    
  </div>;
};

export default CategoryInput;
