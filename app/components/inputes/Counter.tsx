"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}
const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div
      className="
                flex
                flex-row
                justify-between
                items-center
            "
    >
      <div
        className="
                    flex
                    flex-col
                    gap-2
                "
      >
        <div className="font-medium">{title}</div>
        <div className="text-light text-gray-500">{subtitle}</div>
      </div>
      <div
        className="
                        flex
                        flex-row
                        gap-4
                        items-center
                    "
      >
        <div
          onClick={onReduce}
          className="w-10
                        h-10
                        rounded-full
                        border-[1px]
                        border-neutral-400
                        flex
                        justify-center
                        items-center
                        cursor-pointer
                        hover:opacity-80
                        transition
                        "
        >
          <AiOutlineMinus />
        </div>
        <div className="font-white text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="w-10
                        h-10
                        rounded-full
                        border-[1px]
                        border-neutral-400
                        flex
                        justify-center
                        items-center
                        cursor-pointer
                        hover:opacity-80
                        transition
                        "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
