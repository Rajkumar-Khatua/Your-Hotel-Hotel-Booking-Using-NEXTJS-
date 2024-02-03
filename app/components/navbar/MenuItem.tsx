"use client";

import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
    px-4
    py-3
    hover:bg-neutral-100
    cursor-pointer
    transition
    duration-200
    text-black
    ease-in-out
    font-semibold
    text-sm
  "
    >
      {label}
    </div>
  );
};

export default MenuItem;
